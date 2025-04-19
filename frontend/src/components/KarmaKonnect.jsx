"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Building, Mail, Lock, Phone, Calendar, MapPin, Eye, EyeOff, ArrowRight, CheckCircle } from "lucide-react"

export default function KarmaKonnect() {
  const [userType, setUserType] = useState("user") // "user" or "ngo"
  const [formType, setFormType] = useState("login") // "login" or "signup"
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [typedText, setTypedText] = useState("")
  const fullText = "KarmaKonnect"

  // Typewriter effect for the title
  useEffect(() => {
    if (typedText.length < fullText.length) {
      const timeout = setTimeout(() => {
        setTypedText(fullText.slice(0, typedText.length + 1))
      }, 150)
      return () => clearTimeout(timeout)
    }
  }, [typedText])

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
          <p className="text-gray-400 mt-2">Connect, Contribute, Change Lives</p>
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
              <User size={32} className={userType === "user" ? "text-teal-400" : "text-gray-400"} />
              <span className="mt-3 font-medium">User</span>
              {userType === "user" && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2">
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
              <Building size={32} className={userType === "ngo" ? "text-yellow-400" : "text-gray-400"} />
              <span className="mt-3 font-medium">NGO</span>
              {userType === "ngo" && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2">
                  <CheckCircle size={20} className="text-yellow-400" />
                </motion.div>
              )}
            </motion.button>
          </div>

          <div className="mt-12">
            <p className="text-gray-400 text-sm text-center">Join our community and make a difference today</p>
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
                formType === "login" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Login
            </button>
            <button
              onClick={() => setFormType("signup")}
              className={`flex-1 py-2 rounded-md transition-all ${
                formType === "signup" ? "bg-teal-500 text-white" : "text-gray-400 hover:text-white"
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
              <LoginForm showPassword={showPassword} setShowPassword={setShowPassword} />
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
  )
}

function LoginForm({ showPassword, setShowPassword }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Welcome Back</h2>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-500 hover:text-gray-300" />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-teal-500 focus:ring-teal-500 focus:ring-offset-gray-900"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-400">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="text-teal-500 hover:text-teal-400">
              Forgot password?
            </a>
          </div>
        </div>

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

      <div className="mt-6 text-center text-sm text-gray-400">
        Don't have an account?{" "}
        <a href="#" className="text-teal-500 hover:text-teal-400">
          Sign up
        </a>
      </div>
    </>
  )
}

function UserSignupForm({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Create User Account</h2>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="name" className="block text-sm font-medium text-gray-400">
            Full Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <User size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="name"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="John Doe"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="your@email.com"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <label htmlFor="contact" className="block text-sm font-medium text-gray-400">
              Contact
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Phone size={18} className="text-gray-500" />
              </div>
              <input
                type="tel"
                id="contact"
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="+1 (555) 000-0000"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="age" className="block text-sm font-medium text-gray-400">
              Age
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Calendar size={18} className="text-gray-500" />
              </div>
              <input
                type="number"
                id="age"
                className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
                placeholder="25"
                min="18"
                max="120"
              />
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="password" className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="password"
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-500 hover:text-gray-300" />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-400">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="confirmPassword"
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-teal-500 focus:ring-1 focus:ring-teal-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={18} className="text-gray-500 hover:text-gray-300" />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
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
  )
}

function NGOSignupForm({ showPassword, setShowPassword, showConfirmPassword, setShowConfirmPassword }) {
  return (
    <>
      <h2 className="text-2xl font-bold mb-6 text-center">Register NGO</h2>

      <form className="space-y-4">
        <div className="space-y-2">
          <label htmlFor="ngoName" className="block text-sm font-medium text-gray-400">
            NGO Name
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Building size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="ngoName"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="Organization Name"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="email" className="block text-sm font-medium text-gray-400">
            Email
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Mail size={18} className="text-gray-500" />
            </div>
            <input
              type="email"
              id="email"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="ngo@organization.com"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="contact" className="block text-sm font-medium text-gray-400">
            Contact Number
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Phone size={18} className="text-gray-500" />
            </div>
            <input
              type="tel"
              id="contact"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="+1 (555) 000-0000"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="location" className="block text-sm font-medium text-gray-400">
            Location
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <MapPin size={18} className="text-gray-500" />
            </div>
            <input
              type="text"
              id="location"
              className="bg-gray-800 text-white pl-10 pr-4 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="City, Country"
            />
          </div>
        </div>

        {/* Map Placeholder */}
        <div className="w-full h-40 bg-gray-800 border border-gray-700 rounded-lg flex items-center justify-center">
          <p className="text-gray-500 text-sm">Interactive Map (Click to set location)</p>
        </div>

        <div className="space-y-2">
          <label htmlFor="ngoPassword" className="block text-sm font-medium text-gray-400">
            Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showPassword ? "text" : "password"}
              id="ngoPassword"
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff size={18} className="text-gray-500 hover:text-gray-300" />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div className="space-y-2">
          <label htmlFor="ngoConfirmPassword" className="block text-sm font-medium text-gray-400">
            Confirm Password
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Lock size={18} className="text-gray-500" />
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              id="ngoConfirmPassword"
              className="bg-gray-800 text-white pl-10 pr-10 py-2 rounded-lg w-full border border-gray-700 focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 focus:outline-none"
              placeholder="••••••••"
            />
            <button
              type="button"
              className="absolute inset-y-0 right-0 pr-3 flex items-center"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? (
                <EyeOff size={18} className="text-gray-500 hover:text-gray-300" />
              ) : (
                <Eye size={18} className="text-gray-500 hover:text-gray-300" />
              )}
            </button>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="ngoTerms"
            name="ngoTerms"
            type="checkbox"
            className="h-4 w-4 rounded border-gray-700 bg-gray-800 text-yellow-500 focus:ring-yellow-500 focus:ring-offset-gray-900"
          />
          <label htmlFor="ngoTerms" className="ml-2 block text-sm text-gray-400">
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
  )
}
