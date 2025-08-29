import * as z from "zod"

export const signUpSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string(),
  role: z.enum(["customer", "vendor"]),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
})

export const signInSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
})

export const productSchema = z.object({
  name: z.string().min(3, "Product name must be at least 3 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  price: z.number().min(0, "Price must be positive"),
  compareAtPrice: z.number().min(0).optional(),
  categoryId: z.number().min(1, "Category is required"),
  tags: z.array(z.string()).optional(),
  images: z.array(z.string()).min(1, "At least one image is required"),
  variants: z.array(z.object({
    name: z.string(),
    sku: z.string(),
    price: z.number().min(0),
    inventory: z.number().min(0),
    attributes: z.record(z.string()),
  })).optional(),
  isActive: z.boolean().default(true),
  isFeatured: z.boolean().default(false),
})

export const vendorProfileSchema = z.object({
  businessName: z.string().min(3, "Business name must be at least 3 characters"),
  description: z.string().min(20, "Description must be at least 20 characters"),
  phone: z.string().optional(),
  website: z.string().url().optional(),
  address: z.object({
    street: z.string().min(5, "Street address is required"),
    city: z.string().min(2, "City is required"),
    state: z.string().min(2, "State is required"),
    postalCode: z.string().min(5, "Postal code is required"),
    country: z.string().min(2, "Country is required"),
  }),
})

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  title: z.string().min(5, "Title must be at least 5 characters"),
  comment: z.string().min(10, "Comment must be at least 10 characters"),
  images: z.array(z.string()).optional(),
})

export const addressSchema = z.object({
  street: z.string().min(5, "Street address is required"),
  city: z.string().min(2, "City is required"),
  state: z.string().min(2, "State is required"),
  postalCode: z.string().min(5, "Postal code is required"),
  country: z.string().min(2, "Country is required"),
})

export const checkoutSchema = z.object({
  shippingAddress: addressSchema,
  billingAddress: addressSchema,
  paymentMethod: z.object({
    type: z.enum(["card", "paypal", "apple_pay", "google_pay"]),
    token: z.string(),
  }),
  items: z.array(z.object({
    productId: z.number(),
    variantId: z.number().optional(),
    quantity: z.number().min(1),
  })).min(1, "Cart cannot be empty"),
})

export const searchFiltersSchema = z.object({
  query: z.string().optional(),
  categories: z.array(z.number()).optional(),
  priceRange: z.tuple([z.number(), z.number()]).optional(),
  minRating: z.number().min(0).max(5).optional(),
  vendors: z.array(z.number()).optional(),
  inStock: z.boolean().optional(),
  sortBy: z.enum(["relevance", "price_low", "price_high", "rating", "newest"]).optional(),
})

export const userProfileSchema = z.object({
  firstName: z.string().min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(2, "Last name must be at least 2 characters"),
  phone: z.string().optional(),
  avatar: z.string().optional(),
})

export type SignUpInput = z.infer<typeof signUpSchema>
export type SignInInput = z.infer<typeof signInSchema>
export type ProductInput = z.infer<typeof productSchema>
export type VendorProfileInput = z.infer<typeof vendorProfileSchema>
export type ReviewInput = z.infer<typeof reviewSchema>
export type AddressInput = z.infer<typeof addressSchema>
export type CheckoutInput = z.infer<typeof checkoutSchema>
export type SearchFiltersInput = z.infer<typeof searchFiltersSchema>
export type UserProfileInput = z.infer<typeof userProfileSchema>
