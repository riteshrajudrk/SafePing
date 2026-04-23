# SafePing

SafePing is a production-leaning MERN application that tracks a user's live position, detects entry into saved geofences, and automatically sends an arrival SMS to a trusted contact.

## Stack

- Frontend: React, Vite, TailwindCSS, React Router, Axios, Framer Motion, Leaflet, React Leaflet, reusable shadcn-style UI primitives
- Backend: Node.js, Express, MongoDB, Mongoose, JWT authentication, Twilio SMS, modular MVC architecture

## Folder Structure

```text
SafePing/
  client/
    src/
      components/
      hooks/
      layouts/
      pages/
      routes/
      services/
      store/
      utils/
  server/
    src/
      config/
      controllers/
      middleware/
      models/
      routes/
      services/
      utils/
```

## Setup

### Backend

```bash
cd server
copy .env.example .env
npm install
npm run dev
```

### Frontend

```bash
cd client
copy .env.example .env
npm install
npm run dev
```

## Required Environment Variables

### Server

- `NODE_ENV`
- `PORT`
- `MONGO_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`
- `CLIENT_URL`
- `TWILIO_SID`
- `TWILIO_AUTH_TOKEN`
- `TWILIO_PHONE`

### Client

- `VITE_API_URL`

## GitHub And Deployment

Before pushing to GitHub, keep real `.env` files private. The root `.gitignore` is configured to ignore `client/.env`, `server/.env`, `node_modules`, build output, logs, and Vercel local metadata.

### Frontend On Vercel

Deploy the `client` folder as the Vercel project.

Recommended Vercel settings:

- Framework Preset: `Vite`
- Root Directory: `client`
- Build Command: `npm run build`
- Output Directory: `dist`
- Install Command: `npm install`

Add this Vercel environment variable for the frontend:

```env
VITE_API_URL=https://your-backend-domain.com/api
```

The file `client/vercel.json` is included so React Router routes like `/dashboard`, `/tracking`, and `/history` work when refreshed directly on Vercel.

### Backend Deployment

This Express backend is a normal Node server, so deploy it to a Node backend host such as Render, Railway, Fly.io, or a VPS.

Set these backend environment variables on the backend host:

```env
NODE_ENV=production
PORT=5000
MONGO_URI=mongodb+srv://...
JWT_SECRET=your_strong_secret
JWT_EXPIRES_IN=7d
CLIENT_URL=https://your-frontend.vercel.app
TWILIO_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_PHONE=your_twilio_phone_number
```

`CLIENT_URL` is used by the backend CORS config. After Vercel gives you the frontend URL, put that URL in the backend host's `CLIENT_URL`.

## Example API Endpoints

- `POST /api/auth/register`
- `POST /api/auth/login`
- `GET /api/auth/me`
- `GET /api/contacts`
- `POST /api/contacts`
- `DELETE /api/contacts/:contactId`
- `GET /api/locations`
- `POST /api/locations`
- `DELETE /api/locations/:locationId`
- `POST /api/locations/check`
- `GET /api/history`

## Notes

- If Twilio credentials are missing, SMS delivery is simulated so the complete geofence flow can still be tested safely.
- The app now uses OpenStreetMap tiles through Leaflet, so no Mapbox token or card details are required.
