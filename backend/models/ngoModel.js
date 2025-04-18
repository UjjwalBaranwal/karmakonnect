const crypto    = require("crypto");      // for token generation (not used below but available)
const mongoose  = require("mongoose");
const validator = require("validator");   // for validating email, etc.
const bcrypt    = require("bcryptjs");    // for hashing passwords

const ngoSchema = new mongoose.Schema({
  // ───────────────────────────────────────────────────────────
  name: {
    type: String,
    required: [true, 'Please enter the name'], // validation: must provide
    trim: true,                                 // strip whitespace around
  },

   // ───────────────────────────────────────────────────────────
   email: {
    type: String,
    required: [true, 'Please enter the email'], // validation: must provide
    unique: true,                               // no two NGOs share the same name
    trim: true,                                 // strip whitespace around
    lowercase: true,
    validate: [validator.isEmail, "pls entered valid email"], 
  },


  // ───────────────────────────────────────────────────────────
  password: {
    type: String,
    required: [true, "Please enter the password"], // required on create/save
    minlength: 8,                                   // enforce minimum length
    select: false,                                  // never return this in queries by default
  },

  // ───────────────────────────────────────────────────────────
  // 1) GeoJSON-style field for location, for geospatial queries
  location: {
    type: {
      type: String,
      enum: ['Point'],      // must always be 'Point' for GeoJSON point
      required: true,
      default: 'Point'
    },
    coordinates: {
      type: [Number],       // [ longitude, latitude ]
      required: true
    },
    // Optional extra address fields you can index or display
    address: String,
    city:    String,
    state:   String,
    country: String
  },

  // ───────────────────────────────────────────────────────────
  // 2) Array of enums representing the NGO's areas of work
  yojnas: {
    type: [{
      type: String,
      enum: [
        'Teaching',
        'Clothing',
        'Healthcare',
        'Donations',
        'Housing',
        'Welfare',
        'Environment',
        'ChildCare',
        'AnimalRescue',
        'DisasterRelief',
        'WomenEmpowerment',
        'FoodDistribution',
        'ElderlyCare',
        'LegalAid',
        'MentalHealth',
        'EducationSupport',
        'SkillDevelopment',
        'CleanWater',
        'Sanitation',
        'HumanRights'
      ]
    }],
    default: []  // if no yojnas provided, store empty array
  },

  // ───────────────────────────────────────────────────────────
  isVerify: {
    type: Boolean,
    default: false
  },

  // ───────────────────────────────────────────────────────────
  confirmPassword: {
    type: String,
    required: [true, "Please confirm your password"],
    minlength: 8,
    validate: {
      // Only runs on .create() and .save() (not on update)
      validator: function(val) {
        // `val` is the confirmPassword input; compare with the actual password
        return this.password === val;
      },
      message: "Passwords do not match"
    }
  },

  // ───────────────────────────────────────────────────────────
  active: {
    type: Boolean,
    default: true,
    select: false  // omit from query results unless explicitly selected
  }
});

// ─────────────────────────────────────────────────────────────
// 3) Geospatial index for efficient $near, $geoWithin, etc.
ngoSchema.index({ location: '2dsphere' });

// ─────────────────────────────────────────────────────────────
// Hash password before saving to DB
ngoSchema.pre("save", async function(next) {
  // Only hash if password was modified or newly set
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  // Remove confirmPassword so it doesn't get saved
  this.confirmPassword = undefined;
  next();
});

// ─────────────────────────────────────────────────────────────
// Filter out deactivated NGOs on all find queries
ngoSchema.pre(/^find/, function(next) {
  // `this` points to the current query
  this.find({ active: { $ne: false } });
  next();
});

// ─────────────────────────────────────────────────────────────
// Instance method to check candidate password during login
ngoSchema.methods.correctPassword = async function(candidatePassword, userPassword) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

module.exports = mongoose.model('NGO', ngoSchema);
