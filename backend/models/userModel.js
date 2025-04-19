const crypto = require("crypto"); //built-in module for generating token
const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "please entered the name"],
    unique: true,
    trim: true,
  },
  email: {
    type: String,
    required: [true, "please entered the email"],
    unique: true,
    trim: true,
    lowercase: true,
    validate: [validator.isEmail, "pls entered valid email"],
  },
  photo: String,
  password: {
    type: String,
    required: [true, "pls entered the password "],
    minlength: 8,
    select: false,
  },
  role: {
    type: String,
    enum: ["user", "admin"],
    default: "user",
  },
  gender: {
    type: String,
    required: [true, "pls enter your gender"],
    enum: ["male", "female"],
  },
  phoneNumber: {
    type: Number,
    required: [true, "Please enter your phone number"],
  },
  punya: {
    type: Number,
    default: 0,
  },
  maximumPunya: {
    type: Number,
    default: 0,
  },
  confirmPassword: {
    type: String,
    required: [true, "pls entered the same password as the password"],
    minlength: 8,
    validate: {
      //// this only work on create and save
      validator: function (val) {
        return this.password === val;
      },
      message: "Passwords are not the same",
    },
  },
  active: {
    type: Boolean,
    default: true,
    select: false,
  },
});

// / creating the encryption of the password
userSchema.pre("save", async function (next) {
  // only run in the case when the password was actully modified
  if (!this.isModified("password")) return next();
  // hashing the password with the cpy cost 12
  this.password = await bcrypt.hash(this.password, 12);
  // delete the password confirm field
  this.confirmPassword = undefined;
  next();
});

// creating a method that non active user donot show in the total user
userSchema.pre(/^find/, function (next) {
  //this is query middleware so this is point current this
  this.find({ active: { $ne: false } });
  next();
});

/// creating the decryption of the password
// this method is instance method its mean its available in whole file
userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.model("User", userSchema);

module.exports = User;
