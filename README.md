# HerdNova AI — Farmer-Friendly Frontend

A simple React + Vite interface for the HerdNova AI livestock farm assistant.

## Included
- Dashboard with cattle camera/upload scanner and weather card
- Floating voice assistant available from every page
- English, Kannada, Hindi, and Tamil interface selector
- Speech recognition and spoken replies using the selected language (browser support required)
- Previous Chats with saved conversation context (browser local storage)
- Farmer community feed with locally saved demo posts
- Responsive layout for mobile and desktop

## Run locally
Install Node.js 18+ and run:

```bash
npm install
npm run dev
```

Open the local URL printed by Vite (usually `http://localhost:5173`).

## Backend connection
The default API base URL is `http://127.0.0.1:8000`. To change it, copy `.env.example` to `.env` and set `VITE_API_URL`.

The frontend tries these endpoints:
- `POST /api/analyze-image` — multipart form data with `file` and `language`
- Fallback: `POST /api/analyze` — JSON `{ "query": "...", "farm_id": 1, "language": "English" }`
- `POST /api/chat` — JSON `{ "message": "...", "query": "...", "language": "English", "history": [...] }`
- `GET /api/weather` — optional weather data

Adjust endpoint names and request fields in `src/App.jsx` to match your existing FastAPI backend. The UI can open without the backend, but AI analysis/chat need the corresponding API routes. Weather and product listings use sample display values until connected to live services. Community posts, language preference, chat, and history are saved in this browser's local storage.

## Voice notes
Voice recognition uses the browser's Web Speech API and works best in Chrome. Microphone permission is required. Spoken responses use the selected language's browser speech voice when available. The language selector translates the main interface; backend-generated AI responses depend on the backend/model honoring the `language` field.

## Safety
AI output is general guidance, not a veterinary diagnosis. Consult a veterinarian for urgent or serious animal health concerns.
