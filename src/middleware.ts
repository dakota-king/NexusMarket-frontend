// Temporarily disabled Clerk middleware to get app running
// import { authMiddleware } from '@clerk/nextjs'

// export default authMiddleware({
//   // Public routes that don't require authentication
//   publicRoutes: [
//     '/',
//     '/products',
//     '/vendors',
//     '/categories',
//     '/api/placeholder/(.*)',
//     '/sign-in',
//     '/sign-up',
//   ],
//   // Routes that can be accessed while signed out, but also show user info when signed in
//   ignoredRoutes: [
//     '/api/webhooks/(.*)',
//   ],
// })

export default function middleware() {
  // Simple middleware that does nothing for now
  return
}

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
