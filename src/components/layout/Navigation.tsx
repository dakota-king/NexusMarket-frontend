'use client'

import { useState } from 'react'
import Link from 'next/link'
// Temporarily disabled Clerk authentication to get app running
// import { useUser, SignInButton, SignOutButton, UserButton } from '@clerk/nextjs'
import { Search, ShoppingCart, Menu, X, Heart } from 'lucide-react'
import { useStore } from '@/lib/stores/useStore'
import { cn } from '@/lib/utils'

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  // Temporarily disabled Clerk authentication to get app running
  // const { user } = useUser()
  const user = null // Temporary mock user
  const { cart, searchQuery, setSearchQuery, setSidebarOpen, wishlist } = useStore()
  
  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0)
  const wishlistCount = wishlist.length

  return (
    <nav className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link href="/" className="flex items-center">
              <span className="text-2xl font-bold text-primary">NexusMarket</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-4">
              <Link 
                href="/products" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Products
              </Link>
              <Link 
                href="/vendors" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Vendors
              </Link>
              <Link 
                href="/categories" 
                className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Categories
              </Link>
            </div>
          </div>

          {/* Search Bar */}
          <div className="hidden md:block flex-1 max-w-lg mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 focus:ring-2 focus:ring-primary focus:border-transparent"
              />
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Wishlist */}
            <Link href="/wishlist" className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors">
              <Heart className="h-6 w-6" />
              {wishlistCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {wishlistCount}
                </span>
              )}
            </Link>

            {/* Cart */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="relative p-2 text-gray-700 dark:text-gray-300 hover:text-primary transition-colors"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-primary text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* User Actions */}
            {user ? (
              <div className="flex items-center space-x-4">
                <Link 
                  href="/dashboard" 
                  className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  Dashboard
                </Link>
                <button className="text-gray-700 dark:text-gray-300 hover:text-primary px-3 py-2 rounded-md text-sm font-medium transition-colors">
                  User Profile
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <button className="btn-outline">Sign In</button>
                <Link href="/sign-up" className="btn-primary">
                  Sign Up
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-primary p-2"
            >
              {isMobileMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
            {/* Mobile Search */}
            <div className="px-3 py-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <input
                  type="text"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100"
                />
              </div>
            </div>

            {/* Mobile Menu Items */}
            <Link 
              href="/products" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Products
            </Link>
            <Link 
              href="/vendors" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Vendors
            </Link>
            <Link 
              href="/categories" 
              className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Categories
            </Link>

            {/* Mobile User Actions */}
            <div className="pt-4 pb-3 border-t border-gray-200 dark:border-gray-700">
              {user ? (
                <div className="space-y-2">
                  <Link 
                    href="/dashboard" 
                    className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    Dashboard
                  </Link>
                  <button className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium">
                    Sign Out
                  </button>
                </div>
                          ) : (
              <div className="space-y-2">
                <SignInButton mode="modal">
                  <button className="block w-full text-left px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium">
                    Sign In
                  </button>
                </SignInButton>
                <Link 
                  href="/sign-up" 
                  className="block px-3 py-2 text-gray-700 dark:text-gray-300 hover:text-primary rounded-md text-base font-medium"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Sign Up
                </Link>
              </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  )
}
