"use client"

import { useState, useEffect } from "react"
import axios from "axios"
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
  const [ngos, setNgos] = useState([])
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All Categories")
  const [sortBy, setSortBy] = useState("rating")
  const [filterOpen, setFilterOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768)

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768)
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  useEffect(() => {
    const fetchNgos = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/ngo/ngos") // replace with actual backend endpoint
        setNgos(res.data.ngos || [])
      } catch (err) {
        console.error("Failed to fetch NGOs:", err)
      }
    }
    fetchNgos()
  }, [])

  const filteredAndSortedNgos = ngos
    .filter((ngo) => {
      const matchesSearch =
        ngo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ngo.location.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesCategory =
        selectedCategory === "All Categories" || ngo.category === selectedCategory

      return matchesSearch && matchesCategory
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating
      if (sortBy === "distance") return a.distance - b.distance
      if (sortBy === "name") return a.name.localeCompare(b.name)
      if (sortBy === "events") return b.upcomingEvents - a.upcomingEvents
      return 0
    })

  return (
    <div className="flex h-screen bg-gray-900 text-gray-200">
      <UserSidebar activePage="Explore NGOs" />
      <main className="flex-1 overflow-y-auto">
        {/* header and filters unchanged */}
        {/* ... truncated for brevity ... */}

        <div className="p-4 md:p-6">
          {filteredAndSortedNgos.length === 0 ? (
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
              {filteredAndSortedNgos.map((ngo) => (
                <div
                  key={ngo._id || ngo.id}
                  className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20 hover:border-gray-600"
                >
                  <div className="relative h-48 overflow-hidden">
                    <img
                      src={ngo.image || "/placeholder.svg"}
                      alt={ngo.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute top-0 right-0 m-3">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-900/80 text-teal-400 backdrop-blur-sm">
                        {ngo.category}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 m-3 p-2 rounded-full bg-gray-900/80 text-gray-300 hover:text-teal-400 backdrop-blur-sm">
                      <Heart className="w-5 h-5" />
                    </button>
                  </div>

                  <div className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-lg font-semibold text-teal-400 line-clamp-1">{ngo.name}</h3>
                      <div className="flex items-center text-yellow-400">
                        <Star className="w-4 h-4 fill-current" />
                        <span className="ml-1 text-sm font-medium">{ngo.rating || "-"}</span>
                      </div>
                    </div>

                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">{ngo.description}</p>

                    <div className="flex items-center text-gray-400 text-sm mb-3">
                      <MapPin className="w-4 h-4 mr-1 text-gray-500" />
                      <span>{ngo.location}</span>
                      <span className="ml-auto text-teal-500">{ngo.distance ? `${ngo.distance} mi` : ""}</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="flex items-center text-gray-400 text-sm">
                        <Users className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{ngo.volunteers || 0} volunteers</span>
                      </div>
                      <div className="flex items-center text-gray-400 text-sm">
                        <Calendar className="w-4 h-4 mr-1 text-gray-500" />
                        <span>{ngo.upcomingEvents || 0} upcoming events</span>
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
        </div>
      </main>
    </div>
  )
}
