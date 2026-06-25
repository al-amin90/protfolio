# Portfolio Website with Admin Dashboard

A modern personal portfolio website built with Next.js, TypeScript, and MongoDB. It includes a polished public portfolio section and an admin dashboard for managing projects, uploading images, and reordering content.

## Technologies Used

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- MongoDB + Mongoose
- Cloudinary for image uploads
- Framer Motion for animations
- JWT for admin authentication
- React Hot Toast for notifications
- React Icons
- DnD Kit for drag-and-drop project ordering

## Features

- Responsive portfolio homepage with sections for:
  - Hero/banner
  - Technical skills
  - Projects
  - Education
  - Contact
- Admin login flow
- Dashboard to add, edit, delete, and reorder projects
- Image upload support via Cloudinary
- Dynamic API routes for project management
- Smooth UI animations and modern styling

## Project Structure

- app/ - Next.js app router pages and API routes
- components/ - UI components for the portfolio and dashboard
- lib/ - database connection, utilities, middleware, and error handling
- modules/ - authentication and project domain logic

## Getting Started

### Prerequisites

- Node.js 18+
- npm, pnpm, or yarn
- MongoDB database
- Cloudinary account

### Installation

```bash
npm install
```

### Environment Variables

Create a `.env.local` file in the project root and add:

```env
DATABASE_URL=your_mongodb_connection_string
JWT_ACCESS_TOKEN=your_secret_key
ADMIN_EMAIL=admin@example.com
ADMIN_PASSWORD=your_admin_password
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret
```

### Run the Development Server

```bash
npm run dev
```

Open http://localhost:3000 to view the app.

## Available Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
```

## Notes

The admin dashboard is intended for managing your portfolio projects and can be accessed through the login flow configured in the authentication API.
