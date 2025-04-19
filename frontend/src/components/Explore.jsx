"use client"

import { useState, useEffect } from "react"
import UserSidebar from "./UserSidebar"
import {
  Search,
  MapPin,
  Filter,
  SlidersHorizontal,
  Heart,
  Star,
  ChevronDown,
  Calendar,
  Users,
  ArrowUpDown,
} from "lucide-react"

// Sample NGO data
const ngoData = [
  {
    id: 1,
    name: "Green Earth Foundation",
    category: "Environment",
    rating: 4.8,
    distance: 2.4,
    image: "https://via.placeholder.com/400x200/1D3B34/FFFFFF?text=Green+Earth",
    description: "Working to protect and restore natural ecosystems through community engagement.",
    location: "San Francisco, CA",
    volunteers: 1240,
    upcomingEvents: 3,
  },
  {
    id: 2,
    name: "Children First",
    category: "Education",
    rating: 4.6,
    distance: 5.1,
    image: "https://via.placeholder.com/400x200/2A454B/FFFFFF?text=Children+First",
    description: "Providing educational opportunities for underprivileged children worldwide.",
    location: "New York, NY",
    volunteers: 890,
    upcomingEvents: 5,
  },
  {
    id: 3,
    name: "Healing Hands",
    category: "Healthcare",
    rating: 4.9,
    distance: 3.7,
    image: "https://via.placeholder.com/400x200/345E5F/FFFFFF?text=Healing+Hands",
    description: "Delivering essential healthcare services to communities in need.",
    location: "Chicago, IL",
    volunteers: 1560,
    upcomingEvents: 2,
  },
  {
    id: 4,
    name: "Food For All",
    category: "Hunger",
    rating: 4.7,
    distance: 1.8,
    image: "https://via.placeholder.com/400x200/1D3B34/FFFFFF?text=Food+For+All",
    description: "Fighting hunger through food drives and community kitchens.",
    location: "Austin, TX",
    volunteers: 720,
    upcomingEvents: 4,
  },
  {
    id: 5,
    name: "Animal Rescue League",
    category: "Animal Welfare",
    rating: 4.5,
    distance: 6.2,
    image: "https://via.placeholder.com/400x200/2A454B/FFFFFF?text=Animal+Rescue",
    description: "Rescuing and rehabilitating animals in distress and finding them forever homes.",
    location: "Seattle, WA",
    volunteers: 650,
    upcomingEvents: 2,
  },
  {
    id: 6,
    name: "Clean Water Initiative",
    category: "Environment",
    rating: 4.4,
    distance: 4.3,
    image: "https://via.placeholder.com/400x200/345E5F/FFFFFF?text=Clean+Water",
    description: "Providing clean water solutions to communities facing water scarcity.",
    location: "Portland, OR",
    volunteers: 480,
    upcomingEvents: 1,
  },
]

// Available categories for filtering
const categories = [
  "All Categories",
  "Environment",
  "Education",
  "Healthcare",
  "Hunger",
  "Animal Welfare",
  "Poverty",
  "Disaster Relief",
]

