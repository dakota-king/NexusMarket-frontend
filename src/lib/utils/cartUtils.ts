import { CartItem, VendorCart } from '@/types'

export function organizeCartByVendor(cartItems: CartItem[]): Record<number, VendorCart> {
  return cartItems.reduce((acc, item) => {
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
  }, {} as Record<number, VendorCart>)
}

export function calculateCartTotals(cartItems: CartItem[]): {
  subtotal: number
  shipping: number
  tax: number
  total: number
} {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const shipping = calculateShippingForCart(cartItems)
  const tax = calculateTaxForCart(cartItems, subtotal)
  const total = subtotal + shipping + tax
  
  return { subtotal, shipping, tax, total }
}

export function calculateShippingForCart(cartItems: CartItem[]): number {
  // Group by vendor and calculate shipping for each
  const vendorGroups = organizeCartByVendor(cartItems)
  
  return Object.values(vendorGroups).reduce((total, vendorCart) => {
    // Base shipping per vendor
    const baseShipping = 5.99
    
    // Free shipping over $50
    if (vendorCart.subtotal >= 50) {
      return total
    }
    
    return total + baseShipping
  }, 0)
}

export function calculateTaxForCart(cartItems: CartItem[], subtotal: number): number {
  // Default tax rate of 8%
  const taxRate = 0.08
  return Math.round(subtotal * taxRate * 100) / 100
}

export function getCartItemCount(cartItems: CartItem[]): number {
  return cartItems.reduce((total, item) => total + item.quantity, 0)
}

export function isCartEmpty(cartItems: CartItem[]): boolean {
  return cartItems.length === 0
}

export function getCartItemById(cartItems: CartItem[], id: number): CartItem | undefined {
  return cartItems.find(item => item.id === id)
}

export function updateCartItemQuantity(
  cartItems: CartItem[], 
  id: number, 
  quantity: number
): CartItem[] {
  if (quantity <= 0) {
    return cartItems.filter(item => item.id !== id)
  }
  
  return cartItems.map(item => 
    item.id === id ? { ...item, quantity } : item
  )
}

export function getCartSubtotal(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0)
}

export function getCartDiscount(cartItems: CartItem[]): number {
  return cartItems.reduce((sum, item) => {
    if (item.compareAtPrice && item.compareAtPrice > item.price) {
      return sum + ((item.compareAtPrice - item.price) * item.quantity)
    }
    return sum
  }, 0)
}
