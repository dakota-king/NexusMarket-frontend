import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
// Temporarily disabled Clerk authentication to get app running
// import { ClerkProvider } from '@clerk/nextjs'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Toaster } from 'react-hot-toast'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'NexusMarket - Multi-Vendor E-Commerce Platform',
  description: 'A modern, high-performance multi-vendor e-commerce platform built with Next.js 14+',
  keywords: ['e-commerce', 'multi-vendor', 'marketplace', 'next.js', 'typescript'],
  authors: [{ name: 'Dakota King' }],
  creator: 'Dakota King',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://nexusmarket.com',
    title: 'NexusMarket - Multi-Vendor E-Commerce Platform',
    description: 'A modern, high-performance multi-vendor e-commerce platform',
    siteName: 'NexusMarket',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'NexusMarket - Multi-Vendor E-Commerce Platform',
    description: 'A modern, high-performance multi-vendor e-commerce platform',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <QueryProvider>
          {children}
          <Toaster
            position="top-right"
            toastOptions={{
              duration: 4000,
              style: {
                background: 'hsl(var(--background))',
                color: 'hsl(var(--foreground))',
                border: '1px solid hsl(var(--border))',
              },
            }}
          />
        </QueryProvider>
      </body>
    </html>
  )
}
