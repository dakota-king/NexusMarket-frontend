'use client'

import { useState } from 'react'
import { Heart, ShoppingCart, Star, Eye } from 'lucide-react'
import { useStore } from '@/lib/stores/useStore'
import { formatPrice, calculateDiscount } from '@/lib/utils'
import { Product } from '@/types'
import Link from 'next/link'

// Mock featured products data
const mockFeaturedProducts: Product[] = [
  {
    id: 1,
    vendorId: 1,
    vendor: {
      id: 1,
      userId: '1',
      businessName: 'TechStore Pro',
      description: 'Premium technology products',
      logo: '/api/placeholder/40/40',
      banner: '/api/placeholder/400/200',
      address: { id: 1, street: '123 Tech St', city: 'San Francisco', state: 'CA', postalCode: '94105', country: 'USA' },
      contactInfo: { phone: '+1-555-0123', website: 'https://techstore.com', email: 'contact@techstore.com' },
      rating: 4.8,
      reviewCount: 1250,
      isVerified: true,
      isActive: true,
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    name: 'Wireless Bluetooth Headphones',
    description: 'Premium noise-canceling wireless headphones with 30-hour battery life',
    price: 199.99,
    compareAtPrice: 249.99,
    images: ['/api/placeholder/400/400'],
    category: { id: 1, name: 'Electronics', slug: 'electronics', description: 'Electronic devices and accessories' },
    tags: ['wireless', 'bluetooth', 'noise-canceling', 'premium'],
    variants: [],
    inventory: { id: 1, productId: 1, quantity: 50, lowStockThreshold: 10, isInStock: true, lastUpdated: '2024-01-15T10:00:00.000Z' },
    rating: 4.8,
    reviewCount: 342,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    id: 2,
    vendorId: 2,
    vendor: {
      id: 2,
      userId: '2',
      businessName: 'Fashion Forward',
      description: 'Trendy fashion and accessories',
      logo: '/api/placeholder/40/40',
      banner: '/api/placeholder/400/200',
      address: { id: 2, street: '456 Fashion Ave', city: 'New York', state: 'NY', postalCode: '10001', country: 'USA' },
      contactInfo: { phone: '+1-555-0456', website: 'https://fashionforward.com', email: 'hello@fashionforward.com' },
      rating: 4.6,
      reviewCount: 890,
      isVerified: true,
      isActive: true,
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    name: 'Designer Leather Handbag',
    description: 'Handcrafted genuine leather handbag with premium hardware',
    price: 299.99,
    compareAtPrice: 399.99,
    images: ['/api/placeholder/400/400'],
    category: { id: 2, name: 'Fashion', slug: 'fashion', description: 'Clothing and accessories' },
    tags: ['leather', 'designer', 'handcrafted', 'premium'],
    variants: [],
    inventory: { id: 2, productId: 2, quantity: 25, lowStockThreshold: 5, isInStock: true, lastUpdated: '2024-01-15T10:00:00.000Z' },
    rating: 4.7,
    reviewCount: 156,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
  {
    id: 3,
    vendorId: 3,
    vendor: {
      id: 3,
      userId: '3',
      businessName: 'Home & Garden Co',
      description: 'Quality home and garden products',
      logo: '/api/placeholder/40/40',
      banner: '/api/placeholder/400/200',
      address: { id: 3, street: '789 Garden St', city: 'Portland', state: 'OR', postalCode: '97201', country: 'USA' },
      contactInfo: { phone: '+1-555-0789', website: 'https://homegarden.com', email: 'info@homegarden.com' },
      rating: 4.5,
      reviewCount: 567,
      isVerified: true,
      isActive: true,
      createdAt: '2024-01-15T10:00:00.000Z',
      updatedAt: '2024-01-15T10:00:00.000Z'
    },
    name: 'Smart LED Grow Light',
    description: 'Full-spectrum LED grow light with smart controls and timer',
    price: 89.99,
    compareAtPrice: 129.99,
    images: ['/api/placeholder/400/400'],
    category: { id: 3, name: 'Home & Garden', slug: 'home-garden', description: 'Home improvement and gardening' },
    tags: ['LED', 'smart', 'grow light', 'indoor gardening'],
    variants: [],
    inventory: { id: 3, productId: 3, quantity: 75, lowStockThreshold: 15, isInStock: true, lastUpdated: '2024-01-15T10:00:00.000Z' },
    rating: 4.4,
    reviewCount: 89,
    isActive: true,
    isFeatured: true,
    createdAt: '2024-01-15T10:00:00.000Z',
    updatedAt: '2024-01-15T10:00:00.000Z'
  },
]

export function FeaturedProducts() {
  const { addToCart, addToWishlist, removeFromWishlist, isInWishlist } = useStore()
  const [hoveredProduct, setHoveredProduct] = useState<number | null>(null)

  const handleAddToCart = (product: Product) => {
    addToCart({
      id: Math.floor(Math.random() * 1000000), // Use random number instead of Date.now()
      productId: product.id,
      quantity: 1,
      price: product.price,
      vendorId: product.vendorId,
      vendorName: product.vendor.businessName,
      productName: product.name,
      productImage: product.images[0]
    })
  }

  const handleWishlistToggle = (productId: number) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId)
    } else {
      addToWishlist(productId)
    }
  }

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Featured Products
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover our handpicked selection of premium products from trusted vendors
          </p>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockFeaturedProducts.map((product) => (
            <div
              key={product.id}
              className="group bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden"
              onMouseEnter={() => setHoveredProduct(product.id)}
              onMouseLeave={() => setHoveredProduct(null)}
            >
              {/* Product Image */}
              <div className="relative aspect-square overflow-hidden">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                
                {/* Quick Actions Overlay */}
                <div className={`absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center space-x-4 transition-opacity duration-300 ${
                  hoveredProduct === product.id ? 'opacity-100' : 'opacity-0'
                }`}>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    title="Add to Cart"
                  >
                    <ShoppingCart className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => handleWishlistToggle(product.id)}
                    className={`p-3 rounded-full transition-colors ${
                      isInWishlist(product.id)
                        ? 'bg-red-500 text-white hover:bg-red-600'
                        : 'bg-white text-gray-900 hover:bg-gray-100'
                    }`}
                    title={isInWishlist(product.id) ? 'Remove from Wishlist' : 'Add to Wishlist'}
                  >
                    <Heart className="h-5 w-5" />
                  </button>
                  <Link
                    href={`/products/${product.id}`}
                    className="bg-white text-gray-900 p-3 rounded-full hover:bg-gray-100 transition-colors"
                    title="View Details"
                  >
                    <Eye className="h-5 w-5" />
                  </Link>
                </div>

                {/* Discount Badge */}
                {product.compareAtPrice && product.compareAtPrice > product.price && (
                  <div className="absolute top-4 left-4 bg-red-500 text-white px-2 py-1 rounded-md text-sm font-medium">
                    -{calculateDiscount(product.compareAtPrice, product.price)}%
                  </div>
                )}

                {/* Vendor Badge */}
                <div className="absolute top-4 right-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 px-2 py-1 rounded-md text-xs font-medium shadow-sm">
                  {product.vendor.businessName}
                </div>
              </div>

              {/* Product Info */}
              <div className="p-4">
                {/* Category */}
                <p className="text-sm text-primary font-medium mb-2">
                  {product.category.name}
                </p>

                {/* Product Name */}
                <Link href={`/products/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-2 hover:text-primary transition-colors line-clamp-2">
                    {product.name}
                  </h3>
                </Link>

                {/* Rating */}
                <div className="flex items-center mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < Math.floor(product.rating)
                            ? 'text-yellow-400 fill-current'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-2">
                    ({product.reviewCount})
                  </span>
                </div>

                {/* Price */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
                      {formatPrice(product.price)}
                    </span>
                    {product.compareAtPrice && product.compareAtPrice > product.price && (
                      <span className="text-sm text-gray-500 line-through">
                        {formatPrice(product.compareAtPrice)}
                      </span>
                    )}
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {product.inventory.isInStock ? 'In Stock' : 'Out of Stock'}
                  </span>
                </div>

                {/* Add to Cart Button */}
                <button
                  onClick={() => handleAddToCart(product)}
                  disabled={!product.inventory.isInStock}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {product.inventory.isInStock ? 'Add to Cart' : 'Out of Stock'}
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* View All Button */}
        <div className="text-center mt-12">
          <Link
            href="/products"
            className="btn-outline text-lg px-8 py-3 hover:bg-primary hover:text-white transition-colors"
          >
            View All Products
          </Link>
        </div>
      </div>
    </section>
  )
}
