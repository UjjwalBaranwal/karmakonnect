import React, { useEffect, useState } from "react";
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
  IconEdit,
} from "@tabler/icons-react";
import { useNgo } from "../Context/NgoContext";
import axios from "axios";
import apiClient from "../utils/apiClient";

export default function NgoDashboard() {
  const [eventCount, setEventCount] = useState(-1);
  const [activeCount, setActiveCount] = useState(-1);
  const [volunteerCount, setVolunteerCount] = useState(-1);
  const { ngo } = useNgo();
  // ngo.data.ngo._id

  useEffect(() => {
    async function getData() {
      console.log(ngo);
      console.log("NGO data", ngo);
      const eventData = await axios.get(
        "http://localhost:3000/api/v1/event/ngo/" + ngo.data.ngo._id
      );

      console.log(eventData);
      const resp = eventData.data;
      console.log("Ngo Ids");
      setEventCount(resp.data.length);
      const activeNgo = resp.data.filter((ngo) => {
        return ngo.isActive == true;
      });
      setActiveCount(activeNgo.length);

      const volunteerData = await axios.get(
        "http://localhost:3000/api/v1/volunteer/getAllVolunteerByNgoId/" +
          ngo.data.ngo._id
      );
      const respVol = volunteerData.data;
      setVolunteerCount(respVol.data.length);
    }
    getData();
  }, []);
  // const [sidebarOpen, setSidebarOpen] = useState(true);
  // const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Dummy data - replace with actual props or fetched data
  // const ngoData = {
  //   name: "Helping Hands Foundation",
  //   email: "contact@helpinghands.org",
  //   type: "Child Welfare NGO",
  //   avatar: "https://assets.aceternity.com/manu.png",
  // };

  return (
    <main className="flex-1 overflow-y-auto bg-neutral-900 p-4">
      <div className="max-w-4xl mx-auto">
        {/* Dashboard Content */}
        <div className="bg-neutral-800 rounded-lg shadow-lg p-6 border border-gray-700">
          {/* Header */}
          <h2 className="text-2xl font-bold text-teal-400 mb-6">
            NGO Dashboard
          </h2>

          {/* Profile Info */}
          <div className="flex flex-col md:flex-row items-center gap-6 bg-neutral-700/30 p-6 rounded-lg border border-gray-700">
            {/* Avatar */}
            <div className="relative group">
              <img
                src={"/placeholder.svg"}
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
                {ngo?.data?.ngo?.name}
              </h3>
              <p className="text-gray-300">{ngo?.data?.ngo?.email}</p>
              <p className="text-gray-400 italic">{ngo?.data?.ngo?.type}</p>
            </div>
          </div>

          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6">
            <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700 hover:border-teal-600 transition-all duration-300">
              <h4 className="text-teal-400 font-medium">Total Events</h4>
              <p className="text-2xl font-bold text-white mt-2">{eventCount}</p>
            </div>
            <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700 hover:border-teal-600 transition-all duration-300">
              <h4 className="text-teal-400 font-medium">Active Campaigns</h4>
              <p className="text-2xl font-bold text-white mt-2">
                {activeCount}
              </p>
            </div>
            <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700 hover:border-teal-600 transition-all duration-300">
              <h4 className="text-teal-400 font-medium">Volunteers</h4>
              <p className="text-2xl font-bold text-white mt-2">
                {volunteerCount}
              </p>
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
  );
}
