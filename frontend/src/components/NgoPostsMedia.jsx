"use client";

import { useState } from "react";
import {
  IconLayoutDashboard,
  IconCalendarEvent,
  IconPhoto,
  IconSettings,
  IconLogout,
  IconArrowBarLeft,
  IconPlus,
  IconSearch,
  IconFilter,
  IconEdit,
  IconTrash,
  IconX,
  IconUpload,
} from "@tabler/icons-react";

// Sample post data
const initialPosts = [
  {
    id: 1,
    title: "Beach Cleanup Drive",
    content:
      "Join us for our annual beach cleanup drive this weekend. Together we can make a difference!",
    date: "2023-10-15",
    image: "/placeholder.svg?height=200&width=400",
    likes: 24,
    comments: 8,
  },
  {
    id: 2,
    title: "Tree Plantation Initiative",
    content:
      "We planted 500 trees last month. Check out the photos from our latest environmental initiative.",
    date: "2023-09-28",
    image: "/placeholder.svg?height=200&width=400",
    likes: 42,
    comments: 12,
  },
  {
    id: 3,
    title: "Fundraiser Success",
    content:
      "Thanks to your support, we raised $10,000 for children's education in rural areas.",
    date: "2023-09-10",
    image: "/placeholder.svg?height=200&width=400",
    likes: 56,
    comments: 15,
  },
];

// Sidebar component
function NgoSidebar({ open, setOpen }) {
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
    <aside
      className={`flex flex-col border-r border-gray-700 bg-neutral-800 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      }`}
    >
      {/* Logo and toggle */}
      <div className="flex items-center justify-between px-4 py-4 border-b border-gray-700">
        {open ? (
          <h1 className="text-xl font-bold text-teal-500">Karma Konnect</h1>
        ) : (
          <div className="h-8 w-8 bg-teal-600 rounded-lg" />
        )}
        <button
          onClick={() => setOpen(!open)}
          className="text-gray-400 hover:text-teal-500"
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
            className={`flex items-center space-x-3 p-2 rounded-md hover:bg-teal-700/30 transition duration-200 ${
              link.href === "/ngo/posts"
                ? "bg-teal-700/40 text-teal-400"
                : "text-gray-300"
            }`}
          >
            {link.icon}
            {open && <span className="text-sm">{link.label}</span>}
          </a>
        ))}
      </nav>

      {/* Bottom Avatar */}
      <div className="flex items-center space-x-3 p-4 border-t border-gray-700">
        <img
          src="/placeholder.svg?height=32&width=32"
          className="h-8 w-8 rounded-full"
          alt="NGO avatar"
        />
        {open && (
          <span className="text-sm font-medium text-gray-300">NGO Admin</span>
        )}
      </div>
    </aside>
  );
}

