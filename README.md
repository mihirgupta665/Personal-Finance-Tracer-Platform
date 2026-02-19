# Fintech

A React + Vite + Firebase app for tracking personal finances.

## Local Setup

1. Install dependencies:
```bash
npm install
```

2. Create `.env` from `.env.example` and fill Firebase values.

3. Start development server:
```bash
npm run dev
```

## Deploy To Vercel

1. Push this project to GitHub.
2. In Vercel, import the repository.
3. In Vercel Project Settings -> Environment Variables, add:
   - `VITE_FIREBASE_API_KEY`
   - `VITE_FIREBASE_AUTH_DOMAIN`
   - `VITE_FIREBASE_PROJECT_ID`
   - `VITE_FIREBASE_STORAGE_BUCKET`
   - `VITE_FIREBASE_MESSAGING_SENDER_ID`
   - `VITE_FIREBASE_APP_ID`
4. Deploy.

Notes:
- `vercel.json` is included for Vite build output and SPA route rewrites (`/analytics`, `/`, etc.).
- Build command: `npm run build`
- Output directory: `dist`
