# ActivityHub Frontend

> SDP-15 | Full Stack Application Development (FSAD)
> A travel and homestay platform connecting tourists with homestay hosts, local guides, chefs, and nearby attractions.

[![Live Demo](https://img.shields.io/badge/Live%20Demo-Render-46E3B7?style=flat-square)](https://fsad-frontend-jmme.onrender.com/)
[![React](https://img.shields.io/badge/React-18.x-61DAFB?style=flat-square&logo=react)](https://reactjs.org/)
[![Vite](https://img.shields.io/badge/Vite-5.x-646CFF?style=flat-square&logo=vite)](https://vitejs.dev/)

---

## Table of Contents

- [Project Overview](#project-overview)
- [Features by Role](#features-by-role)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Pages and Routes](#pages-and-routes)
- [API Integration](#api-integration)
- [Environment Variables](#environment-variables)
- [Deployment](#deployment)
- [Known Issues and Fixes](#known-issues-and-fixes)
- [Team](#team)

---

## Project Overview

ActivityHub is a full-stack travel platform that connects travellers with homestay options and provides information about nearby tourist attractions. The app improves the travel experience by offering personalised recommendations and local insights.

There are 5 user roles, each with its own dashboard, navigation, and functionality:

| Role | Description |
|------|-------------|
| Tourist | Search homestays, book stays, explore attractions, manage trips |
| Homestay Host | List properties, manage bookings, interact with guests |
| Local Guide | Provide insights, manage itineraries, recommend places |
| Chef | Manage dining requests and meal bookings |
| Admin | Manage users, approve listings, conduct interviews, view analytics |

---

## Features by Role

### Landing Page (Public)
- Search bar with location, dates, and guest count
- Featured homestays carousel
- Trending travel destinations
- Nearby tourist attractions section
- Local guide recommendations
- Category filters such as Family Stay, Budget Stay, Luxury, and Nature Stay
- Offers and discount section
- User reviews and ratings display
- Navigation: Home, Homestays, Attractions, Dining, Local Guides, Login
- Footer with contact and policy links

### Authentication
- Login via email and password
- Role-based sign-up for Tourist, Homestay Host, Local Guide, and Chef
- Optional Google social login placeholder
- Secure login with JWT token storage
- Auto-redirect to role-specific dashboard after login
- Sign out from the profile dropdown

### Tourist Dashboard
- Search and filter homestays
- Recommended and recently viewed stays
- Wishlist and favourite homestays
- Nearby attractions list
- My Bookings with working View Details and Cancel buttons
- Statistics for trips, wishlist, reviews, and places visited
- Notification centre with unread count
- Profile settings with editable personal details

### Homestay Listing Page
- Grid and list view of homestays
- Name, location, price per night, rating, and reviews
- Amenity icons
- Description and distance information
- Sort and filter options
- View Details button per listing

### Homestay Detail Page
- Image gallery
- Full description and pricing
- Amenities and house rules
- Host profile information
- Ratings and written reviews
- Nearby attractions and local tips
- Book Now and Add to Wishlist buttons

### Booking Page
- Selected homestay summary
- Check-in and check-out date selection
- Guest count selector
- Automatic price calculation
- Special requests text box
- Cancellation policy display
- Confirm Booking button

### Payment Page
- Booking summary with total amount
- Multiple payment methods
- Coupon code input
- Payment status feedback

### Attractions Page
- Nearby places with photos
- Description, distance, and ratings
- Best time to visit and entry fee
- Save to Itinerary option

### Dining Page
- Book a Chef option
- Book a Table flow

### Local Guide Dashboard
- Guide profile with experience and ratings
- My Itineraries create and edit flows
- Add Attraction with image upload
- Travel tips and recommendations
- Booking management
- Reviews with manual reply input
- Messages view
- Editable profile

### Homestay Host Dashboard
- Add and edit property details
- Manage availability
- Booking requests with Accept and Reject actions
- Dynamic stats for earnings, bookings, reviews, and occupancy
- Reviews and messages
- Editable profile

### Chef Dashboard
- Meal booking requests
- Accept and reject actions
- Review and reply flow
- Profile settings

### Admin Dashboard
- Overview stats
- User management for pending, approved, and rejected users
- Interview scheduling
- Homestay approval
- Reports and analytics
- Platform settings

### Chat and Messaging
- Tourist to Host messaging
- Tourist to Guide messaging
- Booking-related threads
- Notification alerts for new messages

### Profile Page
- Profile photo upload
- Editable personal details
- Saved favourites or wishlist
- Booking history
- Notification preferences
- Logout

---

## Tech Stack

| Category | Technology |
|----------|-----------|
| Framework | React 18 |
| Build Tool | Vite |
| Routing | React Router DOM v6 |
| State Management | React Context API |
| HTTP Client | Axios |
| Styling | Tailwind CSS |
| Authentication | JWT stored on client |
| Deployment | Render |

---

## Project Structure

```text
SDP-15-FSAD-FRONTEND/
|-- public/
|-- src/
|   |-- components/
|   |-- contexts/
|   |-- hooks/
|   |-- lib/
|   |-- pages/
|   |-- App.tsx
|   `-- main.tsx
|-- .env.example
|-- package.json
|-- vite.config.ts
`-- README.md
```

---

## Getting Started

### Prerequisites

- Node.js 18 or later
- npm 9 or later
- Backend server running

### Installation

```bash
git clone https://github.com/KoritalaBhavana/SDP-15-FSAD-FRONTEND.git
cd SDP-15-FSAD-FRONTEND
npm install
cp .env.example .env
npm run dev
```

App runs at `http://localhost:8080`

### Build for Production

```bash
npm run build
npm run preview
```

---

## Pages and Routes

| Path | Page | Access |
|------|------|--------|
| `/` | Home | Public |
| `/auth` | Login and Register | Public |
| `/tourist-dashboard` | Tourist Dashboard | Tourist |
| `/host-dashboard` | Host Dashboard | Host |
| `/guide-dashboard` | Guide Dashboard | Guide |
| `/chef-dashboard` | Chef Dashboard | Chef |
| `/admin-dashboard` | Admin Dashboard | Admin |
| `/homestays` | Homestay Listing | Public |
| `/homestay/:id` | Homestay Detail | Public |
| `/booking` | Booking | Tourist |
| `/payment` | Payment | Tourist |
| `/attractions` | Attractions | Public |
| `/dining` | Dining | Public |
| `/guides` | Local Guides | Public |

---

## API Integration

All API calls go to the Spring Boot backend through Axios.

Default backend:

```text
http://localhost:6060/api
```

Swagger UI:

```text
http://localhost:6060/swagger-ui/index.html
```

Key API groups:

| Group | Base Path |
|-------|-----------|
| Auth | `/api/auth` |
| Users | `/api/users` |
| Homestays | `/api/homestays` |
| Bookings | `/api/bookings` |
| Dining Bookings | `/api/dining-bookings` |
| Attractions | `/api/attractions` |
| Guides and Itineraries | `/api/itineraries` |
| Reviews | `/api/reviews` |
| Messages | `/api/messages` |

---

## Environment Variables

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

Do not commit `.env` to version control.

---

## Deployment

Platform: Render Static Site

Live URL:

- `https://fsad-frontend-jmme.onrender.com/`

### Steps

1. Push code to GitHub
2. Connect the repo in Render
3. Set build command to `npm run build`
4. Set publish directory to `dist`
5. Add environment variables
6. Deploy

---

## Known Issues and Fixes

| Area | Fix |
|------|-----|
| Tourist My Bookings | View Details and Cancel wired to booking flows |
| Tourist Notifications | Bell icon uses unread count |
| Host Booking Requests | Accept and Reject actions added |
| Host Stats | Live values fetched from backend |
| Guide Itineraries | Create and Edit flows added |
| Guide Add Attraction | Image upload integrated |
| Admin Approval | Pending users can be approved or rejected |
| Chef Dashboard | Booking accept or reject and review reply flow added |
| Profile Photos | Shared fallback image handling added |
| Wishlist | Connected to backend and local fallback |
| Save to Itinerary | Frontend save flow added |

---

## Team

SDP Group 15 - FSAD

| Member | Role |
|--------|------|
| Koritala Bhavana | Team Lead / Full Stack Developer |
| Sahithi | Frontend Developer |
| Saniya | Frontend Developer |

---

## License

Developed as part of the Full Stack Application Development course. Academic use only.
