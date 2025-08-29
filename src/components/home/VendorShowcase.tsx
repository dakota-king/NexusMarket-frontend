'use client'

import Link from 'next/link'
import { Star, MapPin, Globe, CheckCircle } from 'lucide-react'

// Mock vendors data
const mockTopVendors = [
  {
    id: 1,
    businessName: 'TechStore Pro',
    description: 'Premium technology products and gadgets',
    logo: '/api/placeholder/80/80',
    banner: '/api/placeholder/400/200',
    rating: 4.8,
    reviewCount: 1250,
    productCount: 450,
    location: 'San Francisco, CA',
    website: 'https://techstore.com',
    isVerified: true,
    specialties: ['Electronics', 'Gadgets', 'Smart Home']
  },
  {
    id: 2,
    businessName: 'Fashion Forward',
    description: 'Trendy fashion and lifestyle accessories',
    logo: '/api/placeholder/80/80',
    banner: '/api/placeholder/400/200',
    rating: 4.6,
    reviewCount: 890,
    productCount: 320,
    location: 'New York, NY',
    website: 'https://fashionforward.com',
    isVerified: true,
    specialties: ['Fashion', 'Accessories', 'Lifestyle']
  },
  {
    id: 3,
    businessName: 'Home & Garden Co',
    description: 'Quality home improvement and gardening supplies',
    logo: '/api/placeholder/80/80',
    banner: '/api/placeholder/400/200',
    rating: 4.5,
    reviewCount: 567,
    productCount: 280,
    location: 'Portland, OR',
    website: 'https://homegarden.com',
    isVerified: true,
    specialties: ['Home Improvement', 'Gardening', 'Tools']
  },
  {
    id: 4,
    businessName: 'Sports Elite',
    description: 'Professional sports equipment and outdoor gear',
    logo: '/api/placeholder/80/80',
    banner: '/api/placeholder/400/200',
    rating: 4.7,
    reviewCount: 423,
    productCount: 195,
    location: 'Denver, CO',
    website: 'https://sportselite.com',
    isVerified: true,
    specialties: ['Sports', 'Outdoor', 'Fitness']
  }
]

export function VendorShowcase() {
  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Top Vendors
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Shop from our verified and highly-rated vendors who deliver quality products and exceptional service
          </p>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {mockTopVendors.map((vendor) => (
            <div
              key={vendor.id}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden border border-gray-200 dark:border-gray-700"
            >
              {/* Vendor Banner */}
              <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-600">
                <img
                  src={vendor.banner}
                  alt={vendor.businessName}
                  className="w-full h-full object-cover opacity-20"
                />
                
                {/* Verification Badge */}
                {vendor.isVerified && (
                  <div className="absolute top-4 right-4 bg-white text-green-600 px-2 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                    <CheckCircle className="h-3 w-3" />
                    <span>Verified</span>
                  </div>
                )}
              </div>

              {/* Vendor Info */}
              <div className="p-6">
                <div className="flex items-start space-x-4 mb-4">
                  {/* Logo */}
                  <div className="flex-shrink-0">
                    <img
                      src={vendor.logo}
                      alt={vendor.businessName}
                      className="w-16 h-16 rounded-lg object-cover border-2 border-gray-200 dark:border-gray-600"
                    />
                  </div>

                  {/* Basic Info */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-xl font-bold text-gray-900 dark:text-gray-100 mb-1">
                      {vendor.businessName}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                      {vendor.description}
                    </p>
                    
                    {/* Rating */}
                    <div className="flex items-center space-x-2">
                      <div className="flex items-center">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.floor(vendor.rating)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-gray-600 dark:text-gray-400">
                        {vendor.rating} ({vendor.reviewCount.toLocaleString()})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {vendor.productCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
                  </div>
                  <div className="text-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                    <div className="text-lg font-bold text-gray-900 dark:text-gray-100">
                      {vendor.reviewCount.toLocaleString()}
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Reviews</div>
                  </div>
                </div>

                {/* Location and Website */}
                <div className="flex items-center justify-between mb-4 text-sm text-gray-600 dark:text-gray-400">
                  <div className="flex items-center space-x-1">
                    <MapPin className="h-4 w-4" />
                    <span>{vendor.location}</span>
                  </div>
                  <a
                    href={vendor.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center space-x-1 hover:text-primary transition-colors"
                  >
                    <Globe className="h-4 w-4" />
                    <span>Website</span>
                  </a>
                </div>

                {/* Specialties */}
                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 mb-2">
                    Specialties
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {vendor.specialties.map((specialty, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-primary/10 text-primary text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* View Store Button */}
                <Link
                  href={`/vendors/${vendor.id}`}
                  className="block w-full text-center btn-outline hover:bg-primary hover:text-white transition-colors"
                >
                  View Store
                </Link>
              </div>
            </div>
          ))}
        </div>

        {/* View All Vendors Button */}
        <div className="text-center mt-12">
          <Link
            href="/vendors"
            className="btn-outline text-lg px-8 py-3 hover:bg-primary hover:text-white transition-colors"
          >
            View All Vendors
          </Link>
        </div>
      </div>
    </section>
  )
}
