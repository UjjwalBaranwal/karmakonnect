"use client"

import React, { useState } from "react"
import {
  LayoutDashboard,
  Search,
  Calendar,
  HeartHandshake,
  Bell,
  ShoppingBag,
  LogOut,
  PanelLeftClose,
  PanelLeftOpen,
  Coins,
} from "lucide-react"
import { Link } from "react-router-dom"

export default function UserSidebar({ activePage = "" }) {
  const [open, setOpen] = useState(true)
  const [isMobile, setIsMobile] = useState(false)

  // Handle responsive behavior
  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsMobile(true)
        setOpen(false)
      } else {
        setIsMobile(false)
        setOpen(true)
      }
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const links = [
    { label: "Dashboard", href: "/user", icon: <LayoutDashboard className="h-5 w-5" /> },
    { label: "Explore NGOs", href: "/user/explore", icon: <Search className="h-5 w-5" /> },
    // { label: "Volunteer/Events", href: "/user/events", icon: <Calendar className="h-5 w-5" /> },
    { label: "Donations", href: "/user/donations", icon: <HeartHandshake className="h-5 w-5" /> },
    { label: "What's New", href: "/user/news", icon: <Bell className="h-5 w-5" /> },
    { label: "Karma Merch Store", href: "/user/store", icon: <ShoppingBag className="h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <LogOut className="h-5 w-5" /> },
  ]

  return (
    <>
      {/* Fixed Sidebar */}
      <aside
        className={`fixed top-0 left-0 h-full z-30 flex flex-col border-r border-gray-700 bg-gray-800 transition-all duration-300 ${
          open ? "w-64" : "w-16"
        } ${isMobile && !open ? "-translate-x-full" : "translate-x-0"}`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
          {open ? (
            <h1 className="text-xl font-bold text-teal-500">Karma Konnect</h1>
          ) : (
            <div className="h-8 w-8 bg-teal-600 rounded-lg" />
          )}
          <button onClick={() => setOpen(!open)} className="text-gray-400 hover:text-teal-500">
            {open ? <PanelLeftClose className="w-5 h-5" /> : <PanelLeftOpen className="w-5 h-5" />}
          </button>
        </div>

        {/* Navigation - with its own scrolling */}
        <nav className="flex-1 p-2 space-y-2 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-800">
          {links.map((link, index) => (
            <Link
              key={index}
              to={link.href}
              className={`flex items-center space-x-3 p-2 rounded-md hover:bg-gray-700 hover:text-teal-400 transition duration-200 ${
                activePage === link.label ? "bg-gray-700 text-teal-400" : "text-gray-300"
              }`}
            >
              {link.icon}
              {open && <span className="text-sm">{link.label}</span>}
            </Link>
          ))}
        </nav>

        {/* Karma Points */}
        <div className="px-4 py-3 border-t border-gray-700">
          <div className="flex items-center space-x-2">
            <Coins className="h-5 w-5 text-yellow-400" />
            {open && <span className="text-sm font-medium text-yellow-400">1250 Karma Points</span>}
          </div>
        </div>

        {/* Bottom Avatar */}
        <div className="flex items-center space-x-3 p-4 border-t border-gray-700">
          <img src="https://via.placeholder.com/32" className="h-8 w-8 rounded-full" alt="User avatar" />
          {open && <span className="text-sm font-medium text-gray-300">User Profile</span>}
        </div>
      </aside>

      {/* Mobile sidebar toggle button - visible only on mobile when sidebar is closed */}
      {isMobile && !open && (
        <button
          onClick={() => setOpen(true)}
          className="fixed top-4 left-4 z-50 bg-gray-800 text-teal-500 p-2 rounded-md shadow-lg"
        >
          <PanelLeftOpen className="w-5 h-5" />
        </button>
      )}

      {/* Content spacer - creates space for the fixed sidebar */}
      <div className={`${open ? "md:ml-64" : "md:ml-16"} transition-all duration-300`}></div>
    </>
  )
}
