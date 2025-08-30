import { create } from 'zustand'
import { devtools, persist } from 'zustand/middleware'
import { CartItem, SearchFilters } from '@/types'

interface StoreState {
  // Cart
  cart: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (id: number) => void
  updateQuantity: (id: number, quantity: number) => void
  clearCart: () => void
  
  // Search
  searchQuery: string
  searchFilters: SearchFilters
  setSearchQuery: (query: string) => void
  setSearchFilters: (filters: Partial<SearchFilters>) => void
  clearSearchFilters: () => void
  
  // Real-time updates
  socket: any | null
  setSocket: (socket: any) => void
  
  // UI State
  sidebarOpen: boolean
  setSidebarOpen: (open: boolean) => void
  
  // Notifications
  notifications: any[]
  addNotification: (notification: any) => void
  removeNotification: (id: string) => void
  markAsRead: (id: string) => void
  
  // User preferences
  theme: 'light' | 'dark' | 'system'
  setTheme: (theme: 'light' | 'dark' | 'system') => void
  
  // Wishlist
  wishlist: number[]
  addToWishlist: (productId: number) => void
  removeFromWishlist: (productId: number) => void
  isInWishlist: (productId: number) => boolean
}

const defaultSearchFilters: SearchFilters = {
  query: '',
  categories: [],
  priceRange: [0, 1000],
  minRating: 0,
  vendors: [],
  inStock: false,
  sortBy: 'relevance'
}

export const useStore = create<StoreState>()(
  devtools(
    persist(
      (set, get) => ({
        // Cart implementation
        cart: [],
        addToCart: (item) => set((state) => {
          const existingItem = state.cart.find(i => 
            i.productId === item.productId && i.variantId === item.variantId
          )
          
          if (existingItem) {
            return {
              cart: state.cart.map(i => 
                i.id === existingItem.id 
                  ? { ...i, quantity: i.quantity + item.quantity }
                  : i
              )
            }
          }
          
          return { cart: [...state.cart, { ...item, id: Math.floor(Math.random() * 1000000) }] }
        }),
        
        removeFromCart: (id) => set((state) => ({
          cart: state.cart.filter(item => item.id !== id)
        })),
        
        updateQuantity: (id, quantity) => set((state) => ({
          cart: state.cart.map(item => 
            item.id === id ? { ...item, quantity } : item
          )
        })),
        
        clearCart: () => set({ cart: [] }),
        
        // Search implementation
        searchQuery: '',
        searchFilters: defaultSearchFilters,
        setSearchQuery: (query) => set({ searchQuery: query }),
        setSearchFilters: (filters) => set((state) => ({
          searchFilters: { ...state.searchFilters, ...filters }
        })),
        clearSearchFilters: () => set({ searchFilters: defaultSearchFilters }),
        
        // Socket implementation
        socket: null,
        setSocket: (socket) => set({ socket }),
        
        // UI State
        sidebarOpen: false,
        setSidebarOpen: (open) => set({ sidebarOpen: open }),
        
        // Notifications
        notifications: [],
        addNotification: (notification) => set((state) => ({
          notifications: [...state.notifications, { ...notification, id: Math.floor(Math.random() * 1000000).toString() }]
        })),
        removeNotification: (id) => set((state) => ({
          notifications: state.notifications.filter(n => n.id !== id)
        })),
        markAsRead: (id) => set((state) => ({
          notifications: state.notifications.map(n => 
            n.id === id ? { ...n, isRead: true } : n
          )
        })),
        
        // Theme
        theme: 'system',
        setTheme: (theme) => set({ theme }),
        
        // Wishlist
        wishlist: [],
        addToWishlist: (productId) => set((state) => ({
          wishlist: state.wishlist.includes(productId) 
            ? state.wishlist 
            : [...state.wishlist, productId]
        })),
        removeFromWishlist: (productId) => set((state) => ({
          wishlist: state.wishlist.filter(id => id !== productId)
        })),
        isInWishlist: (productId) => get().wishlist.includes(productId),
      }),
      { 
        name: 'nexusmarket-store',
        partialize: (state) => ({
          cart: state.cart,
          searchFilters: state.searchFilters,
          theme: state.theme,
          wishlist: state.wishlist,
        })
      }
    )
  )
)
