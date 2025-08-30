import { authMiddleware } from '@clerk/nextjs/server'

export default authMiddleware({
  // Public routes that don't require authentication
  publicRoutes: [
    '/',
    '/products',
    '/vendors',
    '/categories',
    '/api/placeholder/(.*)',
  ],
  // Routes that can be accessed while signed out, but also show user info when signed in
  ignoredRoutes: [
    '/api/webhooks/(.*)',
    '/sign-in(.*)',
    '/sign-up(.*)',
  ],
})

export const config = {
  matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
}
