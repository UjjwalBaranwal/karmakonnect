import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconPhoto,
  IconSettings,
  IconLogout,
  IconArrowBarLeft,
  IconMenu2,
  IconX,
  IconEdit
} from "@tabler/icons-react";

export default function NgoDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dummy data - replace with actual props or fetched data
  const ngoData = {
    name: "Helping Hands Foundation",
    email: "contact@helpinghands.org",
    type: "Child Welfare NGO",
    avatar: "https://assets.aceternity.com/manu.png",
  };

  // Navigation links
  const navLinks = [
    { label: "Dashboard", href: "/ngo/dashboard", icon: <IconLayoutDashboard className="h-5 w-5" /> },
    { label: "Manage Events", href: "/ngo/events", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { label: "Posts & Media", href: "/ngo/posts", icon: <IconPhoto className="h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <IconLogout className="h-5 w-5" /> },
  ];

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
                link.label === "Dashboard" ? "bg-teal-700/40 text-teal-400" : "text-gray-300"
              }`}
            >
              {link.icon}
              {sidebarOpen && <span className="text-sm">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Bottom Avatar */}
        <div className="flex items-center space-x-3 p-4 border-t border-gray-700">
          <img src={ngoData.avatar || "/placeholder.svg"} className="h-8 w-8 rounded-full object-cover" alt="NGO avatar" />
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
            <img src={ngoData.avatar || "/placeholder.svg"} className="h-8 w-8 rounded-full object-cover" alt="NGO avatar" />
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
                    link.label === "Dashboard" ? "bg-teal-700/40 text-teal-400" : "text-gray-300"
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
          <div className="max-w-4xl mx-auto">
            {/* Dashboard Content */}
            <div className="bg-neutral-800 rounded-lg shadow-lg p-6 border border-gray-700">
              {/* Header */}
              <h2 className="text-2xl font-bold text-teal-400 mb-6">NGO Dashboard</h2>

              {/* Profile Info */}
              <div className="flex flex-col md:flex-row items-center gap-6 bg-neutral-700/30 p-6 rounded-lg border border-gray-700">
                {/* Avatar */}
                <div className="relative group">
                  <img
                    src={ngoData.avatar || "/placeholder.svg"}
                    alt="NGO Avatar"
                    className="h-24 w-24 rounded-full border-4 border-teal-500 object-cover transition-all duration-300 group-hover:border-teal-400"
                  />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-black/50 rounded-full h-24 w-24 flex items-center justify-center">
                      <IconEdit className="h-8 w-8 text-white" />
                    </div>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1 space-y-2 text-center md:text-left">
                  <h3 className="text-xl font-semibold text-white">
                    {ngoData.name}
                  </h3>
                  <p className="text-gray-300">{ngoData.email}</p>
                  <p className="text-gray-400 italic">{ngoData.type}</p>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
                <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700 hover:border-teal-600 transition-all duration-300">
                  <h4 className="text-teal-400 font-medium">Total Events</h4>
                  <p className="text-2xl font-bold text-white mt-2">24</p>
                </div>
                <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700 hover:border-teal-600 transition-all duration-300">
                  <h4 className="text-teal-400 font-medium">Active Campaigns</h4>
                  <p className="text-2xl font-bold text-white mt-2">3</p>
                </div>
                <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700 hover:border-teal-600 transition-all duration-300">
                  <h4 className="text-teal-400 font-medium">Volunteers</h4>
                  <p className="text-2xl font-bold text-white mt-2">156</p>
                </div>
              </div>

              {/* Edit Info Button */}
              <div className="mt-8 flex justify-center md:justify-end">
                <Link to="/ngo/edit-profile">
                  <button className="px-6 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition-all duration-200 shadow flex items-center">
                    <IconEdit className="h-4 w-4 mr-2" />
                    Edit Information
                  </button>
                </Link>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}