// Post Card Component
function PostCard({ post, onEdit, onDelete }) {
  return (
    <div className="bg-neutral-800 rounded-lg overflow-hidden border border-gray-700 hover:border-teal-700 transition-all duration-300">
      <img
        src={post.image || "/placeholder.svg"}
        alt={post.title}
        className="w-full h-48 object-cover"
      />
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-white">{post.title}</h3>
          <div className="flex space-x-2">
            <button
              onClick={() => onEdit(post)}
              className="text-gray-400 hover:text-teal-500"
            >
              <IconEdit className="h-5 w-5" />
            </button>
            <button
              onClick={() => onDelete(post.id)}
              className="text-gray-400 hover:text-red-500"
            >
              <IconTrash className="h-5 w-5" />
            </button>
          </div>
        </div>
        <p className="text-gray-300 text-sm mb-3">{post.content}</p>
        <div className="flex justify-between items-center text-xs text-gray-400">
          <span>{new Date(post.date).toLocaleDateString()}</span>
          <div className="flex space-x-3">
            <span>{post.likes} likes</span>
            <span>{post.comments} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}

// Add/Edit Post Modal
function PostModal({ isOpen, onClose, post, onSave }) {
  const [formData, setFormData] = useState(
    post || { title: "", content: "", image: null }
  );
  const [previewUrl, setPreviewUrl] = useState(post?.image || "");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewUrl(reader.result);
        setFormData({ ...formData, image: file });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // For demo purposes, we'll just use the preview URL as the image
    onSave({
      ...formData,
      image: previewUrl || "/placeholder.svg?height=200&width=400",
      date: new Date().toISOString().split("T")[0],
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center p-4 z-50">
      <div className="bg-neutral-800 rounded-lg w-full max-w-2xl">
        <div className="flex justify-between items-center p-4 border-b border-gray-700">
          <h2 className="text-xl font-semibold text-white">
            {post ? "Edit Post" : "Add New Post"}
          </h2>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <IconX className="h-5 w-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-4">
          <div className="mb-4">
            <label htmlFor="title" className="block text-gray-300 mb-2">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="content" className="block text-gray-300 mb-2">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              rows="4"
              className="w-full p-2 bg-neutral-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-300 mb-2">Image</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center justify-center h-12 px-4 bg-teal-700 hover:bg-teal-600 text-white rounded-md cursor-pointer">
                <IconUpload className="h-5 w-5 mr-2" />
                <span>Upload Image</span>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              {previewUrl && (
                <div className="relative h-12 w-12">
                  <img
                    src={previewUrl || "/placeholder.svg"}
                    alt="Preview"
                    className="h-full w-full object-cover rounded-md"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      setPreviewUrl("");
                      setFormData({ ...formData, image: null });
                    }}
                    className="absolute -top-2 -right-2 bg-red-500 rounded-full p-0.5"
                  >
                    <IconX className="h-4 w-4 text-white" />
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-600 hover:bg-gray-500 text-white rounded-md"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-teal-600 hover:bg-teal-500 text-white rounded-md"
            >
              {post ? "Update Post" : "Create Post"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// Main Posts Page Component
export default function NgoPostsMedia() {
  const [posts, setPosts] = useState(initialPosts);
  const [searchTerm, setSearchTerm] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [currentPost, setCurrentPost] = useState(null);

  const filteredPosts = posts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      post.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddPost = () => {
    setCurrentPost(null);
    setModalOpen(true);
  };

  const handleEditPost = (post) => {
    setCurrentPost(post);
    setModalOpen(true);
  };

  const handleDeletePost = (id) => {
    if (window.confirm("Are you sure you want to delete this post?")) {
      setPosts(posts.filter((post) => post.id !== id));
    }
  };

  const handleSavePost = (postData) => {
    if (currentPost) {
      // Edit existing post
      setPosts(
        posts.map((post) =>
          post.id === currentPost.id
            ? {
                ...postData,
                id: post.id,
                likes: post.likes,
                comments: post.comments,
              }
            : post
        )
      );
    } else {
      // Add new post
      const newPost = {
        ...postData,
        id: posts.length > 0 ? Math.max(...posts.map((p) => p.id)) + 1 : 1,
        likes: 0,
        comments: 0,
      };
      setPosts([newPost, ...posts]);
    }
  };

  return (
    <div className="flex h-screen bg-neutral-900 text-white">
      {/* Sidebar */}
      {/* <NgoSidebar open={open} setOpen={setOpen} /> */}

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="max-w-7xl mx-auto px-4 py-6">
          {/* Header */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
            <div>
              <h1 className="text-2xl font-bold text-teal-400">
                Posts & Media
              </h1>
              <p className="text-gray-400">
                Manage your organization's posts and media content
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-3 w-full md:w-auto">
              <div className="relative">
                <input
                  type="text"
                  placeholder="Search posts..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 bg-neutral-800 border border-gray-700 rounded-md text-white w-full sm:w-64"
                />
                <IconSearch className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
              </div>

              <button
                onClick={handleAddPost}
                className="flex items-center justify-center px-4 py-2 bg-teal-600 hover:bg-teal-500 rounded-md text-white"
              >
                <IconPlus className="h-5 w-5 mr-2" />
                <span>Add New Post</span>
              </button>
            </div>
          </div>

          {/* Filter bar */}
          <div className="flex items-center mb-6 p-3 bg-neutral-800 rounded-md border border-gray-700">
            <IconFilter className="h-5 w-5 text-gray-400 mr-2" />
            <span className="text-gray-300 text-sm mr-4">Filter by:</span>
            <div className="flex flex-wrap gap-2">
              <button className="px-3 py-1 text-xs bg-teal-700/50 hover:bg-teal-700 rounded-full text-teal-200">
                All Posts
              </button>
              <button className="px-3 py-1 text-xs bg-neutral-700 hover:bg-neutral-600 rounded-full text-gray-300">
                Recent
              </button>
              <button className="px-3 py-1 text-xs bg-neutral-700 hover:bg-neutral-600 rounded-full text-gray-300">
                Popular
              </button>
              <button className="px-3 py-1 text-xs bg-neutral-700 hover:bg-neutral-600 rounded-full text-gray-300">
                Media Only
              </button>
            </div>
          </div>

          {/* Posts grid */}
          {filteredPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredPosts.map((post) => (
                <PostCard
                  key={post.id}
                  post={post}
                  onEdit={handleEditPost}
                  onDelete={handleDeletePost}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <IconPhoto className="h-16 w-16 mx-auto text-gray-600 mb-4" />
              <h3 className="text-xl font-medium text-gray-400 mb-2">
                No posts found
              </h3>
              <p className="text-gray-500">
                {searchTerm
                  ? "Try adjusting your search terms"
                  : "Create your first post by clicking the 'Add New Post' button"}
              </p>
            </div>
          )}

          {/* Add New Post button (at the bottom) */}
          <div className="mt-8 text-center">
            <button
              onClick={handleAddPost}
              className="inline-flex items-center px-6 py-3 bg-teal-600 hover:bg-teal-500 rounded-md text-white font-medium"
            >
              <IconPlus className="h-5 w-5 mr-2" />
              <span>Add New Post</span>
            </button>
          </div>
        </div>
      </main>

      {/* Post Modal */}
      <PostModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        post={currentPost}
        onSave={handleSavePost}
      />
    </div>
  );
}
