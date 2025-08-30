# NexusMarket - Multi-Vendor E-Commerce Platform

A modern, high-performance Next.js 14+ frontend application for a multi-vendor e-commerce platform. Built with TypeScript, Tailwind CSS, and modern React patterns, featuring real-time updates, advanced search, and role-based access control.

## 🚀 Features

- **Multi-Vendor Support**: Shop from multiple vendors in a single platform
- **Real-time Updates**: Live inventory and order status updates via Socket.io
- **Advanced Search & Filtering**: Powerful product discovery with multiple filter options
- **Role-based Access**: Separate dashboards for customers, vendors, and admins
- **Responsive Design**: Mobile-first design with Tailwind CSS
- **Performance Optimized**: Next.js 14+ with App Router and optimizations
- **Authentication**: Secure user management with Clerk
- **State Management**: Global state with Zustand and React Query
- **PWA Ready**: Progressive Web App capabilities

## 🛠️ Tech Stack

- **Framework**: Next.js 14+ with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Authentication**: Clerk
- **State Management**: Zustand + React Query
- **Real-time**: Socket.io
- **Database**: Supabase (PostgreSQL)
- **Payments**: Stripe
- **File Uploads**: UploadThing
- **UI Components**: Headless UI + Lucide React
- **Forms**: React Hook Form + Zod validation
- **Testing**: Jest + Playwright + MSW

## 📁 Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (auth)/            # Authentication routes
│   ├── (dashboard)/       # Dashboard routes
│   ├── products/          # Product pages
│   ├── cart/              # Shopping cart
│   ├── checkout/          # Checkout process
│   ├── api/               # API routes
│   └── globals.css        # Global styles
├── components/            # Reusable components
│   ├── ui/               # Base UI components
│   ├── auth/             # Authentication components
│   ├── products/         # Product-related components
│   ├── cart/             # Cart components
│   ├── dashboard/        # Dashboard components
│   └── layout/           # Layout components
├── lib/                  # Utility libraries
│   ├── stores/           # Zustand stores
│   ├── utils/            # Helper functions
│   └── validations/      # Zod schemas
├── hooks/                # Custom React hooks
├── types/                # TypeScript type definitions
└── middleware.ts         # Next.js middleware
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- npm, yarn, or pnpm
- Supabase account
- Clerk account
- Stripe account (optional)
- UploadThing account (optional)

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd nexusmarket-frontend
   git checkout dev
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp env.example .env.local
   ```
   
   Fill in your environment variables:
   ```env
   # Clerk Authentication
   NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=your_clerk_key
   CLERK_SECRET_KEY=your_clerk_secret
   
   # Supabase
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key
   
   # API Configuration
   NEXT_PUBLIC_API_URL=http://localhost:3001/api
   NEXT_PUBLIC_SOCKET_URL=http://localhost:3001
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript compiler
- `npm run test` - Run Jest tests
- `npm run test:e2e` - Run Playwright E2E tests

### Code Style

- **TypeScript**: Strict mode enabled
- **ESLint**: Next.js recommended rules
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality

### Component Guidelines

- Use TypeScript interfaces for props
- Implement proper error boundaries
- Follow accessibility best practices
- Use Tailwind CSS utility classes
- Implement responsive design patterns

## 🏗️ Architecture

### State Management

- **Zustand**: Global application state (cart, user preferences, UI state)
- **React Query**: Server state management with caching
- **Local Storage**: Persistent state for cart and preferences

### Authentication Flow

1. User signs up/signs in via Clerk
2. Role-based access control via middleware
3. Protected routes require authentication
4. User metadata includes role information

### Real-time Features

- **Socket.io**: Real-time communication
- **Inventory Updates**: Live stock level changes
- **Order Status**: Real-time order tracking
- **Notifications**: Instant user notifications

### Performance Optimizations

- **Image Optimization**: Next.js Image component with WebP/AVIF
- **Code Splitting**: Route-based code splitting
- **Caching**: React Query with stale-while-revalidate
- **Bundle Analysis**: Webpack bundle analyzer
- **Lazy Loading**: Component and route lazy loading

## 🧪 Testing

### Unit Tests

- **Jest**: Test runner
- **React Testing Library**: Component testing
- **MSW**: API mocking

### E2E Tests

- **Playwright**: End-to-end testing
- **Visual Regression**: Screenshot comparisons
- **Cross-browser**: Multiple browser support

### Test Coverage

- Components: 90%+
- Utilities: 95%+
- Hooks: 90%+
- Integration: 85%+

## 📱 PWA Features

- **Service Worker**: Offline support
- **Web App Manifest**: Installable app
- **Push Notifications**: Order updates
- **Background Sync**: Cart persistence

## 🚀 Deployment

### Vercel (Recommended)

1. Connect your GitHub repository
2. Set environment variables
3. Deploy automatically on push

### Other Platforms

- **Netlify**: Static site hosting
- **AWS Amplify**: Full-stack hosting
- **Docker**: Containerized deployment

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Workflow

1. **Feature Development**: Work on feature branches
2. **Code Review**: All changes require review
3. **Testing**: Ensure tests pass before merging
4. **Documentation**: Update docs for new features

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

- **Documentation**: [Project Wiki](link-to-wiki)
- **Issues**: [GitHub Issues](link-to-issues)
- **Discussions**: [GitHub Discussions](link-to-discussions)
- **Email**: support@nexusmarket.com

## 🙏 Acknowledgments

- Next.js team for the amazing framework
- Vercel for hosting and deployment
- Tailwind CSS for the utility-first CSS framework
- Clerk for authentication services
- Supabase for the backend infrastructure

---

**Built with ❤️ by the NexusMarket Team**
