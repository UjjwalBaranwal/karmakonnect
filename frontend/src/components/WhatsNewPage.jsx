"use client"
import { useState } from "react"
import UserSidebar from "./UserSidebar"
import { Heart, MessageCircle, Share2, Filter, X } from "lucide-react"

export default function WhatsNewPage() {
  // Sample NGO categories for filtering
  const ngoCategories = [
    "All",
    "Environment",
    "Education",
    "Healthcare",
    "Animal Welfare",
    "Poverty Alleviation",
    "Women Empowerment",
  ]

  // Sample posts data
  const initialPosts = [
    {
      id: 1,
      ngo: {
        name: "Green Earth Initiative",
        avatar: "/placeholder.svg?height=40&width=40",
        category: "Environment",
      },
      image: "/placeholder.svg?height=500&width=500",
      caption:
        "Our volunteers planted 500 trees this weekend in the urban forest initiative! This is a step towards creating a greener city for all of us. The community came together and showed incredible support. We're grateful to everyone who participated and helped make this event a success. Join us next month for our river cleanup project!",
      likes: 245,
      comments: 32,
      timestamp: "2 hours ago",
      isLiked: false,
    },
    {
      id: 2,
      ngo: {
        name: "Education For All",
        avatar: "/placeholder.svg?height=40&width=40",
        category: "Education",
      },
      image: "/placeholder.svg?height=500&width=500",
      caption:
        "We distributed 1000 books to underprivileged schools today. Education is the most powerful weapon which you can use to change the world.",
      likes: 189,
      comments: 24,
      timestamp: "5 hours ago",
      isLiked: true,
    },
    {
      id: 3,
      ngo: {
        name: "Healthcare Heroes",
        avatar: "/placeholder.svg?height=40&width=40",
        category: "Healthcare",
      },
      image: "/placeholder.svg?height=500&width=500",
      caption:
        "Free medical camp organized in rural areas. Over 300 patients received treatment and consultations from our volunteer doctors.",
      likes: 321,
      comments: 45,
      timestamp: "1 day ago",
      isLiked: false,
    },
    {
      id: 4,
      ngo: {
        name: "Paws & Claws Rescue",
        avatar: "/placeholder.svg?height=40&width=40",
        category: "Animal Welfare",
      },
      image: "/placeholder.svg?height=500&width=500",
      caption:
        "Meet Luna! She was rescued last week and is now ready for adoption. Swipe to see her transformation. She's a 2-year-old mixed breed who loves cuddles and playtime.",
      likes: 412,
      comments: 56,
      timestamp: "2 days ago",
      isLiked: false,
    },
    {
      id: 5,
      ngo: {
        name: "Hunger Relief Network",
        avatar: "/placeholder.svg?height=40&width=40",
        category: "Poverty Alleviation",
      },
      image: "/placeholder.svg?height=500&width=500",
      caption:
        "Our food drive collected over 2 tons of non-perishable items that will help feed 500 families this month. Thank you to all donors!",
      likes: 267,
      comments: 38,
      timestamp: "3 days ago",
      isLiked: false,
    },
    {
      id: 6,
      ngo: {
        name: "Women's Empowerment Coalition",
        avatar: "/placeholder.svg?height=40&width=40",
        category: "Women Empowerment",
      },
      image: "/placeholder.svg?height=500&width=500",
      caption:
        "Our skill development workshop trained 50 women in digital marketing. Economic independence is the first step towards true empowerment.",
      likes: 298,
      comments: 41,
      timestamp: "4 days ago",
      isLiked: false,
    },
  ]

  // State for posts, filters, and sorting
  const [posts, setPosts] = useState(initialPosts)
  const [expandedCaptions, setExpandedCaptions] = useState({})
  const [filterOpen, setFilterOpen] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortOption, setSortOption] = useState("recent")
  const [commentInputs, setCommentInputs] = useState({})

  // Toggle caption expansion
  const toggleCaption = (postId) => {
    setExpandedCaptions({
      ...expandedCaptions,
      [postId]: !expandedCaptions[postId],
    })
  }

  // Toggle like
  const toggleLike = (postId) => {
    setPosts(
      posts.map((post) => {
        if (post.id === postId) {
          const newIsLiked = !post.isLiked
          return {
            ...post,
            isLiked: newIsLiked,
            likes: newIsLiked ? post.likes + 1 : post.likes - 1,
          }
        }
        return post
      }),
    )
  }

  // Handle comment input change
  const handleCommentChange = (postId, value) => {
    setCommentInputs({
      ...commentInputs,
      [postId]: value,
    })
  }

  // Submit comment
  const submitComment = (postId) => {
    if (commentInputs[postId]?.trim()) {
      setPosts(
        posts.map((post) => {
          if (post.id === postId) {
            return {
              ...post,
              comments: post.comments + 1,
            }
          }
          return post
        }),
      )
      // Clear input after submitting
      setCommentInputs({
        ...commentInputs,
        [postId]: "",
      })
    }
  }

  // Apply filters and sorting
  const applyFiltersAndSort = () => {
    let filteredPosts = [...initialPosts]

    // Apply category filter
    if (selectedCategory !== "All") {
      filteredPosts = filteredPosts.filter((post) => post.ngo.category === selectedCategory)
    }

    // Apply sorting
    if (sortOption === "recent") {
      // Already sorted by recent in our mock data
    } else if (sortOption === "popular") {
      filteredPosts.sort((a, b) => b.likes - a.likes)
    }

    setPosts(filteredPosts)
    setFilterOpen(false)
  }

  // Reset filters
  const resetFilters = () => {
    setSelectedCategory("All")
    setSortOption("recent")
    setPosts(initialPosts)
    setFilterOpen(false)
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      {/* Sidebar */}
      <UserSidebar activePage="What's New" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6 overflow-auto">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-bold text-teal-500">What's New</h1>
            <button
              onClick={() => setFilterOpen(!filterOpen)}
              className="flex items-center space-x-1 bg-gray-800 hover:bg-gray-700 text-gray-300 px-3 py-2 rounded-md transition-colors duration-200"
            >
              <Filter className="h-4 w-4" />
              <span>Filter & Sort</span>
            </button>
          </div>

          {/* Filter Panel */}
          {filterOpen && (
            <div className="bg-gray-800 rounded-lg p-4 mb-6 border border-gray-700 animate-in fade-in duration-200">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-semibold text-white">Filter & Sort</h3>
                <button onClick={() => setFilterOpen(false)} className="text-gray-400 hover:text-white">
                  <X className="h-5 w-5" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Category Filter */}
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

                {/* Sort Options */}
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

                {/* Action Buttons */}
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

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20"
              >
                {/* Post Header */}
                <div className="flex items-center p-4">
                  <div className="h-10 w-10 rounded-full overflow-hidden bg-gray-700 mr-3">
                    <img
                      src={post.ngo.avatar || "/placeholder.svg"}
                      alt={post.ngo.name}
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div>
                    <h3 className="font-medium text-white">{post.ngo.name}</h3>
                    <span className="text-xs text-gray-400">{post.timestamp}</span>
                  </div>
                  <div className="ml-auto">
                    <span className="text-xs px-2 py-1 bg-gray-700 rounded-full text-teal-400">
                      {post.ngo.category}
                    </span>
                  </div>
                </div>

                {/* Post Image */}
                <div className="bg-gray-700">
                  <img
                    src={post.image || "/placeholder.svg"}
                    alt="Post content"
                    className="w-full object-cover max-h-[500px]"
                  />
                </div>

                {/* Post Actions */}
                <div className="flex items-center p-4">
                  <button
                    onClick={() => toggleLike(post.id)}
                    className={`mr-4 flex items-center ${
                      post.isLiked ? "text-red-500" : "text-gray-400 hover:text-red-500"
                    }`}
                  >
                    <Heart className={`h-6 w-6 ${post.isLiked ? "fill-current" : ""}`} />
                    <span className="ml-1">{post.likes}</span>
                  </button>
                  <button className="mr-4 flex items-center text-gray-400 hover:text-gray-300">
                    <MessageCircle className="h-6 w-6" />
                    <span className="ml-1">{post.comments}</span>
                  </button>
                  <button className="flex items-center text-gray-400 hover:text-gray-300">
                    <Share2 className="h-6 w-6" />
                  </button>
                </div>

                {/* Caption */}
                <div className="px-4 pb-2">
                  <p className="text-gray-300">
                    <span className="font-medium text-white mr-2">{post.ngo.name}</span>
                    {post.caption.length > 150 && !expandedCaptions[post.id]
                      ? `${post.caption.substring(0, 150)}...`
                      : post.caption}
                  </p>
                  {post.caption.length > 150 && (
                    <button
                      onClick={() => toggleCaption(post.id)}
                      className="text-teal-500 text-sm hover:text-teal-400 mt-1"
                    >
                      {expandedCaptions[post.id] ? "Show less" : "Read more"}
                    </button>
                  )}
                </div>

                {/* Comment Input */}
                <div className="p-4 border-t border-gray-700 flex">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    value={commentInputs[post.id] || ""}
                    onChange={(e) => handleCommentChange(post.id, e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && submitComment(post.id)}
                    className="flex-1 bg-gray-700 border border-gray-600 rounded-l-md px-3 py-2 text-white placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-teal-500"
                  />
                  <button
                    onClick={() => submitComment(post.id)}
                    className="bg-teal-600 hover:bg-teal-500 text-white px-4 rounded-r-md transition-colors duration-200"
                  >
                    Post
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
