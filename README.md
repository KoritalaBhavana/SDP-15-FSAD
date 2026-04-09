# Travel Nest Pro Frontend

Travel Nest Pro Frontend is a React + Vite + TypeScript application for a homestay booking platform. It includes dedicated experiences for tourists, hosts, local guides, chefs, and admins, and it connects to the separate Spring Boot backend repository.

## Tech Stack

- React 18
- TypeScript
- Vite
- React Router DOM
- Axios
- Tailwind CSS
- Radix UI
- React Hook Form
- Zod

## Core Features

- Role-based authentication screens
- Tourist, host, guide, chef, and admin dashboards
- Homestay listing and detail pages
- Attractions, dining, and local guides pages
- Booking and payment flow
- Wishlist and itinerary interactions
- Protected routes and session persistence
- Backend API integration with Axios

## Backend Repository

Use this frontend with the Spring Boot backend here:

- `https://github.com/KoritalaBhavana/SDP-15-FSAD-BACKEND.git`

Default frontend API target:

- `http://localhost:6060/api`

## Environment Variables

Create a local `.env` file in the project root.

Example:

```env
VITE_API_BASE_URL=http://localhost:6060/api
VITE_GOOGLE_CLIENT_ID=
VITE_FIREBASE_API_KEY=
VITE_FIREBASE_AUTH_DOMAIN=
VITE_FIREBASE_PROJECT_ID=
VITE_FIREBASE_STORAGE_BUCKET=
VITE_FIREBASE_MESSAGING_SENDER_ID=
VITE_FIREBASE_APP_ID=
```

Notes:

- `VITE_API_BASE_URL` should point to the Spring Boot backend.
- `VITE_GOOGLE_CLIENT_ID` is only needed if you want real Google OAuth.
- Normal email/password auth works without Google OAuth setup.

## Local Setup

1. Install dependencies:

```bash
npm install
```

2. Create `.env` from `.env.example` and update values.

3. Start the development server:

```bash
npm run dev
```

4. Open:

```text
http://localhost:8080
```

## Available Scripts

- `npm run dev` starts the local dev server
- `npm run build` creates a production build
- `npm run build:dev` creates a development-mode build
- `npm run preview` previews the production build
- `npm run lint` runs ESLint
- `npm run test` runs tests once
- `npm run test:watch` runs tests in watch mode

## Demo Accounts

These accounts are seeded by the backend:

- `admin@travelnest.com` / `admin123`
- `tourist@travelnest.com` / `tourist123`
- `host@travelnest.com` / `host123`
- `guide@travelnest.com` / `guide123`
- `chef@travelnest.com` / `chef123`

## Project Structure

- `src/pages` application screens and dashboards
- `src/components` reusable UI components
- `src/contexts` auth and session state
- `src/lib` API clients, helpers, route config, validation, and storage helpers
- `src/hooks` reusable frontend hooks

## Build Status

The project has been verified with:

```bash
npm run build
```
