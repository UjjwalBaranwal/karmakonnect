"use client"

import { useState, useEffect } from "react"
import UserSidebar from "./UserSidebar"
import {
  Search,
  Filter,
  Shirt,
  BookOpen,
  DollarSign,
  HeartHandshake,
  MapPin,
  Clock,
  ArrowRight,
  Heart,
  Share2,
  Users,
  X,
  Calendar,
  CheckCircle,
} from "lucide-react"

export default function Donation() {
  const [activeDonations, setActiveDonations] = useState([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState("grid")

  // Modal state
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [selectedDonation, setSelectedDonation] = useState(null)

  // Form state for different donation types
  const [donationForm, setDonationForm] = useState({
    money: {
      amount: 0,
      date: formatDateForInput(new Date()),
      paymentMethod: "upi",
    },
    service: {
      hours: 1,
      date: formatDateForInput(new Date()),
      timeSlot: "morning",
      notes: "",
    },
    books: {
      quantity: 1,
      description: "",
      condition: "good",
      date: formatDateForInput(new Date()),
    },
    wearable: {
      quantity: 1,
      description: "",
      size: "medium",
      gender: "unisex",
      date: formatDateForInput(new Date()),
    },
  })

  // Format date for input field
  function formatDateForInput(date) {
    const d = new Date(date)
    const year = d.getFullYear()
    const month = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${year}-${month}-${day}`
  }

  // Mock data for active donation opportunities
  useEffect(() => {
    // In a real app, this would be an API call
    const mockActiveDonations = [
      {
        id: 1,
        ngo: {
          id: 101,
          name: "Save The Children",
          logo: "https://via.placeholder.com/50",
          location: "New Delhi, India",
          verified: true,
        },
        title: "Education for Underprivileged Children",
        description: "Help provide educational materials and support for children in rural areas.",
        donationType: "money",
        goal: 5000,
        raised: 2750,
        deadline: "2023-06-30",
        urgency: "high",
        impact: "Will support education for 100 children",
        supporters: 45,
        images: ["https://via.placeholder.com/400x200"],
        minDonation: 100,
      },
      {
        id: 2,
        ngo: {
          id: 102,
          name: "Green Earth Foundation",
          logo: "https://via.placeholder.com/50",
          location: "Mumbai, India",
          verified: true,
        },
        title: "Tree Planting Initiative",
        description: "Volunteer your time to help plant trees in urban areas to combat pollution.",
        donationType: "service",
        hoursNeeded: 200,
        hoursCommitted: 85,
        deadline: "2023-07-15",
        urgency: "medium",
        impact: "Will plant 500 trees across the city",
        supporters: 32,
        images: ["https://via.placeholder.com/400x200"],
        minHours: 2,
        maxHours: 8,
      },
      {
        id: 3,
        ngo: {
          id: 103,
          name: "Literacy For All",
          logo: "https://via.placeholder.com/50",
          location: "Bangalore, India",
          verified: true,
        },
        title: "Books for Rural Schools",
        description: "Donate textbooks and reading materials for schools in rural areas.",
        donationType: "books",
        booksNeeded: 1000,
        booksCollected: 350,
        deadline: "2023-06-25",
        urgency: "medium",
        impact: "Will benefit 15 schools and over 500 students",
        supporters: 28,
        images: ["https://via.placeholder.com/400x200"],
      },
      {
        id: 4,
        ngo: {
          id: 104,
          name: "Homeless Shelter Network",
          logo: "https://via.placeholder.com/50",
          location: "Kolkata, India",
          verified: false,
        },
        title: "Winter Clothing Drive",
        description: "Donate warm clothes for homeless individuals during the winter months.",
        donationType: "wearable",
        itemsNeeded: 500,
        itemsCollected: 120,
        deadline: "2023-05-30",
        urgency: "high",
        impact: "Will provide warmth to 200+ homeless individuals",
        supporters: 35,
        images: ["https://via.placeholder.com/400x200"],
      },
      {
        id: 5,
        ngo: {
          id: 105,
          name: "Medical Aid International",
          logo: "https://via.placeholder.com/50",
          location: "Chennai, India",
          verified: true,
        },
        title: "Emergency Medical Supplies",
        description: "Help fund essential medical supplies for underserved communities.",
        donationType: "money",
        goal: 10000,
        raised: 4200,
        deadline: "2023-06-15",
        urgency: "critical",
        impact: "Will provide medical care to 500+ patients",
        supporters: 62,
        images: ["https://via.placeholder.com/400x200"],
        minDonation: 200,
      },
      {
        id: 6,
        ngo: {
          id: 106,
          name: "Animal Rescue League",
          logo: "https://via.placeholder.com/50",
          location: "Hyderabad, India",
          verified: true,
        },
        title: "Animal Shelter Volunteers",
        description: "Volunteer your time to help care for rescued animals at our shelter.",
        donationType: "service",
        hoursNeeded: 300,
        hoursCommitted: 125,
        deadline: "2023-07-30",
        urgency: "medium",
        impact: "Will help care for 100+ rescued animals",
        supporters: 25,
        images: ["https://via.placeholder.com/400x200"],
        minHours: 3,
        maxHours: 6,
      },
      {
        id: 7,
        ngo: {
          id: 107,
          name: "Food Bank Alliance",
          logo: "https://via.placeholder.com/50",
          location: "Pune, India",
          verified: true,
        },
        title: "Clothing for Families in Need",
        description: "Donate gently used clothing for families affected by recent floods.",
        donationType: "wearable",
        itemsNeeded: 800,
        itemsCollected: 320,
        deadline: "2023-06-10",
        urgency: "high",
        impact: "Will support 150 families with essential clothing",
        supporters: 42,
        images: ["https://via.placeholder.com/400x200"],
      },
      {
        id: 8,
        ngo: {
          id: 108,
          name: "Education First",
          logo: "https://via.placeholder.com/50",
          location: "Ahmedabad, India",
          verified: false,
        },
        title: "Children's Books for Community Libraries",
        description: "Donate children's books to help establish community libraries in rural areas.",
        donationType: "books",
        booksNeeded: 2000,
        booksCollected: 750,
        deadline: "2023-07-20",
        urgency: "medium",
        impact: "Will establish 5 community libraries serving 1000+ children",
        supporters: 38,
        images: ["https://via.placeholder.com/400x200"],
      },
    ]

    setTimeout(() => {
      setActiveDonations(mockActiveDonations)
      setLoading(false)
    }, 800) // Simulate loading delay
  }, [])

  // Open donation modal
  const openDonationModal = (donation) => {
    setSelectedDonation(donation)

    // Set initial form values based on donation type
    if (donation.donationType === "money") {
      setDonationForm({
        ...donationForm,
        money: {
          ...donationForm.money,
          amount: donation.minDonation || Math.ceil((donation.goal - donation.raised) * 0.1), // 10% of remaining goal as default
        },
      })
    } else if (donation.donationType === "service") {
      setDonationForm({
        ...donationForm,
        service: {
          ...donationForm.service,
          hours: donation.minHours || 2,
        },
      })
    }

    setIsModalOpen(true)
  }

  // Close donation modal
  const closeDonationModal = () => {
    setIsModalOpen(false)
    setSelectedDonation(null)
  }

  // Handle form input changes
  const handleFormChange = (type, field, value) => {
    setDonationForm({
      ...donationForm,
      [type]: {
        ...donationForm[type],
        [field]: value,
      },
    })
  }

  // Handle form submission
  const handleSubmitDonation = (e) => {
    e.preventDefault()

    // In a real app, this would send the data to an API
    console.log("Donation submitted:", {
      donationType: selectedDonation.donationType,
      ngoId: selectedDonation.ngo.id,
      formData: donationForm[selectedDonation.donationType],
    })

    // Show success message and close modal
    alert("Thank you for your donation! The NGO will contact you with further details.")
    closeDonationModal()
  }

  // Filter donations based on type and search query
  const filteredDonations = activeDonations.filter((donation) => {
    const matchesFilter = filter === "all" || donation.donationType === filter
    const matchesSearch =
      donation.ngo.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      donation.description.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesFilter && matchesSearch
  })

  // Render donation icon based on type
  const renderDonationTypeIcon = (type) => {
    switch (type) {
      case "wearable":
        return <Shirt className="h-5 w-5 text-purple-400" />
      case "money":
        return <DollarSign className="h-5 w-5 text-green-400" />
      case "books":
        return <BookOpen className="h-5 w-5 text-blue-400" />
      case "service":
        return <HeartHandshake className="h-5 w-5 text-orange-400" />
      default:
        return null
    }
  }

  // Format progress based on donation type
  const formatProgress = (donation) => {
    switch (donation.donationType) {
      case "money":
        return {
          current: donation.raised,
          target: donation.goal,
          percentage: Math.round((donation.raised / donation.goal) * 100),
          label: `₹${donation.raised} raised of ₹${donation.goal} goal`,
        }
      case "wearable":
        return {
          current: donation.itemsCollected,
          target: donation.itemsNeeded,
          percentage: Math.round((donation.itemsCollected / donation.itemsNeeded) * 100),
          label: `${donation.itemsCollected} items collected of ${donation.itemsNeeded} needed`,
        }
      case "books":
        return {
          current: donation.booksCollected,
          target: donation.booksNeeded,
          percentage: Math.round((donation.booksCollected / donation.booksNeeded) * 100),
          label: `${donation.booksCollected} books collected of ${donation.booksNeeded} needed`,
        }
      case "service":
        return {
          current: donation.hoursCommitted,
          target: donation.hoursNeeded,
          percentage: Math.round((donation.hoursCommitted / donation.hoursNeeded) * 100),
          label: `${donation.hoursCommitted} hours committed of ${donation.hoursNeeded} needed`,
        }
      default:
        return { current: 0, target: 0, percentage: 0, label: "" }
    }
  }

  // Get urgency color
  const getUrgencyColor = (urgency) => {
    switch (urgency) {
      case "critical":
        return "text-red-500"
      case "high":
        return "text-orange-500"
      case "medium":
        return "text-yellow-500"
      default:
        return "text-blue-500"
    }
  }

  // Format deadline
  const formatDeadline = (dateString) => {
    const deadline = new Date(dateString)
    const now = new Date()
    const diffTime = deadline - now
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

    if (diffDays <= 0) {
      return "Ended"
    } else if (diffDays === 1) {
      return "1 day left"
    } else {
      return `${diffDays} days left`
    }
  }

  // Render donation form based on type
  const renderDonationForm = () => {
    if (!selectedDonation) return null

    switch (selectedDonation.donationType) {
      case "money":
        const moneyForm = donationForm.money
        const remainingGoal = selectedDonation.goal - selectedDonation.raised
        const minDonation = selectedDonation.minDonation || 100
        const maxDonation = remainingGoal

        return (
          <form onSubmit={handleSubmitDonation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Donation Amount (₹)</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={minDonation}
                  max={maxDonation}
                  step={100}
                  value={moneyForm.amount}
                  onChange={(e) => handleFormChange("money", "amount", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-teal-500"
                />
                <div className="w-24 px-3 py-2 bg-gray-700 rounded-md text-white text-center font-medium">
                  ₹{moneyForm.amount}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>Min: ₹{minDonation}</span>
                <span>Max: ₹{maxDonation}</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Payment Method</label>
              <select
                value={moneyForm.paymentMethod}
                onChange={(e) => handleFormChange("money", "paymentMethod", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="upi">UPI</option>
                <option value="card">Credit/Debit Card</option>
                <option value="netbanking">Net Banking</option>
                <option value="wallet">Digital Wallet</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Donation Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={moneyForm.date}
                  onChange={(e) => handleFormChange("money", "date", e.target.value)}
                  min={formatDateForInput(new Date())}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>

            <div className="pt-2">
              <p className="text-sm text-gray-400">
                Your donation will help {selectedDonation.ngo.name} reach their goal of ₹{selectedDonation.goal} for{" "}
                {selectedDonation.title}.
              </p>
            </div>
          </form>
        )

      case "service":
        const serviceForm = donationForm.service
        const minHours = selectedDonation.minHours || 1
        const maxHours = selectedDonation.maxHours || 8

        return (
          <form onSubmit={handleSubmitDonation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Hours You Can Volunteer</label>
              <div className="flex items-center gap-4">
                <input
                  type="range"
                  min={minHours}
                  max={maxHours}
                  step={1}
                  value={serviceForm.hours}
                  onChange={(e) => handleFormChange("service", "hours", Number.parseInt(e.target.value))}
                  className="w-full h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-orange-500"
                />
                <div className="w-24 px-3 py-2 bg-gray-700 rounded-md text-white text-center font-medium">
                  {serviceForm.hours} {serviceForm.hours === 1 ? "hour" : "hours"}
                </div>
              </div>
              <div className="flex justify-between text-xs text-gray-400 mt-1">
                <span>
                  Min: {minHours} {minHours === 1 ? "hour" : "hours"}
                </span>
                <span>Max: {maxHours} hours</span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={serviceForm.date}
                  onChange={(e) => handleFormChange("service", "date", e.target.value)}
                  min={formatDateForInput(new Date())}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Preferred Time Slot</label>
              <select
                value={serviceForm.timeSlot}
                onChange={(e) => handleFormChange("service", "timeSlot", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="morning">Morning (9 AM - 12 PM)</option>
                <option value="afternoon">Afternoon (12 PM - 3 PM)</option>
                <option value="evening">Evening (3 PM - 6 PM)</option>
                <option value="flexible">Flexible</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Additional Notes</label>
              <textarea
                value={serviceForm.notes}
                onChange={(e) => handleFormChange("service", "notes", e.target.value)}
                placeholder="Any specific skills or preferences..."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[80px]"
              ></textarea>
            </div>
          </form>
        )

      case "books":
        const booksForm = donationForm.books

        return (
          <form onSubmit={handleSubmitDonation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Number of Books</label>
              <input
                type="number"
                min="1"
                value={booksForm.quantity}
                onChange={(e) => handleFormChange("books", "quantity", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description of Books</label>
              <textarea
                value={booksForm.description}
                onChange={(e) => handleFormChange("books", "description", e.target.value)}
                placeholder="E.g., textbooks, children's books, novels, etc."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[80px]"
              ></textarea>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Condition</label>
              <select
                value={booksForm.condition}
                onChange={(e) => handleFormChange("books", "condition", e.target.value)}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              >
                <option value="new">New</option>
                <option value="like-new">Like New</option>
                <option value="good">Good</option>
                <option value="fair">Fair</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Donation Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={booksForm.date}
                  onChange={(e) => handleFormChange("books", "date", e.target.value)}
                  min={formatDateForInput(new Date())}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </form>
        )

      case "wearable":
        const wearableForm = donationForm.wearable

        return (
          <form onSubmit={handleSubmitDonation} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Number of Items</label>
              <input
                type="number"
                min="1"
                value={wearableForm.quantity}
                onChange={(e) => handleFormChange("wearable", "quantity", Number.parseInt(e.target.value))}
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Description of Items</label>
              <textarea
                value={wearableForm.description}
                onChange={(e) => handleFormChange("wearable", "description", e.target.value)}
                placeholder="E.g., winter jackets, shirts, pants, etc."
                className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500 min-h-[80px]"
              ></textarea>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Size Range</label>
                <select
                  value={wearableForm.size}
                  onChange={(e) => handleFormChange("wearable", "size", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="kids">Kids</option>
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                  <option value="xlarge">X-Large</option>
                  <option value="mixed">Mixed Sizes</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Gender</label>
                <select
                  value={wearableForm.gender}
                  onChange={(e) => handleFormChange("wearable", "gender", e.target.value)}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="men">Men</option>
                  <option value="women">Women</option>
                  <option value="kids">Kids</option>
                  <option value="unisex">Unisex</option>
                  <option value="mixed">Mixed</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-1">Donation Date</label>
              <div className="relative">
                <input
                  type="date"
                  value={wearableForm.date}
                  onChange={(e) => handleFormChange("wearable", "date", e.target.value)}
                  min={formatDateForInput(new Date())}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-md text-white focus:outline-none focus:ring-2 focus:ring-teal-500"
                />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </form>
        )

      default:
        return <p className="text-gray-400">Form not available for this donation type.</p>
    }
  }

  return (
    <div className="flex min-h-screen bg-gray-900">
      {/* Sidebar */}
      <UserSidebar activePage="Donations" />

      {/* Main Content */}
      <div className="flex-1 transition-all duration-300">
        <div className="p-4 md:p-6 max-w-7xl mx-auto">
          <div className="mb-6">
            <h1 className="text-2xl md:text-3xl font-bold text-white mb-2">Active Donation Opportunities</h1>
            <p className="text-gray-400">Discover ways to make a difference through various donation options</p>
          </div>

          {/* Filters and Search */}
          <div className="bg-gray-800 rounded-lg p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search donation opportunities..."
                  className="w-full pl-10 pr-4 py-2 bg-gray-700 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-teal-500"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <div className="flex gap-2">
                <div className="relative">
                  <select
                    className="appearance-none bg-gray-700 border border-gray-600 text-gray-200 py-2 pl-4 pr-10 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                  >
                    <option value="all">All Types</option>
                    <option value="money">Money</option>
                    <option value="wearable">Wearables</option>
                    <option value="books">Books</option>
                    <option value="service">Services</option>
                  </select>
                  <Filter className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
                </div>

                <div className="flex border border-gray-600 rounded-md overflow-hidden">
                  <button
                    className={`px-3 py-2 ${
                      viewMode === "grid" ? "bg-gray-600 text-white" : "bg-gray-700 text-gray-300"
                    }`}
                    onClick={() => setViewMode("grid")}
                  >
                    Grid
                  </button>
                  <button
                    className={`px-3 py-2 ${
                      viewMode === "list" ? "bg-gray-600 text-white" : "bg-gray-700 text-gray-300"
                    }`}
                    onClick={() => setViewMode("list")}
                  >
                    List
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Donation Type Quick Filters */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setFilter("money")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                filter === "money" ? "bg-green-900/50 border-2 border-green-500" : "bg-gray-800 hover:bg-gray-750"
              }`}
            >
              <DollarSign className="h-5 w-5 text-green-400" />
              <span className="text-white font-medium">Money</span>
            </button>
            <button
              onClick={() => setFilter("wearable")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                filter === "wearable" ? "bg-purple-900/50 border-2 border-purple-500" : "bg-gray-800 hover:bg-gray-750"
              }`}
            >
              <Shirt className="h-5 w-5 text-purple-400" />
              <span className="text-white font-medium">Wearables</span>
            </button>
            <button
              onClick={() => setFilter("books")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                filter === "books" ? "bg-blue-900/50 border-2 border-blue-500" : "bg-gray-800 hover:bg-gray-750"
              }`}
            >
              <BookOpen className="h-5 w-5 text-blue-400" />
              <span className="text-white font-medium">Books</span>
            </button>
            <button
              onClick={() => setFilter("service")}
              className={`flex items-center justify-center gap-2 p-3 rounded-lg transition-colors ${
                filter === "service" ? "bg-orange-900/50 border-2 border-orange-500" : "bg-gray-800 hover:bg-gray-750"
              }`}
            >
              <HeartHandshake className="h-5 w-5 text-orange-400" />
              <span className="text-white font-medium">Services</span>
            </button>
          </div>

          {/* Donations List */}
          {loading ? (
            <div className="flex justify-center items-center p-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-teal-500"></div>
            </div>
          ) : filteredDonations.length === 0 ? (
            <div className="bg-gray-800 rounded-lg p-8 text-center">
              <p className="text-gray-400">No active donation opportunities found matching your criteria.</p>
            </div>
          ) : viewMode === "grid" ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredDonations.map((donation) => {
                const progress = formatProgress(donation)
                return (
                  <div
                    key={donation.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow"
                  >
                    <div className="relative h-48">
                      <img
                        src={donation.images[0] || "/placeholder.svg"}
                        alt={donation.title}
                        className="w-full h-full object-cover"
                      />
                      <div className="absolute top-3 left-3 flex items-center gap-2">
                        <div
                          className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                            donation.urgency === "critical"
                              ? "bg-red-900/80 text-red-200"
                              : donation.urgency === "high"
                                ? "bg-orange-900/80 text-orange-200"
                                : "bg-yellow-900/80 text-yellow-200"
                          }`}
                        >
                          <Clock className="h-3 w-3" /> {formatDeadline(donation.deadline)}
                        </div>
                      </div>
                      <div className="absolute top-3 right-3">
                        <div className="flex items-center gap-1 bg-gray-900/80 px-2 py-1 rounded-full text-xs font-medium text-gray-200">
                          <Users className="h-3 w-3" /> {donation.supporters}
                        </div>
                      </div>
                    </div>

                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div
                          className={`flex items-center justify-center w-8 h-8 rounded-full ${
                            donation.donationType === "money"
                              ? "bg-green-900/30"
                              : donation.donationType === "wearable"
                                ? "bg-purple-900/30"
                                : donation.donationType === "books"
                                  ? "bg-blue-900/30"
                                  : "bg-orange-900/30"
                          }`}
                        >
                          {renderDonationTypeIcon(donation.donationType)}
                        </div>
                        <span className="text-sm text-gray-400 capitalize">{donation.donationType}</span>
                      </div>

                      <h3 className="text-lg font-semibold text-white mb-1 line-clamp-2">{donation.title}</h3>

                      <div className="flex items-center gap-2 mb-3">
                        <img
                          src={donation.ngo.logo || "/placeholder.svg"}
                          alt={donation.ngo.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                        <span className="text-sm text-gray-300">{donation.ngo.name}</span>
                        {donation.ngo.verified && (
                          <span className="bg-teal-900/30 text-teal-400 text-xs px-1.5 py-0.5 rounded">Verified</span>
                        )}
                      </div>

                      <p className="text-sm text-gray-400 mb-4 line-clamp-2">{donation.description}</p>

                      <div className="mb-4">
                        <div className="flex justify-between text-xs text-gray-400 mb-1">
                          <span>{progress.label}</span>
                          <span>{progress.percentage}%</span>
                        </div>
                        <div className="w-full bg-gray-700 rounded-full h-2">
                          <div
                            className={`h-2 rounded-full ${
                              donation.donationType === "money"
                                ? "bg-green-500"
                                : donation.donationType === "wearable"
                                  ? "bg-purple-500"
                                  : donation.donationType === "books"
                                    ? "bg-blue-500"
                                    : "bg-orange-500"
                            }`}
                            style={{ width: `${progress.percentage}%` }}
                          ></div>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-400">
                          <MapPin className="h-3 w-3 mr-1" />
                          {donation.ngo.location}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300">
                            <Heart className="h-4 w-4" />
                          </button>
                          <button className="p-1.5 rounded-full bg-gray-700 hover:bg-gray-600 text-gray-300">
                            <Share2 className="h-4 w-4" />
                          </button>
                        </div>
                      </div>

                      <button
                        className="mt-4 w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                        onClick={() => openDonationModal(donation)}
                      >
                        Donate Now <ArrowRight className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )
              })}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDonations.map((donation) => {
                const progress = formatProgress(donation)
                return (
                  <div
                    key={donation.id}
                    className="bg-gray-800 rounded-lg overflow-hidden shadow hover:shadow-md transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row">
                      <div className="md:w-1/4 h-48 md:h-auto relative">
                        <img
                          src={donation.images[0] || "/placeholder.svg"}
                          alt={donation.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-3 left-3">
                          <div
                            className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                              donation.urgency === "critical"
                                ? "bg-red-900/80 text-red-200"
                                : donation.urgency === "high"
                                  ? "bg-orange-900/80 text-orange-200"
                                  : "bg-yellow-900/80 text-yellow-200"
                            }`}
                          >
                            <Clock className="h-3 w-3" /> {formatDeadline(donation.deadline)}
                          </div>
                        </div>
                      </div>

                      <div className="p-4 md:w-3/4">
                        <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <div
                                className={`flex items-center justify-center w-8 h-8 rounded-full ${
                                  donation.donationType === "money"
                                    ? "bg-green-900/30"
                                    : donation.donationType === "wearable"
                                      ? "bg-purple-900/30"
                                      : donation.donationType === "books"
                                        ? "bg-blue-900/30"
                                        : "bg-orange-900/30"
                                }`}
                              >
                                {renderDonationTypeIcon(donation.donationType)}
                              </div>
                              <span className="text-sm text-gray-400 capitalize">{donation.donationType}</span>
                            </div>

                            <h3 className="text-lg font-semibold text-white mb-1">{donation.title}</h3>

                            <div className="flex items-center gap-2 mb-3">
                              <img
                                src={donation.ngo.logo || "/placeholder.svg"}
                                alt={donation.ngo.name}
                                className="w-6 h-6 rounded-full object-cover"
                              />
                              <span className="text-sm text-gray-300">{donation.ngo.name}</span>
                              {donation.ngo.verified && (
                                <span className="bg-teal-900/30 text-teal-400 text-xs px-1.5 py-0.5 rounded">
                                  Verified
                                </span>
                              )}
                            </div>

                            <p className="text-sm text-gray-400 mb-4">{donation.description}</p>

                            <div className="flex items-center gap-4 text-xs text-gray-400 mb-2">
                              <div className="flex items-center">
                                <MapPin className="h-3 w-3 mr-1" />
                                {donation.ngo.location}
                              </div>
                              <div className="flex items-center">
                                <Users className="h-3 w-3 mr-1" />
                                {donation.supporters} supporters
                              </div>
                            </div>
                          </div>

                          <div className="md:w-1/3 flex flex-col">
                            <div className="mb-4">
                              <div className="flex justify-between text-xs text-gray-400 mb-1">
                                <span>{progress.percentage}% Complete</span>
                              </div>
                              <div className="w-full bg-gray-700 rounded-full h-2 mb-1">
                                <div
                                  className={`h-2 rounded-full ${
                                    donation.donationType === "money"
                                      ? "bg-green-500"
                                      : donation.donationType === "wearable"
                                        ? "bg-purple-500"
                                        : donation.donationType === "books"
                                          ? "bg-blue-500"
                                          : "bg-orange-500"
                                  }`}
                                  style={{ width: `${progress.percentage}%` }}
                                ></div>
                              </div>
                              <div className="text-xs text-gray-400">{progress.label}</div>
                            </div>

                            <button
                              className="w-full py-2 px-4 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-colors flex items-center justify-center gap-2"
                              onClick={() => openDonationModal(donation)}
                            >
                              Donate Now <ArrowRight className="h-4 w-4" />
                            </button>

                            <div className="flex justify-between mt-3">
                              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-400">
                                <Heart className="h-4 w-4" /> Save
                              </button>
                              <button className="flex items-center gap-1 text-xs text-gray-400 hover:text-teal-400">
                                <Share2 className="h-4 w-4" /> Share
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}

          {/* Pagination - simplified for this example */}
          <div className="mt-8 flex justify-center">
            <nav className="flex items-center gap-1">
              <button className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">Previous</button>
              <button className="px-3 py-1 rounded bg-teal-600 text-white">1</button>
              <button className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">2</button>
              <button className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">3</button>
              <button className="px-3 py-1 rounded bg-gray-700 text-gray-300 hover:bg-gray-600">Next</button>
            </nav>
          </div>
        </div>
      </div>

      {/* Donation Modal */}
      {isModalOpen && selectedDonation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70">
          <div className="bg-gray-800 rounded-lg shadow-xl w-full max-w-md max-h-[90vh] overflow-hidden">
            {/* Modal Header */}
            <div className="flex items-center justify-between p-4 border-b border-gray-700">
              <div className="flex items-center gap-3">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full ${
                    selectedDonation.donationType === "money"
                      ? "bg-green-900/30"
                      : selectedDonation.donationType === "wearable"
                        ? "bg-purple-900/30"
                        : selectedDonation.donationType === "books"
                          ? "bg-blue-900/30"
                          : "bg-orange-900/30"
                  }`}
                >
                  {renderDonationTypeIcon(selectedDonation.donationType)}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">Make a Donation</h3>
                  <p className="text-sm text-gray-400">{selectedDonation.ngo.name}</p>
                </div>
              </div>
              <button onClick={closeDonationModal} className="text-gray-400 hover:text-white transition-colors">
                <X className="h-6 w-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-4 overflow-y-auto max-h-[60vh]">
              <div className="mb-4">
                <h4 className="text-white font-medium mb-1">{selectedDonation.title}</h4>
                <p className="text-sm text-gray-400">{selectedDonation.description}</p>
              </div>

              {renderDonationForm()}
            </div>

            {/* Modal Footer */}
            <div className="p-4 border-t border-gray-700 flex justify-between">
              <button
                onClick={closeDonationModal}
                className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-gray-300 rounded-md transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitDonation}
                className="px-4 py-2 bg-teal-600 hover:bg-teal-700 text-white rounded-md font-medium transition-colors flex items-center gap-2"
              >
                <CheckCircle className="h-4 w-4" /> Send Details
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
