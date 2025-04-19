"use client";

import React, { useState } from "react";
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
  IconTrash,
  IconUsers,
  IconCoin,
  IconCalendarTime,
  IconCheck,
  IconX as IconClose
} from "@tabler/icons-react";

const ManageEvents = () => {
  const [activeTab, setActiveTab] = useState("view");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Navigation links
  const navLinks = [
    { label: "Dashboard", href: "/ngo/dashboard", icon: <IconLayoutDashboard className="h-5 w-5" /> },
    { label: "Manage Events", href: "/ngo/events", icon: <IconCalendarEvent className="h-5 w-5" /> },
    { label: "Posts & Media", href: "/ngo/posts", icon: <IconPhoto className="h-5 w-5" /> },
    { label: "Logout", href: "/logout", icon: <IconLogout className="h-5 w-5" /> },
  ];

  // Tab items
  const tabItems = [
    { name: "View Existing Events", key: "view" },
    { name: "Create New Event", key: "create" },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case "view":
        return <ViewEvents />;
      case "create":
        return <CreateEvent />;
      default:
        return null;
    }
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
            <a
              key={index}
              href={link.href}
              className={`flex items-center space-x-3 p-2 rounded-md hover:bg-teal-700/30 transition duration-200 ${
                link.label === "Manage Events" ? "bg-teal-700/40 text-teal-400" : "text-gray-300"
              }`}
            >
              {link.icon}
              {sidebarOpen && <span className="text-sm">{link.label}</span>}
            </a>
          ))}
        </nav>

        {/* Bottom Avatar */}
        <div className="flex items-center space-x-3 p-4 border-t border-gray-700">
          <img src="/placeholder.svg?height=32&width=32" className="h-8 w-8 rounded-full" alt="NGO avatar" />
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
            <img src="/placeholder.svg?height=32&width=32" className="h-8 w-8 rounded-full" alt="NGO avatar" />
          </div>
        </header>

        {/* Mobile menu */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-neutral-800 border-b border-gray-700">
            <nav className="p-2 space-y-1">
              {navLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className={`flex items-center space-x-3 p-3 rounded-md hover:bg-teal-700/30 transition duration-200 ${
                    link.label === "Manage Events" ? "bg-teal-700/40 text-teal-400" : "text-gray-300"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.icon}
                  <span className="text-sm">{link.label}</span>
                </a>
              ))}
            </nav>
          </div>
        )}

        {/* Page header with tabs */}
        <div className="bg-neutral-800 p-4 border-b border-gray-700">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-2xl font-bold text-teal-400 mb-4">Manage Events</h1>
            <div className="flex space-x-2 overflow-x-auto pb-2">
              {tabItems.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`px-4 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap ${
                    activeTab === tab.key
                      ? "bg-teal-600 text-white"
                      : "bg-neutral-700 text-gray-300 hover:bg-neutral-600"
                  }`}
                >
                  {tab.name}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Main content */}
        <main className="flex-1 overflow-y-auto bg-neutral-900 p-4">
          <div className="max-w-7xl mx-auto">
            {renderContent()}
          </div>
        </main>
      </div>
    </div>
  );
};

// Bar Chart Component
const BarChart = ({ data, title }) => {
  const maxValue = Math.max(...data.map(item => item.value));
  
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-300 mb-2">{title}</h4>
      <div className="space-y-2">
        {data.map((item, index) => (
          <div key={index} className="flex items-center">
            <span className="text-xs w-24 text-gray-400">{item.label}</span>
            <div className="flex-1 h-5 bg-neutral-700 rounded-sm overflow-hidden">
              <div 
                className="h-full bg-teal-600" 
                style={{ width: `${(item.value / maxValue) * 100}%` }}
              ></div>
            </div>
            <span className="text-xs ml-2 text-gray-300">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// Doughnut Chart Component
const DoughnutChart = ({ data, title }) => {
  const total = data.reduce((acc, item) => acc + item.value, 0);
  let cumulativePercentage = 0;
  
  return (
    <div className="mt-4">
      <h4 className="text-sm font-medium text-gray-300 mb-2">{title}</h4>
      <div className="flex items-center">
        <div className="relative w-24 h-24">
          <svg viewBox="0 0 36 36" className="w-full h-full">
            {data.map((item, index) => {
              const percentage = (item.value / total) * 100;
              const startAngle = cumulativePercentage * 3.6; // 3.6 = 360/100
              cumulativePercentage += percentage;
              const endAngle = cumulativePercentage * 3.6;
              
              // Calculate the SVG path for the arc
              const x1 = 18 + 16 * Math.cos((startAngle - 90) * Math.PI / 180);
              const y1 = 18 + 16 * Math.sin((startAngle - 90) * Math.PI / 180);
              const x2 = 18 + 16 * Math.cos((endAngle - 90) * Math.PI / 180);
              const y2 = 18 + 16 * Math.sin((endAngle - 90) * Math.PI / 180);
              
              const largeArcFlag = percentage > 50 ? 1 : 0;
              
              const pathData = [
                `M 18 18`,
                `L ${x1} ${y1}`,
                `A 16 16 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                `Z`
              ].join(' ');
              
              return (
                <path 
                  key={index}
                  d={pathData}
                  fill={item.color}
                  stroke="none"
                />
              );
            })}
            <circle cx="18" cy="18" r="10" fill="#262626" />
          </svg>
        </div>
        <div className="ml-4 space-y-1">
          {data.map((item, index) => (
            <div key={index} className="flex items-center">
              <div className="w-3 h-3 rounded-sm mr-2" style={{ backgroundColor: item.color }}></div>
              <span className="text-xs text-gray-300">{item.label}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Components
const ViewEvents = () => {
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  // Sample event data with status
  const [events, setEvents] = useState([
    {
      id: 1,
      title: "Tree Plantation Drive",
      date: "2025-04-22",
      location: "Eco Park, Delhi",
      description: "Join us for a day of tree planting and environmental awareness.",
      status: "ongoing",
      volunteers: 45,
      fundsRaised: 25000,
      targetFunds: 50000,
      participantsByAge: [
        { label: "18-24", value: 15, color: "#14b8a6" },
        { label: "25-34", value: 20, color: "#0d9488" },
        { label: "35-44", value: 8, color: "#0f766e" },
        { label: "45+", value: 2, color: "#115e59" }
      ],
      participationByGender: [
        { label: "Male", value: 25 },
        { label: "Female", value: 18 },
        { label: "Other", value: 2 }
      ],
      tasks: [
        { label: "Site Preparation", value: 100 },
        { label: "Planting", value: 75 },
        { label: "Watering", value: 50 },
        { label: "Monitoring", value: 25 }
      ]
    },
    {
      id: 2,
      title: "Clothes Donation Camp",
      date: "2025-05-01",
      location: "Community Center, Mumbai",
      description: "Donate clothes for those in need. Help us spread warmth and hope.",
      status: "ended",
      endDate: "2025-05-03",
      volunteers: 32,
      fundsRaised: 15000,
      targetFunds: 20000,
      participantsByAge: [
        { label: "18-24", value: 10, color: "#14b8a6" },
        { label: "25-34", value: 12, color: "#0d9488" },
        { label: "35-44", value: 7, color: "#0f766e" },
        { label: "45+", value: 3, color: "#115e59" }
      ],
      participationByGender: [
        { label: "Male", value: 15 },
        { label: "Female", value: 16 },
        { label: "Other", value: 1 }
      ],
      tasks: [
        { label: "Collection", value: 100 },
        { label: "Sorting", value: 100 },
        { label: "Distribution", value: 90 },
        { label: "Follow-up", value: 70 }
      ]
    },
  ]);

  const openEventModal = (event) => {
    setSelectedEvent(event);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedEvent(null);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedEvent(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleStatusChange = (e) => {
    const newStatus = e.target.checked ? "ended" : "ongoing";
    const today = new Date().toISOString().split('T')[0];
    
    setSelectedEvent(prev => ({
      ...prev,
      status: newStatus,
      endDate: newStatus === "ended" ? today : null
    }));
  };

  const handleSaveEvent = () => {
    setEvents(prevEvents => 
      prevEvents.map(event => 
        event.id === selectedEvent.id ? selectedEvent : event
      )
    );
    closeModal();
  };

  return (
    <>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {events.map((event) => (
          <div
            key={event.id}
            onClick={() => openEventModal(event)}
            className="bg-neutral-800 rounded-lg p-6 shadow-md border border-gray-700 hover:border-teal-700 transition-all duration-300 cursor-pointer"
          >
            <div className="flex justify-between items-start mb-2">
              <h2 className="text-lg font-semibold text-teal-500">{event.title}</h2>
              {event.status === "ended" && (
                <span className="px-2 py-1 text-xs font-medium bg-red-900/30 text-red-400 rounded-md">
                  Ended
                </span>
              )}
              {event.status === "ongoing" && (
                <span className="px-2 py-1 text-xs font-medium bg-green-900/30 text-green-400 rounded-md">
                  Ongoing
                </span>
              )}
            </div>
            <p className="text-sm text-gray-400">
              {event.date} | {event.location}
            </p>
            <p className="mt-2 text-gray-300">
              {event.description}
            </p>
            {event.status === "ended" && (
              <p className="mt-2 text-sm text-red-400">
                Event ended on {event.endDate}
              </p>
            )}
            <div className="mt-4 flex justify-between items-center text-sm">
              <div className="flex items-center text-gray-400">
                <IconUsers className="h-4 w-4 mr-1" />
                <span>{event.volunteers} volunteers</span>
              </div>
              <div className="flex items-center text-gray-400">
                <IconCoin className="h-4 w-4 mr-1" />
                <span>₹{event.fundsRaised.toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Event Edit Modal */}
      {isModalOpen && selectedEvent && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
          <div className="bg-neutral-800 rounded-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-neutral-800 border-b border-gray-700 p-4 flex justify-between items-center z-10">
              <h2 className="text-xl font-bold text-teal-400">Edit Event</h2>
              <button 
                onClick={closeModal}
                className="text-gray-400 hover:text-white"
              >
                <IconClose className="h-6 w-6" />
              </button>
            </div>

            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left column - Event details form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Event Title
                    </label>
                    <input
                      type="text"
                      name="title"
                      value={selectedEvent.title}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Event Date
                    </label>
                    <input
                      type="date"
                      name="date"
                      value={selectedEvent.date}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Location
                    </label>
                    <input
                      type="text"
                      name="location"
                      value={selectedEvent.location}
                      onChange={handleInputChange}
                      className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2 text-gray-300">
                      Description
                    </label>
                    <textarea
                      name="description"
                      value={selectedEvent.description}
                      onChange={handleInputChange}
                      rows="4"
                      className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
                    />
                  </div>

                  <div className="flex items-center">
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input 
                        type="checkbox" 
                        className="sr-only peer"
                        checked={selectedEvent.status === "ended"}
                        onChange={handleStatusChange}
                      />
                      <div className="w-11 h-6 bg-neutral-700 peer-focus:outline-none peer-focus:ring-2 peer-focus:ring-teal-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-red-600"></div>
                      <span className="ml-3 text-sm font-medium text-gray-300">
                        {selectedEvent.status === "ended" ? "Event Ended" : "Event Ongoing"}
                      </span>
                    </label>
                  </div>

                  {selectedEvent.status === "ended" && (
                    <div>
                      <label className="block text-sm font-medium mb-2 text-gray-300">
                        End Date
                      </label>
                      <input
                        type="date"
                        name="endDate"
                        value={selectedEvent.endDate}
                        onChange={handleInputChange}
                        className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
                      />
                    </div>
                  )}
                </div>

                {/* Right column - Event statistics */}
                <div className="bg-neutral-700/30 p-4 rounded-lg border border-gray-700">
                  <h3 className="text-lg font-medium text-teal-400 mb-4">Event Statistics</h3>
                  
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div className="bg-neutral-700/50 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Volunteers</div>
                      <div className="text-2xl font-bold text-white flex items-center">
                        <IconUsers className="h-5 w-5 mr-2 text-teal-500" />
                        {selectedEvent.volunteers}
                      </div>
                    </div>
                    
                    <div className="bg-neutral-700/50 p-3 rounded-lg">
                      <div className="text-sm text-gray-400">Funds Raised</div>
                      <div className="text-2xl font-bold text-white flex items-center">
                        <IconCoin className="h-5 w-5 mr-2 text-teal-500" />
                        ₹{selectedEvent.fundsRaised.toLocaleString()}
                      </div>
                    </div>
                  </div>
                  
                  <div className="mb-4 bg-neutral-700/50 p-3 rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <div className="text-sm text-gray-400">Fundraising Goal</div>
                      <div className="text-sm text-gray-400">
                        {Math.round((selectedEvent.fundsRaised / selectedEvent.targetFunds) * 100)}%
                      </div>
                    </div>
                    <div className="w-full bg-neutral-600 rounded-full h-2.5">
                      <div 
                        className="bg-teal-600 h-2.5 rounded-full" 
                        style={{ width: `${(selectedEvent.fundsRaised / selectedEvent.targetFunds) * 100}%` }}
                      ></div>
                    </div>
                    <div className="text-xs text-right mt-1 text-gray-400">
                      ₹{selectedEvent.fundsRaised.toLocaleString()} of ₹{selectedEvent.targetFunds.toLocaleString()}
                    </div>
                  </div>
                  
                  {/* Charts */}
                  <DoughnutChart 
                    data={selectedEvent.participantsByAge} 
                    title="Participants by Age Group" 
                  />
                  
                  <BarChart 
                    data={selectedEvent.participationByGender} 
                    title="Participation by Gender" 
                  />
                  
                  <BarChart 
                    data={selectedEvent.tasks} 
                    title="Task Completion (%)" 
                  />
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 bg-neutral-700 hover:bg-neutral-600 text-white rounded-md transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md transition-colors"
                >
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

// Create Event Component with form
const CreateEvent = () => {
  const [eventData, setEventData] = useState({
    title: "",
    date: "",
    location: "",
    description: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Event Created:", eventData);
    // You can now send the data to the server to create the event
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-neutral-800 rounded-lg shadow-md border border-gray-700">
      <h2 className="text-2xl font-semibold text-teal-500 mb-4">
        Create New Event
      </h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Event Title
          </label>
          <input
            type="text"
            name="title"
            value={eventData.title}
            onChange={handleInputChange}
            className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Event Date
          </label>
          <input
            type="date"
            name="date"
            value={eventData.date}
            onChange={handleInputChange}
            className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Location
          </label>
          <input
            type="text"
            name="location"
            value={eventData.location}
            onChange={handleInputChange}
            className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2 text-gray-300">
            Description
          </label>
          <textarea
            name="description"
            value={eventData.description}
            onChange={handleInputChange}
            className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
            rows="4"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-teal-600 text-white p-2 rounded-md hover:bg-teal-500 transition-colors"
        >
          Create Event
        </button>
      </form>
    </div>
  );
};

export default ManageEvents;