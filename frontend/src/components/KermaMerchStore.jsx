"use client"
import UserSidebar from "./UserSidebar"
import { ShoppingCart, Eye } from "lucide-react"

export default function KarmaMerchStore() {
  // Sample product data
  const products = [
    {
      id: 1,
      name: "Karma Konnect T-Shirt",
      price: 799,
      image: "/placeholder.svg?height=200&width=200",
      description: "Organic cotton t-shirt with Karma Konnect logo",
    },
    {
      id: 2,
      name: "Eco-Friendly Tote Bag",
      price: 499,
      image: "/placeholder.svg?height=200&width=200",
      description: "Reusable tote bag made from recycled materials",
    },
    {
      id: 3,
      name: "Karma Konnect Hoodie",
      price: 1499,
      image: "/placeholder.svg?height=200&width=200",
      description: "Warm hoodie with embroidered logo",
    },
    {
      id: 4,
      name: "Stainless Steel Water Bottle",
      price: 899,
      image: "/placeholder.svg?height=200&width=200",
      description: "Eco-friendly reusable water bottle",
    },
    {
      id: 5,
      name: "Karma Bracelet",
      price: 399,
      image: "/placeholder.svg?height=200&width=200",
      description: "Handmade bracelet with karma symbol",
    },
    {
      id: 6,
      name: "Meditation Cushion",
      price: 1299,
      image: "/placeholder.svg?height=200&width=200",
      description: "Comfortable cushion for meditation practice",
    },
  ]

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-gray-900">
      {/* Sidebar */}
      <UserSidebar activePage="Karma Merch Store" />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-8 overflow-auto">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-teal-500 mb-2">Karma Merch Store</h1>
            <p className="text-gray-400">
              Support our cause with exclusive merchandise. 30% of all proceeds go to charity.
            </p>
          </div>

          {/* Products Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-gray-800 rounded-lg overflow-hidden border border-gray-700 transition-all duration-300 hover:shadow-lg hover:shadow-teal-900/20 hover:border-teal-800"
              >
                <div className="h-48 overflow-hidden bg-gray-700">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-white mb-1">{product.name}</h3>
                  <p className="text-gray-400 text-sm mb-3 h-10 overflow-hidden">{product.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-teal-400 font-bold">₹{product.price}</span>
                    <div className="flex space-x-2">
                      <button className="bg-gray-700 hover:bg-gray-600 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors duration-200">
                        <ShoppingCart className="h-4 w-4 mr-1" />
                        <span>Add</span>
                      </button>
                      <button className="bg-teal-600 hover:bg-teal-500 text-white px-3 py-1 rounded-md text-sm flex items-center transition-colors duration-200">
                        <Eye className="h-4 w-4 mr-1" />
                        <span>View</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Earn Karma Points Banner */}
          <div className="mt-12 bg-gradient-to-r from-gray-800 to-gray-700 rounded-lg p-6 border border-gray-700">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <div className="mb-4 md:mb-0">
                <h3 className="text-xl font-bold text-yellow-400 mb-2">Earn Karma Points with Every Purchase!</h3>
                <p className="text-gray-300">Redeem your points for exclusive rewards and special discounts.</p>
              </div>
              <button className="bg-yellow-500 hover:bg-yellow-400 text-gray-900 px-6 py-2 rounded-md font-medium transition-colors duration-200">
                Learn More
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}