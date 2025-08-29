import { Navigation } from '@/components/layout/Navigation'
import { CartSidebar } from '@/components/cart/CartSidebar'
import { HeroSection } from '@/components/home/HeroSection'
import { FeaturedProducts } from '@/components/home/FeaturedProducts'
import { CategoryGrid } from '@/components/home/CategoryGrid'
import { VendorShowcase } from '@/components/home/VendorShowcase'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navigation />
      <CartSidebar />
      
      <main>
        <HeroSection />
        <FeaturedProducts />
        <CategoryGrid />
        <VendorShowcase />
      </main>
      
      <footer className="bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">
                NexusMarket
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Your trusted multi-vendor e-commerce platform for quality products and exceptional service.
              </p>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                Shop
              </h4>
              <ul className="space-y-2">
                <li><a href="/products" className="text-gray-600 dark:text-gray-400 hover:text-primary">All Products</a></li>
                <li><a href="/categories" className="text-gray-600 dark:text-gray-400 hover:text-primary">Categories</a></li>
                <li><a href="/vendors" className="text-gray-600 dark:text-gray-400 hover:text-primary">Vendors</a></li>
                <li><a href="/deals" className="text-gray-600 dark:text-gray-400 hover:text-primary">Deals</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                Support
              </h4>
              <ul className="space-y-2">
                <li><a href="/help" className="text-gray-600 dark:text-gray-400 hover:text-primary">Help Center</a></li>
                <li><a href="/contact" className="text-gray-600 dark:text-gray-400 hover:text-primary">Contact Us</a></li>
                <li><a href="/shipping" className="text-gray-600 dark:text-gray-400 hover:text-primary">Shipping Info</a></li>
                <li><a href="/returns" className="text-gray-600 dark:text-gray-400 hover:text-primary">Returns</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-sm font-semibold text-gray-900 dark:text-gray-100 uppercase tracking-wider mb-4">
                Company
              </h4>
              <ul className="space-y-2">
                <li><a href="/about" className="text-gray-600 dark:text-gray-400 hover:text-primary">About Us</a></li>
                <li><a href="/careers" className="text-gray-600 dark:text-gray-400 hover:text-primary">Careers</a></li>
                <li><a href="/press" className="text-gray-600 dark:text-gray-400 hover:text-primary">Press</a></li>
                <li><a href="/blog" className="text-gray-600 dark:text-gray-400 hover:text-primary">Blog</a></li>
              </ul>
            </div>
          </div>
          
          <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                © 2025 NexusMarket. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <a href="/privacy" className="text-gray-400 hover:text-gray-600 text-sm">Privacy Policy</a>
                <a href="/terms" className="text-gray-400 hover:text-gray-600 text-sm">Terms of Service</a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}
