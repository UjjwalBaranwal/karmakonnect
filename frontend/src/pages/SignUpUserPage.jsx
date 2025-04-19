"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router";
import { Controller } from "react-hook-form";
import Select from "react-select";
import {
  User,
  Building,
  Mail,
  Lock,
  Phone,
  Calendar,
  MapPin,
  Eye,
  EyeOff,
  ArrowRight,
  CheckCircle,
  PersonStanding,
} from "lucide-react";
import { login, signup } from "../service/userAuth";
import toast from "react-hot-toast";
import { useUser } from "../Context/UserContext";
import { useNgo } from "../Context/NgoContext";
import { loginNgo, signupNgo } from "../service/ngoAuth";

export default function KarmaKonnect() {
  const [userType, setUserType] = useState("user"); // "user" or "ngo"
  const [formType, setFormType] = useState("login"); // "login" or "signup"
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [typedText, setTypedText] = useState("");
  const fullText = "KarmaKonnect";

  // Typewriter effect for the title
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1));
      }, 150);
      return () => clearTimeout(timeout);
    }
  }, [typedText]);

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-800 text-gray-100">
      {/* Left Section */}
      <div className="w-full md:w-1/3 bg-gray-900 p-8 flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12"
        >
          <h1 className="text-3xl font-bold">
            <span className="text-teal-500">{typedText}</span>
            <span className="animate-pulse">|</span>
          </h1>
          <p className="text-gray-400 mt-2">
            Connect, Contribute, Change Lives
          </p>
        </motion.div>

        <div className="flex-grow flex flex-col justify-center">
          <h2 className="text-xl font-semibold mb-6 text-center">I am a...</h2>

          <div className="grid grid-cols-2 gap-4">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserType("user")}
              className={`p-6 rounded-xl flex flex-col items-center justify-center transition-all ${
                userType === "user"
                  ? "bg-teal-500/20 border-2 border-teal-500 text-teal-400"
                  : "bg-gray-800 border-2 border-gray-700 hover:border-gray-600"
              }`}
            >
              <User
                size={32}
                className={
                  userType === "user" ? "text-teal-400" : "text-gray-400"
                }
              />
              <span className="mt-3 font-medium">User</span>
              {userType === "user" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <CheckCircle size={20} className="text-teal-400" />
                </motion.div>
              )}
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setUserType("ngo")}
              className={`p-6 rounded-xl flex flex-col items-center justify-center transition-all ${
                userType === "ngo"
                  ? "bg-yellow-500/20 border-2 border-yellow-500 text-yellow-400"
                  : "bg-gray-800 border-2 border-gray-700 hover:border-gray-600"
              }`}
            >
              <Building
                size={32}
                className={
                  userType === "ngo" ? "text-yellow-400" : "text-gray-400"
                }
              />
              <span className="mt-3 font-medium">NGO</span>
              {userType === "ngo" && (
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="mt-2"
                >
                  <CheckCircle size={20} className="text-yellow-400" />
                </motion.div>
              )}
            </motion.button>
          </div>

          <div className="mt-12">
            <p className="text-gray-400 text-sm text-center">
              Join our community and make a difference today
            </p>
          </div>
        </div>

        <div className="mt-auto">
          <p className="text-gray-500 text-xs text-center">
            &copy; {new Date().getFullYear()} KarmaKonnect. All rights reserved.
          </p>
        </div>
      </div>

      {/* Right Section */}
      <div className="w-full md:w-2/3 p-8">
        <div className="max-w-md mx-auto">
          {/* Login/Signup Toggle */}
          <div className="bg-gray-900 p-1 rounded-lg flex mb-8">
            <button
              onClick={() => setFormType("login")}
              className={`flex-1 py-2 rounded-md transition-all ${
                formType === "login"
                  ? "bg-teal-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setFormType("signup")}
              className={`flex-1 py-2 rounded-md transition-all ${
                formType === "signup"
                  ? "bg-teal-500 text-white"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Sign Up
            </button>
          </div>

          {/* Form Container */}
          <motion.div
            key={`${formType}-${userType}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.3 }}
            className="bg-gray-900 rounded-xl p-6 shadow-lg"
          >
            {formType === "login" ? (
              <LoginForm
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                userType={userType}
              />
            ) : userType === "user" ? (
              <UserSignupForm
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            ) : (
              <NGOSignupForm
                showPassword={showPassword}
                setShowPassword={setShowPassword}
                showConfirmPassword={showConfirmPassword}
                setShowConfirmPassword={setShowConfirmPassword}
              />
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}

function LoginForm({ showPassword, setShowPassword, userType }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  console.log(userType);

  const navigate = useNavigate();
  const { _, setUser } = useUser();
  const { ngo, setNgo } = useNgo();
  const onSubmit = async (data) => {
    console.log("Form submitted:", data);
    toast.loading("login up, wait...");
    if (userType === "user") {
      try {
        const user = await login(data);
        console.log(user);
        setUser(user);
        toast.dismiss();
        toast.success("login is successful");

        reset();
        navigate("/user");
      } catch (error) {
        console.error(error);

        toast.dismiss();
        toast.success("login is successful");
      }
    } else {
      try {
        const ngo = await loginNgo(data);
        console.log(ngo);
        setNgo(ngo);
        toast.dismiss();
        toast.success("login is successful");

        reset();
        navigate("/ngo");
      } catch (error) {
        console.error(error);

        toast.dismiss();
        toast.success("login is successful");
      }
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Email Field */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              {...register("email", { required: "Email is required" })}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Password Field */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="text-gray-500 hover:text-gray-300"
                />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              {...register("rememberMe")}
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm text-gray-400"
            >
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-teal-500 hover:text-teal-400">
              Forgot password?
            </a>
          </div>
        </div>

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors"
        >
          Login
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </form>

      {/* Signup Link */}
      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <a href="#" className="text-teal-500 hover:text-teal-400">
          Sign up
        </a>
      </div>
    </>
  );
}

function UserSignupForm({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const { _, setUser } = useUser();

  const onSubmit = async (fromData) => {
    console.log(fromData);
    toast.loading("signin up");
    try {

      const data = await signup(fromData);
      toast.dismiss();
      toast.success("sign up is success");
      setUser(data);
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error("sign up is failed");
      console.log(error);
    }
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">
        Create User Account
      </h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* Full Name */}
        <div className="space-y-2">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-400"
          >
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              {...register("name", { required: "Full name is required" })}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
          {errors.name && (
            <p className="text-red-500 text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Enter a valid email",
                },
              })}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}
        </div>

        {/* Contact and Age */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label
              htmlFor="phoneNumber"
              className="block text-sm font-medium text-gray-400"
            >
              Contact
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-500" />
              </div>
              <input
                type="tel"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: "Contact number is required",
                })}
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <label
              htmlFor="age"
              className="block text-sm font-medium text-gray-400"
            >
              Gender
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                {/* <PersonStanding size={18} className="text-gray-500" /> */}
              </div>
              <select
                id="gender"
                {...register("gender", { required: "Gender is required" })}
                className="bg-gray-800 text-white px-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              >
                <option value="">Select Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
              {errors.gender && (
                <p className="text-red-500 text-sm mt-1">
                  {errors.gender.message}
                </p>
              )}
            </div>
            {errors.age && (
              <p className="text-red-500 text-sm">{errors.age.message}</p>
            )}
          </div>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", { required: "Password is required" })}
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="text-gray-500 hover:text-gray-300"
                />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-400"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm your password",
              })}
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff
                  size={18}
                  className="text-gray-500 hover:text-gray-300"
                />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
          {errors.confirmPassword && (
            <p className="text-red-500 text-sm">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            {...register("terms", { required: "You must accept the terms" })}
            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
            I agree to the{" "}
            <a href="#" className="text-teal-500 hover:text-teal-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-teal-500 hover:text-teal-400">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm">{errors.terms.message}</p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-teal-500 hover:bg-teal-600 text-white font-medium transition-colors"
        >
          Create Account
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Already have an account?{" "}
        <a href="#" className="text-teal-500 hover:text-teal-400">
          Login
        </a>
      </div>
    </>
  );
}

// Enum options
const yojnaOptions = [
  "Teaching",
  "Clothing",
  "Healthcare",
  "Donations",
  "Housing",
  "Welfare",
  "Environment",
  "ChildCare",
  "AnimalRescue",
  "DisasterRelief",
  "WomenEmpowerment",
  "FoodDistribution",
  "ElderlyCare",
  "LegalAid",
  "MentalHealth",
  "EducationSupport",
  "SkillDevelopment",
  "CleanWater",
  "Sanitation",
  "HumanRights",
].map((yojna) => ({
  label: yojna,
  value: yojna,
}));

function NGOSignupForm({
  showPassword,
  setShowPassword,
  showConfirmPassword,
  setShowConfirmPassword,
}) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    control,
    reset,
  } = useForm();

  const { _, setNgo } = useNgo();

  const onSubmit = async (formData) => {
    console.log(formData);
    toast.loading("signin up");
    try {
      const data = await signupNgo(formData);
      toast.dismiss();
      console.log("we are here");

      toast.success("sign up is success");
      setNgo(data);
      reset();
    } catch (error) {
      toast.dismiss();
      toast.error("sign up is failed");
      console.log(error);
    }
  };

  const password = watch("password");

  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Register NGO</h2>

      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        {/* NGO Name */}
        <div className="space-y-2">
          <label
            htmlFor="ngoName"
            className="block text-sm font-medium text-gray-400"
          >
            NGO Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              {...register("name", { required: "NGO name is required" })}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="Organization Name"
            />
            {errors.ngoName && (
              <p className="text-red-500 text-sm">{errors.ngoName.message}</p>
            )}
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-400"
          >
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="ngo@organization.com"
            />
            {errors.email && (
              <p className="text-red-500 text-sm">{errors.email.message}</p>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="space-y-2">
          <label
            htmlFor="contact"
            className="block text-sm font-medium text-gray-400"
          >
            Contact Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={18} className="text-gray-500" />
            </div>
            <input
              type="tel"
              id="contact"
              {...register("contactNumber", {
                required: "Contact number is required",
              })}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="+1 (555) 000-0000"
            />
            {errors.contact && (
              <p className="text-red-500 text-sm">{errors.contact.message}</p>
            )}
          </div>
        </div>

        {/* Location */}
        <div className="space-y-2">
          <label
            htmlFor="location"
            className="block text-sm font-medium text-gray-400"
          >
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="location"
              {...register("location")}
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="City, Country"
            />
            {errors.location && (
              <p className="text-red-500 text-sm">{errors.location.message}</p>
            )}
          </div>
        </div>
        <Controller
          name="yojnas"
          control={control}
          defaultValue={[]}
          render={({ field }) => (
            <div className="space-y-2">
              <label className="block text-sm font-medium text-gray-400">
                Select Yojnas
              </label>
              <Select
                isMulti
                options={yojnaOptions}
                className="text-black"
                value={yojnaOptions.filter((opt) =>
                  field.value.includes(opt.value)
                )}
                onChange={(selected) =>
                  field.onChange(selected.map((opt) => opt.value))
                }
                placeholder="Select one or more yojnas..."
                styles={{
                  control: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937", // gray-800
                    borderColor: "#374151", // gray-700
                    color: "#fff",
                  }),
                  menu: (base) => ({
                    ...base,
                    backgroundColor: "#1f2937",
                    color: "#fff",
                  }),
                  multiValue: (base) => ({
                    ...base,
                    backgroundColor: "#facc15", // yellow-400
                    color: "#000",
                  }),
                  input: (base) => ({
                    ...base,
                    color: "#fff",
                  }),
                }}
              />
            </div>
          )}
        />

        {/* Map Placeholder */}
        <div className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">
            Interactive Map (Click to set location)
          </p>
        </div>

        {/* Password */}
        <div className="space-y-2">
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-400"
          >
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              {...register("password", {
                required: "Password is required",
                minLength: 6,
              })}
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff
                  size={18}
                  className="text-gray-500 hover:text-gray-300"
                />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
            {errors.password && (
              <p className="text-red-500 text-sm">{errors.password.message}</p>
            )}
          </div>
        </div>

        {/* Confirm Password */}
        <div className="space-y-2">
          <label
            htmlFor="confirmPassword"
            className="block text-sm font-medium text-gray-400"
          >
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              {...register("confirmPassword", {
                required: "Please confirm password",
                validate: (value) =>
                  value === password || "Passwords do not match",
              })}
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff
                  size={18}
                  className="text-gray-500 hover:text-gray-300"
                />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
            {errors.confirmPassword && (
              <p className="text-red-500 text-sm">
                {errors.confirmPassword.message}
              </p>
            )}
          </div>
        </div>

        {/* Terms */}
        <div className="flex items-center">
          <input
            id="terms"
            type="checkbox"
            {...register("terms", { required: "You must accept the terms" })}
            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-yellow-500 focus:ring-yellow-500"
          />
          <label htmlFor="terms" className="ml-2 block text-sm text-gray-400">
            I agree to the{" "}
            <a href="#" className="text-yellow-500 hover:text-yellow-400">
              Terms of Service
            </a>{" "}
            and{" "}
            <a href="#" className="text-yellow-500 hover:text-yellow-400">
              Privacy Policy
            </a>
          </label>
        </div>
        {errors.terms && (
          <p className="text-red-500 text-sm mt-1">{errors.terms.message}</p>
        )}

        {/* Submit Button */}
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          type="submit"
          className="w-full flex items-center justify-center py-2 px-4 rounded-lg bg-yellow-500 hover:bg-yellow-600 text-white font-medium transition-colors"
        >
          Register NGO
          <ArrowRight size={18} className="ml-2" />
        </motion.button>
      </form>

      <div className="mt-6 text-center text-sm text-gray-400">
        Already registered?{" "}
        <a href="#" className="text-yellow-500 hover:text-yellow-400">
          Login
        </a>
      </div>
    </>
  );
}
