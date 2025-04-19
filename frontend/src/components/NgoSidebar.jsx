"use client";
import React, { useState } from "react";
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconPhoto,
  IconSettings,
  IconLogout,
  IconArrowBarLeft,
} from "@tabler/icons-react";

export default function NgoSidebar() {
  const [open, setOpen] = useState(true);

  const links = [
    {
      label: "Dashboard",
      href: "/ngo/dashboard",
      icon: <IconLayoutDashboard className="h-5 w-5" />,
    },
    {
      label: "Manage Events",
      href: "/ngo/events",
      icon: <IconCalendarEvent className="h-5 w-5" />,
    },
    {
      label: "Posts & Media",
      href: "/ngo/posts",
      icon: <IconPhoto className="h-5 w-5" />,
    },
    {
      label: "Logout",
      href: "/logout",
      icon: <IconLogout className="h-5 w-5" />,
    },
  ];

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-neutral-900">
      {/* Sidebar */}
      <aside
        className={`flex flex-col border-r border-gray-200 dark:border-gray-800 bg-white dark:bg-neutral-800 transition-all duration-300 ${
          open ? "w-64" : "w-16"
        }`}
      >
        {/* Logo and toggle */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200 dark:border-gray-700">
          {open ? (
            <h1 className="text-xl font-bold text-teal-600">Karma Konnect</h1>
          ) : (
            <div className="h-8 w-8 bg-teal-600 rounded-lg" />
          )}
          <button
            onClick={() => setOpen(!open)}
            className="text-gray-600 hover:text-teal-600"
          >
            <IconArrowBarLeft className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 p-2 space-y-2">
          {links.map((link, index) => (
            <a
              key={index}
              href={link.href}
              className="flex items-center space-x-3 p-2 rounded-md hover:bg-teal-100 dark:hover:bg-teal-700 text-gray-800 dark:text-white transition duration-200"
            >
              {link.icon}
              {open && <span className="text-sm">{link.label}</span>}
            </a>
          ))}
        </nav>

        {/* Bottom Avatar */}
        <div className="flex items-center space-x-3 p-4 border-t border-gray-200 dark:border-gray-700">
          {/* <img src="" className="h-8 w-8 rounded-full" alt="NGO avatar" /> */}
          {open && (
            <span className="text-sm font-medium text-gray-700 dark:text-white">
              NGO Admin
            </span>
          )}
        </div>
      </aside>

      {/* Main content */}
      {/* <main className="flex-1 p-4 overflow-y-auto">
        <h2 className="text-2xl font-bold text-teal-700">Welcome back!</h2>
        {/* More content here */}
      {/* </main> */}
    </div>
  );
}
