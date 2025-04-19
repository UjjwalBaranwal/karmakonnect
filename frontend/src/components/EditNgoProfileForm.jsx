import React, { useState } from "react";
import { Link } from "react-router-dom";
import { FileUpload } from "./FileUpload";
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconPhoto,
  IconSettings,
  IconLogout,
  IconArrowBarLeft,
  IconMenu2,
  IconX,
  IconUpload,
  IconUser
} from "@tabler/icons-react";

const EditNgoProfileForm = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "Helping Hands Foundation", // Pre-filled for demo
    email: "contact@helpinghands.org", // Pre-filled for demo
    password: "",
    type: "education", // Pre-filled for demo
    profilePhoto: null,
  });

  // Navigation links
  const navLinks = [
    { label: "Dashboard", href: "/ngo/dashboard", icon: <IconLayoutDashboard className="h-5 w-5" /> },
    { label: "Manage Events", href: "/ngo/events", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { label: "Posts & Media", href: "/ngo/posts", icon: <IconPhoto className="h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <IconLogout className="h-5 w-5" /> },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (files) => {
    setFormData((prev) => ({
      ...prev,
      profilePhoto: files[0],
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // TODO: Send `formData` to your backend via fetch or axios
    console.log("Submitting NGO Update:", formData);
  };

  // Custom styled file upload component to match our theme
  const StyledFileUpload = ({ onChange }) => {
    const [fileName, setFileName] = useState("");
    
    const handleFileChange = (e) => {
      const files = e.target.files;
      if (files.length > 0) {
        setFileName(files[0].name);
        onChange(files);
      }
    };
    
    return (
      <div className="relative">
        <input
          type="file"
          id="file-upload"
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
        <label
          htmlFor="file-upload"
          className="flex items-center justify-center w-full p-3 border border-gray-600 border-dashed rounded-lg cursor-pointer bg-neutral-700/30 hover:bg-neutral-700/50 transition-colors"
        >
          <div className="flex flex-col items-center space-y-2">
            <IconUpload className="h-8 w-8 text-teal-500" />
            <span className="text-sm text-gray-300">
              {fileName ? fileName : "Click to upload profile photo"}
            </span>
          </div>
        </label>
      </div>
    );
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Sidebar for larger screens */}
      <aside
        className={`hidden md:flex flex-col border-r border-gray-700 bg-neutral-800 transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {sidebarOpen ? (
            <h1 className="text-xl font-bold text-teal-500">Karma Konnect</h1>
          ) : (
            <div className="h-8 w-8 bg-teal-600 rounded-lg" />
          )}
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-400 hover:text-teal-500">
            <IconArrowBarLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          {navLinks.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`flex items-center space-x-3 p-2 rounded-md hover:bg-teal-700/30 transition duration-200 ${
                link.active ? "bg-teal-700/40 text-teal-400" : "text-gray-300"
              }`}
            >
              {link.icon}
              {sidebarOpen && <span className="text-sm">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Avatar */}
        <div className="flex items-center space-x-3 p-4 border-t border-gray-700">
          <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
            <IconUser className="h-5 w-5 text-white" />
          </div>
          {sidebarOpen && <span className="text-sm font-medium text-gray-300">NGO Admin</span>}
        </div>
      </aside>

      {/* Main content area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Mobile header */}
        <header className="bg-neutral-800 border-b border-gray-700 p-4 flex items-center justify-between md:hidden">
          <div className="flex items-center">
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
              className="text-gray-400 hover:text-teal-500 mr-3"
            >
              {mobileMenuOpen ? (
                <IconX className="h-6 w-6" />
              ) : (
                <IconMenu2 className="h-6 w-6" />
              )}
            </button>
            <h1 className="text-xl font-bold text-teal-500">Karma Konnect</h1>
          </div>
          <div className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-full bg-teal-600 flex items-center justify-center">
              <IconUser className="h-5 w-5 text-white" />
            </div>
          </div>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-800 border-b border-gray-700">
            <nav className="p-2 space-y-1">
              {navLinks.map((link, index) => (
                <Link
                  key={index}
                  to={link.href}
                  className={`flex items-center space-x-3 p-3 rounded-md hover:bg-teal-700/30 transition duration-200 ${
                    link.active ? "bg-teal-700/40 text-teal-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </Link>
              ))}
            </nav>
          </div>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-neutral-900 p-4">
          <div className="max-w-2xl mx-auto">
            <div className="bg-neutral-800 rounded-lg shadow-lg p-6 border border-gray-700">
              <div className="flex items-center mb-6">
                <IconSettings className="h-6 w-6 text-teal-500 mr-3" />
                <h2 className="text-2xl font-bold text-teal-400">Edit NGO Profile</h2>
              </div>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Organization Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-600 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Your organization name"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-600 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="contact@organization.org"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-600 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                    placeholder="Leave blank to keep current password"
                  />
                </div>

                <div>
                  <label className="block mb-1 text-sm font-medium text-gray-300">
                    Type of NGO
                  </label>
                  <select
                    name="type"
                    value={formData.type}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 rounded-md border border-gray-600 bg-neutral-700 text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:border-transparent"
                  >
                    <option value="">Select a type</option>
                    <option value="environment">Environment</option>
                    <option value="education">Education</option>
                    <option value="healthcare">Healthcare</option>
                    <option value="animal">Animal Welfare</option>
                    <option value="women">Women Empowerment</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 text-sm font-medium text-gray-300">
                    Profile Photo
                  </label>
                  <StyledFileUpload onChange={handleFileChange} />
                </div>

                <div className="flex space-x-4 pt-4">
                  <Link 
                    to="/ngo/dashboard" 
                    className="flex-1 py-2 px-4 bg-neutral-700 hover:bg-neutral-600 text-white font-medium rounded-md transition duration-300 text-center"
                  >
                    Cancel
                  </Link>
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-teal-600 hover:bg-teal-500 text-white font-medium rounded-md transition duration-300"
                  >
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditNgoProfileForm;