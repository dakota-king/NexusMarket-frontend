'use client'

import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

// Mock categories data
const mockCategories = [
  {
    id: 1,
    name: 'Electronics',
    slug: 'electronics',
    description: 'Latest gadgets and technology',
    image: '/api/placeholder/400/300',
    productCount: 1250,
    color: 'from-blue-500 to-purple-600'
  },
  {
    id: 2,
    name: 'Fashion',
    slug: 'fashion',
    description: 'Trendy clothing and accessories',
    image: '/api/placeholder/400/300',
    productCount: 890,
    color: 'from-pink-500 to-red-500'
  },
  {
    id: 3,
    name: 'Home & Garden',
    slug: 'home-garden',
    description: 'Everything for your home',
    image: '/api/placeholder/400/300',
    productCount: 567,
    color: 'from-green-500 to-emerald-600'
  },
  {
    id: 4,
    name: 'Sports & Outdoors',
    slug: 'sports-outdoors',
    description: 'Equipment for active lifestyles',
    image: '/api/placeholder/400/300',
    productCount: 423,
    color: 'from-orange-500 to-yellow-500'
  },
  {
    id: 5,
    name: 'Books & Media',
    slug: 'books-media',
    description: 'Knowledge and entertainment',
    image: '/api/placeholder/400/300',
    productCount: 756,
    color: 'from-indigo-500 to-blue-600'
  },
  {
    id: 6,
    name: 'Health & Beauty',
    slug: 'health-beauty',
    description: 'Wellness and personal care',
    image: '/api/placeholder/400/300',
    productCount: 634,
    color: 'from-purple-500 to-pink-600'
  }
]

export function CategoryGrid() {
  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-4">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our wide range of product categories to find exactly what you're looking for
          </p>
        </div>

        {/* Categories Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockCategories.map((category) => (
            <Link
              key={category.id}
              href={`/categories/${category.slug}`}
              className="group block"
            >
              <div className="relative overflow-hidden rounded-lg shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                {/* Category Image */}
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  
                  {/* Gradient Overlay */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.color} opacity-80`} />
                </div>

                {/* Category Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-6 text-white">
                  <div className="mb-4">
                    <h3 className="text-2xl font-bold mb-2 group-hover:text-yellow-300 transition-colors">
                      {category.name}
                    </h3>
                    <p className="text-blue-100 mb-3">
                      {category.description}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-blue-100">
                        {category.productCount.toLocaleString()} products
                      </span>
                      <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
              </div>
            </Link>
          ))}
        </div>

        {/* View All Categories Button */}
        <div className="text-center mt-12">
          <Link
            href="/categories"
            className="btn-outline text-lg px-8 py-3 hover:bg-primary hover:text-white transition-colors"
          >
            View All Categories
          </Link>
        </div>
      </div>
    </section>
  )
}
