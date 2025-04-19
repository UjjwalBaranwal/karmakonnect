"use client"

import { useState, useEffect } from "react"
import axios from "axios"
import UserSidebar from "./UserSidebar"
import { Heart, Filter, X, Share2 } from "lucide-react"

export default function WhatsNewPage() {
  const ngoCategories = [
    "All",
    "Environment",
    "Education",
    "Healthcare",
    "Animal Welfare",
    "Poverty Alleviation",
    "Women Empowerment",
  ]

  const [posts, setPosts] = useState([])
  const [expandedCaptions, setExpandedCaptions] = useState({})
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("recent")

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/v1/post/getAll") 
        console.log(res);
        setPosts(res.data.allPost)
      } catch (err) {
        console.error("Failed to fetch posts", err)
      }
    }

    fetchPosts()
  }, [])

  const toggleCaption = (postId) => {
    setExpandedCaptions((prev) => ({
      ...prev,
      [postId]: !prev[postId],
    }))
  }

  const toggleLike = (postId) => {
    setPosts((prevPosts) =>
      prevPosts.map((post) =>
        post._id === postId
          ? {
              ...post,
              isLiked: !post.isLiked,
              likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            }
          : post
      )
    )
  }

  const applyFiltersAndSort = () => {
    let filteredPosts = [...posts]

    if (selectedCategory !== "All") {
      filteredPosts = filteredPosts.filter((post) => post.ngoId?.category === selectedCategory)
    }

    if (sortOption === "popular") {
      filteredPosts.sort((a, b) => b.likes - a.likes)
    }

    setPosts(filteredPosts)
    setFilterOpen(false)
  }

  const resetFilters = () => {
    setSelectedCategory("All")
    setSortOption("recent")
    window.location.reload()
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      <UserSidebar activePage="What's New" />
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-500">What's New</h1>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-md"
            >
              <Filter className="h-4 w-4" />
              <span>Filter & Sort</span>
            </button>
          </div>

          {filterOpen && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Filter & Sort</h3>
                <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">NGO Category</label>
                  <div className="flex flex-wrap gap-2">
                    {ngoCategories.map((category) => (
                      <button
                        key={category}
                        onClick={() => setSelectedCategory(category)}
                        className={`px-3 py-1 rounded-full text-sm ${
                          selectedCategory === category
                            ? "bg-teal-600 text-white"
                            : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                        }`}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-400 mb-2">Sort By</label>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSortOption("recent")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        sortOption === "recent"
                          ? "bg-teal-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Most Recent
                    </button>
                    <button
                      onClick={() => setSortOption("popular")}
                      className={`px-3 py-1 rounded-full text-sm ${
                        sortOption === "popular"
                          ? "bg-teal-600 text-white"
                          : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                      }`}
                    >
                      Most Popular
                    </button>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-2">
                  <button onClick={resetFilters} className="px-3 py-1 text-sm text-gray-300 hover:text-white">
                    Reset
                  </button>
                  <button
                    onClick={applyFiltersAndSort}
                    className="px-4 py-1 bg-teal-600 hover:bg-teal-500 text-white rounded-md text-sm"
                  >
                    Apply
                  </button>
                </div>
              </div>
            </div>
          )}

          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post._id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 hover:shadow-lg hover:shadow-teal-900/20"
              >
                <div className="flex items-center p-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700 mr-3">
                    <img src={post.ngoId?.avatar || "/placeholder.svg"} className="h-full w-full object-cover" />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{post.ngoId?.name}</h3>
                    <span className="text-xs text-gray-400">Just now</span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-teal-400">
                      {post.ngoId?.category || "Other"}
                    </span>
                  </div>
                </div>

                {post.image && (
                  <div className="bg-gray-700">
                    <img src={post.image} alt="Post" className="w-full object-cover max-h-[500px]" />
                  </div>
                )}

                <div className="flex items-center p-4">
                  <button
                    onClick={() => toggleLike(post._id)}
                    className={`mr-4 flex items-center ${
                      post.isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${post.isLiked ? "fill-current" : ""}`} />
                    <span className="ml-1">{post.likes || 0}</span>
                  </button>
                  <button className="mr-4 flex items-center text-gray-400 hover:text-gray-300">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>

                <div className="px-4 pb-4">
                  <p className="text-gray-300">
                    <span className="font-medium text-white mr-2">{post.ngoId?.name}</span>
                    {post.story.length > 150 && !expandedCaptions[post._id]
                      ? `${post.story.substring(0, 150)}...`
                      : post.story}
                  </p>
                  {post.story.length > 150 && (
                    <button
                      onClick={() => toggleCaption(post._id)}
                      className="text-teal-500 text-sm hover:text-teal-400 mt-1"
                    >
                      {expandedCaptions[post._id] ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