export default function Explore() {
  const [ngos, setNgos] = useState(ngoData)
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("rating")
  const [filterOpen, setFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  // Handle responsive behavior
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Filter and sort NGOs
  useEffect(() => {
    let filteredNGOs = [...ngoData]

    // Apply search filter
    if (searchTerm) {
      filteredNGOs = filteredNGOs.filter(
        (ngo) =>
          ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ngo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
          ngo.location.toLowerCase().includes(searchTerm.toLowerCase()),
      )
    }

    // Apply category filter
    if (selectedCategory !== "All Categories") {
      filteredNGOs = filteredNGOs.filter((ngo) => ngo.category === selectedCategory)
    }

    // Apply sorting
    filteredNGOs.sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "distance") return a.distance - b.distance
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "events") return b.upcomingEvents - a.upcomingEvents
      return 0
    })

    setNgos(filteredNGOs)
  }, [searchTerm, selectedCategory, sortBy])

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      {/* Sidebar */}
      <UserSidebar activePage="Explore NGOs"/>

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        {/* Header with search and filters */}
        <div className="sticky top-0 z-10 bg-gray-800 border-b border-gray-700 shadow-md">
          <div className="p-4 md:p-6">
            <h1 className="text-2xl font-bold text-teal-400 mb-4">Explore NGOs</h1>

            {/* Search bar */}
            <div className="relative mb-4">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search className="w-5 h-5 text-gray-400" />
              </div>
              <input
                type="text"
                className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent text-gray-200 placeholder-gray-400"
                placeholder="Search NGOs by name, description, or location..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>

            {/* Filter and sort controls */}
            <div className="flex flex-col md:flex-row gap-3 items-start md:items-center">
              {/* Category dropdown */}
              <div className="relative w-full md:w-auto">
                <button
                  className="flex items-center justify-between w-full md:w-48 px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg hover:bg-gray-600 transition-colors"
                  onClick={() => setFilterOpen(!filterOpen)}
                >
                  <div className="flex items-center">
                    <Filter className="w-4 h-4 mr-2 text-teal-400" />
                    <span className="text-sm">{selectedCategory}</span>
                  </div>
                  <ChevronDown className="w-4 h-4 text-gray-400" />
                </button>
                {filterOpen && (
                  <div className="absolute z-20 w-full mt-1 bg-gray-700 border border-gray-600 rounded-lg shadow-lg">
                    {categories.map((category) => (
                      <button
                        key={category}
                        className="w-full px-4 py-2 text-left text-sm hover:bg-gray-600 hover:text-teal-400 transition-colors"
                        onClick={() => {
                          setSelectedCategory(category)
                          setFilterOpen(false)
                        }}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Sort options */}
              <div className="flex items-center space-x-2 text-sm text-gray-400">
                <SlidersHorizontal className="w-4 h-4 text-teal-400" />
                <span>Sort by:</span>
                <div className="flex flex-wrap gap-2">
                  <button
                    className={`px-3 py-1 rounded-full border ${
                      sortBy === "rating"
                        ? "bg-teal-600 text-white border-teal-500"
                        : "border-gray-600 hover:border-teal-500"
                    }`}
                    onClick={() => setSortBy("rating")}
                  >
                    <div className="flex items-center">
                      <Star className="w-3 h-3 mr-1" />
                      <span>Rating</span>
                    </div>
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full border ${
                      sortBy === "distance"
                        ? "bg-teal-600 text-white border-teal-500"
                        : "border-gray-600 hover:border-teal-500"
                    }`}
                    onClick={() => setSortBy("distance")}
                  >
                    <div className="flex items-center">
                      <MapPin className="w-3 h-3 mr-1" />
                      <span>Distance</span>
                    </div>
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full border ${
                      sortBy === "name"
                        ? "bg-teal-600 text-white border-teal-500"
                        : "border-gray-600 hover:border-teal-500"
                    }`}
                    onClick={() => setSortBy("name")}
                  >
                    <div className="flex items-center">
                      <ArrowUpDown className="w-3 h-3 mr-1" />
                      <span>Name</span>
                    </div>
                  </button>
                  <button
                    className={`px-3 py-1 rounded-full border ${
                      sortBy === "events"
                        ? "bg-teal-600 text-white border-teal-500"
                        : "border-gray-600 hover:border-teal-500"
                    }`}
                    onClick={() => setSortBy("events")}
                  >
                    <div className="flex items-center">
                      <Calendar className="w-3 h-3 mr-1" />
                      <span>Events</span>
                    </div>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* NGO Cards */}
        <div className="p-4 md:p-6">
          {ngos.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-12 text-center">
              <div className="bg-gray-800 p-8 rounded-lg border border-gray-700 max-w-md">
                <Search className="w-12 h-12 text-gray-500 mx-auto mb-4" />
                <h3 className="text-xl font-medium text-gray-300 mb-2">No NGOs Found</h3>
                <p className="text-gray-400">
                  We couldn't find any NGOs matching your search criteria. Try adjusting your filters or search term.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {ngos.map((ngo) => (
                <div
                  key={ngo.id}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20 hover:border-gray-600"
                >
                  {/* NGO Image */}
                  <div className="relative h-48 overflow-hidden">
                    <img src={ngo.image || "/placeholder.svg"} alt={ngo.name} className="w-full h-full object-cover" />
                    <div className="absolute top-0 right-0 m-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-teal-400 backdrop-blur-sm">
                        {ngo.category}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 m-3 p-2 rounded-full bg-gray-900/80 text-gray-300 hover:text-teal-400 backdrop-blur-sm">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  {/* NGO Details */}
                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-teal-400 line-clamp-1">{ngo.name}</h3>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{ngo.rating}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ngo.description}</p>

                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{ngo.location}</span>
                      <span className="ml-auto text-teal-500">{ngo.distance} mi</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{ngo.volunteers} volunteers</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{ngo.upcomingEvents} upcoming events</span>
                      </div>
                    </div>

                    <button className="w-full py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md transition-colors">
                      View Profile
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Pagination - only show if we have results */}
          {ngos.length > 0 && (
            <div className="flex justify-center mt-8 mb-4">
              <nav className="flex items-center space-x-1">
                <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">Previous</button>
                <button className="px-3 py-1 rounded-md bg-teal-600 text-white">1</button>
                <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">2</button>
                <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">3</button>
                <span className="px-2 text-gray-500">...</span>
                <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">10</button>
                <button className="px-3 py-1 rounded-md bg-gray-700 text-gray-300 hover:bg-gray-600">Next</button>
              </nav>
            </div>
          )}
        </div>
      </main>
    </div>
  )
}
