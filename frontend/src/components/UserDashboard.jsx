"use client"

import React, { useEffect, useState } from "react"
import UserSidebar from "./UserSidebar"
import { useUser } from "../Context/UserContext"
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
  Mail,
  Phone,
  Heart,
  Clock,
  Award,
  ChevronRight,
} from "lucide-react"
import axios from "axios"

// Stats Card Component
function StatCard({ icon, title, value, color }) {
  return (
    <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-md hover:shadow-lg transition-all hover:border-gray-600">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-gray-400 text-sm">{title}</p>
          <h3 className="text-xl font-bold mt-1 text-white">{value}</h3>
        </div>
        <div className={`p-2 rounded-lg ${color}`}>{icon}</div>
      </div>
    </div>
  )
}

// Activity Item Component
function ActivityItem({ icon, title, time, description, color }) {
  return (
    <div className="flex items-start space-x-3 p-3 hover:bg-gray-800 rounded-lg transition-colors">
      <div className={`p-2 rounded-full ${color} flex-shrink-0`}>{icon}</div>
      <div className="flex-1">
        <div className="flex justify-between items-start">
          <h4 className="font-medium text-white">{title}</h4>
          <span className="text-xs text-gray-400">{time}</span>
        </div>
        <p className="text-sm text-gray-400 mt-1">{description}</p>
      </div>
    </div>
  )
}

