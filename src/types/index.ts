export type UserRole = 'customer' | 'vendor' | 'admin';

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  avatar?: string;
  createdAt: string;
  updatedAt: string;
}

export interface Vendor {
  id: number;
  userId: string;
  businessName: string;
  description: string;
  logo?: string;
  banner?: string;
  address: Address;
  contactInfo: ContactInfo;
  rating: number;
  reviewCount: number;
  isVerified: boolean;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Product {
  id: number;
  vendorId: number;
  vendor: Vendor;
  name: string;
  description: string;
  price: number;
  compareAtPrice?: number;
  images: string[];
  category: Category;
  tags: string[];
  variants: ProductVariant[];
  inventory: Inventory;
  rating: number;
  reviewCount: number;
  isActive: boolean;
  isFeatured: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface ProductVariant {
  id: number;
  productId: number;
  name: string;
  sku: string;
  price: number;
  compareAtPrice?: number;
  inventory: number;
  attributes: Record<string, string>;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  description?: string;
  image?: string;
  parentId?: number;
  children?: Category[];
}

export interface Inventory {
  id: number;
  productId: number;
  quantity: number;
  lowStockThreshold: number;
  isInStock: boolean;
  lastUpdated: string;
}

export interface CartItem {
  id: number;
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  compareAtPrice?: number;
  vendorId: number;
  vendorName: string;
  productName: string;
  productImage: string;
}

export interface VendorCart {
  vendorId: number;
  vendorName: string;
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

export interface Order {
  id: number;
  customerId: string;
  customer: User;
  items: OrderItem[];
  status: OrderStatus;
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: PaymentMethod;
  paymentStatus: PaymentStatus;
  createdAt: string;
  updatedAt: string;
}

export interface OrderItem {
  id: number;
  orderId: number;
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  vendorId: number;
  vendorName: string;
  productName: string;
  productImage: string;
}

export type OrderStatus = 
  | 'pending'
  | 'confirmed'
  | 'processing'
  | 'shipped'
  | 'delivered'
  | 'cancelled'
  | 'refunded';

export type PaymentStatus = 
  | 'pending'
  | 'processing'
  | 'completed'
  | 'failed'
  | 'refunded';

export interface PaymentMethod {
  id: string;
  type: 'card' | 'paypal' | 'apple_pay' | 'google_pay';
  last4?: string;
  brand?: string;
  expiryMonth?: number;
  expiryYear?: number;
}

export interface Address {
  id: number;
  street: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
}

export interface ContactInfo {
  phone?: string;
  website?: string;
  email: string;
}

export interface SearchFilters {
  query: string;
  categories: number[];
  priceRange: [number, number];
  minRating: number;
  vendors: number[];
  inStock: boolean;
  sortBy: 'relevance' | 'price_low' | 'price_high' | 'rating' | 'newest';
}

export interface Review {
  id: number;
  productId: number;
  userId: string;
  user: User;
  rating: number;
  title: string;
  comment: string;
  images?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'order_update' | 'inventory_alert' | 'promotion' | 'system';
  title: string;
  message: string;
  isRead: boolean;
  data?: Record<string, any>;
  createdAt: string;
}

export interface Analytics {
  totalSales: number;
  totalOrders: number;
  averageOrderValue: number;
  topProducts: Array<{ product: Product; sales: number }>;
  topCategories: Array<{ category: Category; sales: number }>;
  salesByDate: Array<{ date: string; sales: number }>;
}

export interface SocketEvent {
  type: string;
  data: any;
  timestamp: string;
}
