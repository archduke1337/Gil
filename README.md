# GIL Diamond Verification Platform

A comprehensive gemological platform for diamond certificate verification and management.

## Features

- **Certificate Verification**: Verify authentic diamond certificates using reference numbers
- **Admin Dashboard**: Upload and manage certificates with advanced search capabilities
- **Professional Interface**: Clean, responsive design optimized for gemological professionals
- **Secure Database**: PostgreSQL backend with proper authentication and validation
- **File Management**: Secure certificate file uploads with 50MB support

## Technology Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS, Framer Motion
- **Backend**: Express.js, Node.js
- **Database**: PostgreSQL with Drizzle ORM
- **Deployment**: Vercel-ready configuration

## Environment Variables

Required environment variables (see `.env.example`):

```
DATABASE_URL=postgresql://username:password@host:port/database
NODE_ENV=production
SESSION_SECRET=your-session-secret
```

## Deployment on Vercel

1. **Prepare Database**: Set up a PostgreSQL database (recommended: Neon)
2. **Configure Environment**: Add `DATABASE_URL` to Vercel environment variables
3. **Deploy**: Connect your repository to Vercel

### Vercel Environment Variables

Set these in your Vercel dashboard:

- `DATABASE_URL`: Your PostgreSQL connection string
- `NODE_ENV`: `production`
- `SESSION_SECRET`: Random secure string for sessions

## Local Development

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run development server: `npm run dev`
4. Push database schema: `npm run db:push`

## Admin Access

Default admin credentials:
- Username: `admin`
- Password: `admin123`

Change these in production by accessing the admin panel.

## API Endpoints

- `GET /api/certificates/verify/:reportNumber` - Verify certificate
- `POST /api/certificates/upload` - Upload new certificate
- `GET /api/certificates` - List all certificates
- `POST /api/admin/login` - Admin authentication

## File Upload Support

- Formats: PDF, PNG, JPG, JPEG
- Maximum size: 50MB
- Secure file handling with validation

## Production Ready

This application is configured for production deployment with:
- TypeScript compilation
- Database connection pooling
- Error handling and logging
- Security headers and validation
- File upload management
- Session management