// Main Dashboard Component
export default function UserDashboard() {
  // User data (would normally come from an API or context)
//   const userData = {
//     name: "John Doe",
//     email: "john.doe@example.com",
//     contact: "+1 (555) 123-4567",
//     karmaPoints: 1250,
//     profileImage: "https://via.placeholder.com/150",
//     joinDate: "Member since Jan 2023",
//     level: "Silver Volunteer",
//   }
    const [ userData, setUserData ] = useState({});
    const [ eventCount, setEventCount ] = useState(0);
    const { user } = useUser();
    // console.log(user);
    useEffect(() => {
        async function fetchUserAndEventCount() {
            try {
              // 1. Get the logged-in user
              const userRes = await axios.get('http://localhost:3000/api/v1/user/me', {
                
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("token")}`,
                },
              }); // change if needed
              setUserData(userRes.data.data.user);
              console.log(userData);
        
              // 2. Get event count for that user
              const eventRes = await axios.get(
                `http://localhost:3000/api/v1/event/findTotalEventForUser/${userData._id}`
              );
              console.log("Event data:", eventRes.data);
        
              setEventCount(eventRes.data.totalEvent);
            } catch (err) {
              console.error("Error fetching user or event data:", err);
            }
          }
        
          fetchUserAndEventCount();
        }, []);


  // Stats data
  const stats = [
    {
      icon: <Heart className="h-5 w-5 text-white" />,
      title: "Total Donations",
      value: userData.maximumPunya,
      color: "bg-pink-500/20",
    },
    {
      icon: <Calendar className="h-5 w-5 text-white" />,
      title: "Events Attended",
      value: eventCount,
      color: "bg-blue-500/20",
    },
    // {
    //   icon: <HeartHandshake className="h-5 w-5 text-white" />,
    //   title: "NGOs Supported",
    //   value: "0",
    //   color: "bg-teal-500/20",
    // },
    // {
    //   icon: <Clock className="h-5 w-5 text-white" />,
    //   title: "Volunteer Hours",
    //   value: "48",
    //   color: "bg-purple-500/20",
    // },
  ]

  // Recent activities
  const activities = [
    {
      icon: <Heart className="h-4 w-4 text-white" />,
      title: "Donation to Save The Children",
      time: "2 days ago",
      description: "You donated $50 to the education program",
      color: "bg-pink-500/20",
    },
    {
      icon: <Calendar className="h-4 w-4 text-white" />,
      title: "Beach Cleanup Event",
      time: "1 week ago",
      description: "You registered for the upcoming beach cleanup",
      color: "bg-blue-500/20",
    },
    {
      icon: <Award className="h-4 w-4 text-white" />,
      title: "Achievement Unlocked",
      time: "2 weeks ago",
      description: "You earned the 'First Time Volunteer' badge",
      color: "bg-yellow-500/20",
    },
  ]

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Include the sidebar with Dashboard highlighted */}
      <UserSidebar activePage="Dashboard" />

      {/* Main content */}
      <main className="transition-all duration-300 md:ml-64 p-4 md:p-8">
        {/* Page header */}
        <div className="mb-8">
          <h1 className="text-2xl md:text-3xl font-bold">Dashboard</h1>
          <p className="text-gray-400 mt-1">Welcome back, {userData.name}</p>
        </div>

        {/* User profile card */}
        <div className="bg-gray-800 rounded-xl p-4 md:p-6 mb-8 border border-gray-700 shadow-lg">
          <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
            {/* Profile image with glow effect */}
            <div className="relative">
              <div className="absolute inset-0 rounded-full bg-teal-500 blur-md opacity-20"></div>
              <img
                src={userData.image || "/placeholder.svg"}
                alt="Profile"
                className="h-24 w-24 md:h-32 md:w-32 rounded-full border-4 border-teal-500 object-cover relative z-10"
              />
            </div>

            {/* User details */}
            <div className="flex-1 text-center md:text-left">
              <h2 className="text-xl md:text-2xl font-bold">{userData.name}</h2>
              <p className="text-gray-400 text-sm mt-1">{userData.level || "Level-0"}</p>
              <p className="text-gray-400 text-xs mt-1">{userData.joinDate || "12-03-2024"}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-teal-400" />
                  <span className="text-sm">{userData.email}</span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-teal-400" />
                  <span className="text-sm">{userData.phoneNumber}</span>
                </div>
              </div>
            </div>

            {/* Karma points card */}
            <div className="bg-gray-900 rounded-xl p-4 flex flex-col items-center justify-center min-w-[150px] border border-gray-700">
              <div className="flex items-center space-x-2 mb-2">
                <Coins className="h-6 w-6 text-yellow-400" />
                <span className="text-lg font-bold text-yellow-400">{userData.punya}</span>
              </div>
              <p className="text-sm text-gray-400">Karma Points</p>
              <div className="mt-3 w-full bg-gray-700 h-2 rounded-full overflow-hidden">
                <div className="bg-yellow-400 h-full rounded-full" style={{ width: "65%" }}></div>
              </div>
              <p className="text-xs text-gray-400 mt-1">250 points to next level</p>
            </div>
          </div>
        </div>

        {/* Stats grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat, index) => (
            <StatCard key={index} icon={stat.icon} title={stat.title} value={stat.value} color={stat.color} />
          ))}
        </div>

        {/* Two column layout for desktop */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Recent activities */}
          <div className="lg:col-span-2 bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Recent Activities</h3>
              <a href="#" className="text-teal-400 text-sm flex items-center hover:underline">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>
            <div className="space-y-1">
              {activities.map((activity, index) => (
                <ActivityItem
                  key={index}
                  icon={activity.icon}
                  title={activity.title}
                  time={activity.time}
                  description={activity.description}
                  color={activity.color}
                />
              ))}
            </div>
          </div>

          {/* Upcoming events */}
          <div className="bg-gray-800 rounded-xl p-4 border border-gray-700 shadow-md">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">Upcoming Events</h3>
              <a href="#" className="text-teal-400 text-sm flex items-center hover:underline">
                View All <ChevronRight className="h-4 w-4 ml-1" />
              </a>
            </div>

            {/* Event cards */}
            <div className="space-y-3">
              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-teal-500 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Beach Cleanup</p>
                  <span className="bg-teal-500/20 text-teal-400 text-xs px-2 py-1 rounded-full">Registered</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">May 15, 2023 • 9:00 AM</p>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">+42 going</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-teal-500 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Food Drive</p>
                  <span className="bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded-full">Open</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">May 22, 2023 • 10:00 AM</p>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">+18 going</span>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg p-3 border border-gray-700 hover:border-teal-500 transition-colors cursor-pointer">
                <div className="flex justify-between items-start">
                  <p className="font-medium">Tree Planting</p>
                  <span className="bg-gray-700 text-gray-400 text-xs px-2 py-1 rounded-full">Open</span>
                </div>
                <p className="text-sm text-gray-400 mt-1">June 5, 2023 • 8:00 AM</p>
                <div className="flex items-center mt-2">
                  <div className="flex -space-x-2">
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                    <img
                      src="https://via.placeholder.com/24"
                      className="h-6 w-6 rounded-full border border-gray-800"
                      alt="Participant"
                    />
                  </div>
                  <span className="text-xs text-gray-400 ml-2">+31 going</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>© 2023 Karma Konnect. All rights reserved.</p>
        </footer>
      </main>
    </div>
  )
}
