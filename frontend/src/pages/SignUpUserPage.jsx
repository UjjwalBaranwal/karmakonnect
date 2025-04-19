import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhone,
  FaMapMarkerAlt,
  FaEye,
  FaEyeSlash,
  FaCheckCircle,
  FaTimesCircle,
} from "react-icons/fa";
// import { useLoadScript, Autocomplete } from "@react-google-maps/api";
import { toast, Toaster } from "react-hot-toast";

const libraries = ["places"];

function SignupUserPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    address: "",
    latitude: "",
    longitude: "",
  });
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [passwordChecks, setPasswordChecks] = useState({
    length: false,
    number: false,
    special: false,
    capital: false,
  });

  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  //     libraries,
  //   });
  const [autocomplete, setAutocomplete] = useState(null);

  const handlePasswordChange = (e) => {
    const password = e.target.value;
    setFormData((prev) => ({ ...prev, password }));

    const checks = {
      length: password.length >= 8,
      number: /\d/.test(password),
      special: /[!@#$%^&*(),.?\":{}|<>]/.test(password),
      capital: /[A-Z]/.test(password),
    };
    setPasswordChecks(checks);
    setPasswordStrength(Object.values(checks).filter(Boolean).length * 25);
  };

  const handlePlaceSelect = () => {
    if (autocomplete) {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        setFormData((prev) => ({
          ...prev,
          address: place.formatted_address,
          latitude: place.geometry.location.lat(),
          longitude: place.geometry.location.lng(),
        }));
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // basic validation
    if (passwordStrength < 75) {
      toast.error("Please choose a stronger password.");
      return;
    }
    if (!/^\d{10}$/.test(formData.phone)) {
      toast.error("Phone must be 10 digits.");
      return;
    }
    try {
      // TODO: call your API
      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      toast.error(err.message || "Error creating account");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50  py-10 flex items-center justify-center">
      
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-teal-400 to-blue-500">
            Join KarmaKonnect
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Start your journey of making a difference
          </p>
        </div>

        
    
    
    </div>
  );
}

export default SignupUserPage;
