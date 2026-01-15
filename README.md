# Eukariae API

Backend API for the Eukariae store and blog. Built with Node.js, Express, MongoDB, and AdminJS.

## Features

- **Store Management**: CRUD for Products and Categories.
- **Blog Management**: CRUD for Blog Posts.
- **Admin Panel**: Intuitive UI via AdminJS at `/admin`.
- **Authentication**: JWT-based auth for API endpoints.
- **Image Handling**: Multer for file uploads.
- **Environment Driven**: Configurable via `.env`.

## Getting Started

### Prerequisites

- Node.js (v18.19.1+)
- MongoDB (Atlas or Local)

### Installation

1. Clone the repository and navigate to the folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```bash
   cp .env.example .env
   ```
   Modify `.env` with your MONGODB_URI and other settings.

### Running the App

- **Development**:
  ```bash
  npm run dev
  ```
- **Production**:
  ```bash
  npm start
  ```

## Technical Stack

- **Framework**: Express.js
- **Database**: MongoDB / Mongoose
- **Admin UI**: AdminJS
- **Auth**: JSON Web Tokens (JWT) & bcryptjs
- **Uploads**: Multer
