# GIL Diamond Verification Platform

## Overview

The GIL Diamond Verification Platform is a comprehensive gemological certification and verification system built for Gemological Institute Laboratories. It provides a professional interface for diamond certificate management, verification services, and educational resources for gemological professionals and customers.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety and modern development
- **Styling**: Tailwind CSS with custom design system and CSS variables
- **UI Components**: Radix UI primitives with shadcn/ui component library
- **Animations**: Framer Motion for smooth, performance-optimized animations
- **State Management**: React Query (TanStack Query) for server state and caching
- **Routing**: Wouter for lightweight client-side routing
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Database Provider**: Neon serverless PostgreSQL for scalable cloud hosting
- **File Storage**: Local filesystem storage with multer for file uploads (50MB limit)
- **API Design**: RESTful endpoints with proper error handling and validation
- **Authentication**: Session-based authentication for admin access

### Performance Optimizations
- Lazy loading of components and pages
- Image optimization with intersection observer
- GPU-accelerated animations
- Component-level code splitting
- Optimized bundle sizes with tree shaking
- Advanced caching strategies with React Query

## Key Components

### Public Features
1. **Home Page**: Professional landing page with GIL branding and strategic ad placements
2. **Certificate Verification**: Public verification system using reference numbers with sidebar ads
3. **Gem Encyclopedia**: Educational resource about gemstones and diamonds
4. **Analysis & Grading**: Information about GIL's grading processes
5. **Gem Services**: Professional services offered by GIL
6. **FAQs**: Comprehensive frequently asked questions
7. **Privacy Policy**: GDPR-compliant privacy policy for AdSense compliance
8. **Terms of Service**: Comprehensive terms covering website usage and advertising

### Admin Features (Hidden)
1. **Admin Dashboard**: Secure management interface accessible via direct URL
2. **Certificate Upload**: File upload system for certificate management
3. **Certificate Generation**: Dynamic GIL-format certificate creation
4. **Advanced Search**: Powerful filtering and search capabilities
5. **Bulk Operations**: Efficient management of multiple certificates

### Advanced Features
1. **3D Gem Visualization**: Interactive gem analysis tools
2. **AR Gem Identification**: Camera-based gem identification
3. **Recommendation Engine**: AI-powered gem recommendations
4. **Community Showcase**: User-generated content platform
5. **Educational Modules**: Personalized learning pathways

## Data Flow

### Certificate Verification Flow
1. User enters reference number on verification page
2. Frontend validates input format
3. API request to `/api/certificates/verify/:referenceNumber`
4. Database query using Drizzle ORM
5. Certificate data returned with security validation
6. Frontend displays certificate details or "not found" message

### Admin Upload Flow
1. Admin authenticates via `/admin` endpoint
2. File upload with metadata through multer middleware
3. Database insertion with unique reference number validation
4. File storage in `/uploads` directory
5. Success confirmation and dashboard refresh

### Database Schema
- **certificates**: Comprehensive certificate data with GIL-specific fields
- **admins**: Simple admin authentication table
- Supports both legacy fields and modern GIL certificate format

### AdSense Integration
- **Cookie Consent**: GDPR-compliant cookie management with customizable preferences
- **Ad Components**: Responsive AdSense ad units (header, sidebar, content, footer)
- **Compliance**: Privacy policy, terms of service, ads.txt, and proper meta tags
- **Strategic Placement**: Non-intrusive ad positioning optimized for user experience
- **Revenue Optimization**: Professional gemological content targeting high-value audience

## External Dependencies

### Core Dependencies
- **@neondatabase/serverless**: PostgreSQL database connectivity
- **drizzle-orm**: Type-safe database operations
- **multer**: File upload handling
- **express**: Web server framework
- **react**: Frontend framework
- **@tanstack/react-query**: Server state management

### UI Dependencies
- **@radix-ui/***: Accessible UI primitives
- **framer-motion**: Animation library
- **tailwindcss**: Utility-first CSS framework
- **react-hook-form**: Form handling with validation
- **zod**: Schema validation

### Development Dependencies
- **typescript**: Type safety
- **vite**: Build tool and dev server
- **tsx**: TypeScript execution
- **esbuild**: Fast JavaScript bundler

## Deployment Strategy

### Vercel Deployment
- **Platform**: Vercel with serverless functions
- **Database**: Neon PostgreSQL (recommended)
- **Environment Variables**: 
  - `DATABASE_URL`: PostgreSQL connection string
  - `NODE_ENV`: Production environment flag
  - `SESSION_SECRET`: Secure session management

### Build Process
1. Frontend build with Vite (`npm run build`)
2. Server bundling with esbuild
3. Static file optimization
4. Vercel function deployment

### Production Optimizations
- HTTPS enforcement
- Security headers implementation
- Compression middleware
- Performance monitoring
- Error tracking and logging

## Changelog

- July 06, 2025. Initial setup
- July 06, 2025. Integrated jewelors.com as authorized gemstone seller with comprehensive integration across navigation, homepage, footer, and certificate verification pages
- January 07, 2025. Complete search engine optimization setup including robots.txt, sitemap.xml, enhanced meta tags, and comprehensive submission guide for all major search engines
- January 07, 2025. Successfully submitted website to Google Search Console, Bing Webmaster Tools, and Yandex Webmaster with verified ownership and sitemap submissions
- January 07, 2025. Comprehensive Google AdSense integration with GDPR-compliant cookie consent, privacy policy, terms of service, strategic ad placements, and full compliance setup ready for monetization
- January 09, 2025. Enterprise-level SEO optimization implementation with dynamic meta tags, structured data, image optimization, internal linking, breadcrumb navigation, and performance enhancements
- January 09, 2025. Enhanced content to reference GIA (Gemological Institute of America) standards throughout the website, positioning GIL as following industry-leading GIA methodologies and training

## User Preferences

Preferred communication style: Simple, everyday language.