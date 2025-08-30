'use client'

import { useState } from 'react'
import { X, Trash2, Plus, Minus, ShoppingBag } from 'lucide-react'
import { useStore } from '@/lib/stores/useStore'
import { formatPrice } from '@/lib/utils'
import { CartItem } from '@/types'
import Link from 'next/link'

export function CartSidebar() {
  const { sidebarOpen, setSidebarOpen, cart, removeFromCart, updateQuantity, clearCart } = useStore()
  const [isCheckingOut, setIsCheckingOut] = useState(false)

  // Calculate cart data locally to avoid serialization issues
  const cartByVendor = cart.reduce((acc, item) => {
    if (!acc[item.vendorId]) {
      acc[item.vendorId] = {
        vendorId: item.vendorId,
        vendorName: item.vendorName,
        items: [],
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      }
    }
    
    acc[item.vendorId].items.push(item)
    acc[item.vendorId].subtotal += item.price * item.quantity
    
    return acc
  }, {} as Record<number, any>)
  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0)
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)

  const handleQuantityChange = (item: CartItem, newQuantity: number) => {
    if (newQuantity <= 0) {
      removeFromCart(item.id)
    } else {
      updateQuantity(item.id, newQuantity)
    }
  }

  const handleCheckout = () => {
    setIsCheckingOut(true)
    // Redirect to checkout page
    window.location.href = '/checkout'
  }

  if (!sidebarOpen) return null

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-40"
        onClick={() => setSidebarOpen(false)}
      />
      
      {/* Sidebar */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white dark:bg-gray-900 shadow-xl z-50 transform transition-transform duration-300 ease-in-out">
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center space-x-2">
              <ShoppingBag className="h-6 w-6 text-primary" />
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Shopping Cart ({totalItems})
              </h2>
            </div>
            <button
              onClick={() => setSidebarOpen(false)}
              className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
            >
              <X className="h-6 w-6" />
            </button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-4 space-y-6">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-12 w-12 text-gray-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
                  Your cart is empty
                </h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">
                  Start shopping to add items to your cart
                </p>
                <button
                  onClick={() => setSidebarOpen(false)}
                  className="btn-primary"
                >
                  Continue Shopping
                </button>
              </div>
            ) : (
              Object.values(cartByVendor).map((vendorCart) => (
                <div key={vendorCart.vendorId} className="space-y-3">
                  {/* Vendor Header */}
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium text-gray-900 dark:text-gray-100">
                      {vendorCart.vendorName}
                    </h3>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {vendorCart.items.length} item{vendorCart.items.length !== 1 ? 's' : ''}
                    </span>
                  </div>

                  {/* Vendor Items */}
                  <div className="space-y-3">
                    {vendorCart.items.map((item: CartItem) => (
                      <div key={item.id} className="flex items-center space-x-3 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        {/* Product Image */}
                        <img
                          src={item.productImage}
                          alt={item.productName}
                          className="w-16 h-16 object-cover rounded-md"
                        />
                        
                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">
                            {item.productName}
                          </h4>
                          <p className="text-sm text-gray-500 dark:text-gray-400">
                            {formatPrice(item.price)}
                          </p>
                        </div>

                        {/* Quantity Controls */}
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity - 1)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Minus className="h-4 w-4" />
                          </button>
                          <span className="text-sm text-gray-900 dark:text-gray-100 min-w-[2rem] text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => handleQuantityChange(item, item.quantity + 1)}
                            className="p-1 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                          >
                            <Plus className="h-4 w-4" />
                          </button>
                        </div>

                        {/* Remove Button */}
                        <button
                          onClick={() => removeFromCart(item.id)}
                          className="p-1 text-gray-400 hover:text-red-500 transition-colors"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Vendor Subtotal */}
                  <div className="text-right text-sm">
                    <span className="text-gray-500 dark:text-gray-400">Subtotal: </span>
                    <span className="font-medium text-gray-900 dark:text-gray-100">
                      {formatPrice(vendorCart.subtotal)}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Footer */}
          {cart.length > 0 && (
            <div className="border-t border-gray-200 dark:border-gray-700 p-4 space-y-4">
              {/* Total */}
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-900 dark:text-gray-100">
                  Total
                </span>
                <span className="text-lg font-bold text-primary">
                  {formatPrice(subtotal)}
                </span>
              </div>

              {/* Actions */}
              <div className="space-y-2">
                <button
                  onClick={handleCheckout}
                  disabled={isCheckingOut}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isCheckingOut ? 'Processing...' : 'Proceed to Checkout'}
                </button>
                
                <div className="flex space-x-2">
                  <button
                    onClick={clearCart}
                    className="flex-1 btn-outline text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20"
                  >
                    Clear Cart
                  </button>
                  <button
                    onClick={() => setSidebarOpen(false)}
                    className="flex-1 btn-outline"
                  >
                    Continue Shopping
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
