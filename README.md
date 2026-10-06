# Layquest

Gamified layover and trip planner for Singapore. Enter the exact hours you are in the country, pick a travel style, and get an itinerary that plays out on a map like a quest: checkpoints, XP, wild encounters, badges and a 3D passport.

> **Status: scaffold only.** The folder structure, routes, models and tooling are in place. Almost every controller returns `501 Not implemented` until someone builds it. See [Features](#features) for what is wired.

Course project for IS216 (Section G3, Group 4).

## The idea

Jackson, 24, is transiting through Singapore from the US with about 10 hours. He is anxious about immigration time and getting back for his flight, has no local SIM and does not know the transit system. He wants a fun, low-stress way to see the city.

Most trip planners hand you a static list. Layquest turns that list into a game:

- Enter your arrival and departure times and your interests. The app generates a time-boxed itinerary that respects an immigration buffer and a buffer to get back to the airport.
- Each stop becomes a checkpoint that gives XP on arrival. Dotted paths connect the day's quest line.
- Spots outside the plan surface mid-walk as wild encounters, so you can fold in a hidden gem.
- Check rain and danger forecasts, join a clan of people heading to the same place, and get told to cancel if it becomes unsafe.
- Team up with strangers or friends doing the same quest, or swipe through side-quest meetups.
- Progress lives in XP, achievements, a customisable avatar and an animated 3D passport.

### Problem statement

- Decision paralysis under time pressure wastes a good layover. The issue is not a lack of options.
- Complimentary guided tours cannot be customised.

### Objectives

1. Gamify travel planning for Singapore's young travellers.
2. Turn indecision into a guided mission instead of a static list.
3. Build an all-in-one planner for long-term, repeat use.
4. Centralise place discovery, social content and safety advisories in one map interface.
5. Keep travellers safe with real-time weather and danger data, and clans for people heading to the same place.

**Devices:** laptops and mobile. Build mobile-first.

## Features

| # | Feature | Models | Server (controller / services) | Client (views / components) | Status |
|---|---------|--------|--------------------------------|-----------------------------|--------|
| 1 | Pokemon Go style location explorer | Quest, Place | `questController`, `services/gamification` | `ExploreView`, `QuestView`, `map/threeLayer.js`, `MapCanvas` | Map renders, rest stubbed |
| 2 | AI-assisted itinerary planner | Trip, Itinerary | `itineraryController`, `services/ai`, `services/geo` | `PlannerView`, `LayoverForm`, `ItineraryTimeline` | Planner pipeline + fallback + tests, controller stubbed |
| 3 | Passport maker (3D, stamps, custom cover) | Passport, Stamp, Achievement | `passportController` | `PassportView`, `PassportViewer` | Stubbed |
| 4 | Profile preview and verified badge | User | `userController` | `ProfileView`, `VerifiedBadge` | Stubbed |
| 5 | Weather and danger forecast, clans | Advisory, Clan | `advisoryController`, `clanController`, `services/weather` | `ForecastView`, `AdvisoryCard` | Stubbed |
| 6 | Content based on location (TikTok, Lemon8, AI summary) | SocialPost, Place | `contentController`, `services/social` | `LocationView`, `SocialPostEmbed` | Stubbed |
| 7 | Messaging within activities | Conversation, Message, JoinRequest | `chatController` | `ChatView`, `MessageList` | Stubbed |
| 8 | Side-quests (swipe to join meetups) | SideQuest, JoinRequest | `sideQuestController` | `SideQuestView`, `SwipeCard` | Stubbed |
| 9 | Light and dark mode | none | none | `useTheme`, `ThemeToggle` | Working |
| 10 | Online ticket and visa | none | `travelController`, `services/travel` | `TravelView` | Stubbed |

Auth (register, login, JWT middleware) is shared by everything. The JWT middleware and validation are done. The auth controller is stubbed.

## Architecture

Layquest is a monorepo with two npm workspaces: `client/` (Vue 3 SPA) and `server/` (Express REST API).

### How MVC maps here

| Layer | Where it lives | Notes |
|-------|----------------|-------|
| **Model** | `server/src/models/` (Mongoose) | Schemas and data rules. Client-side state mirrors it in `client/src/stores/` (Pinia). |
| **View** | `client/src/views/` and `client/src/components/` | Pages and reusable UI. No business logic and no direct `fetch`. |
| **Controller** | `server/src/controllers/` | Thin handlers: read input, call a service or model, shape the response. |
| Routes | `server/src/routes/` | Map URLs to controllers and attach middleware. |
| Services | `server/src/services/` | Business logic and third-party APIs (Gemini, weather, oEmbed). Keeps controllers thin and logic testable. |
| API clients | `client/src/services/` | One file per resource, mirrors the server routes. Stores call these, views call stores. |

Request flow:

```
View -> Pinia store -> client/services/*Api.js --HTTP--> routes -> middleware -> controller -> service / model -> MongoDB
```

### AI itinerary pipeline (X-factor)

The AI never invents the route. Gemini only picks and orders place IDs and writes short copy.

1. `computeUsableMinutes` works out the time budget: window minus immigration buffer minus return buffer.
2. `generateStructuredItinerary` asks Gemini for JSON in one fixed shape (`itineraryOutputSchema`: place IDs and notes, no coordinates, no timings).
3. The response is validated with Zod. On failure it retries once.
4. If it fails twice, or Gemini is unreachable, `buildFallbackPlan` builds the route with Turf (nearest-neighbour ordering, greedy fill of the time budget). Same output shape, so the UI cannot tell the difference.
5. TODO: the server hydrates place IDs, computes `startAt` / `endAt` and travel minutes from real data, and checks opening hours and the deadline.

Steps 1 to 4 are implemented and tested. Gemini itself is a stub, so today every request uses the fallback.

### Folder structure

```
layquest/
├── package.json              # npm workspaces + dev scripts
├── README.md
├── client/                   # Vue 3 + Vite + Pinia + Bootstrap 5
│   ├── index.html
│   ├── vite.config.js        # /api proxy to :3000, "@" alias
│   ├── vercel.json           # SPA rewrite
│   └── src/
│       ├── main.js
│       ├── App.vue
│       ├── router/           # routes + auth guard, lazy-loaded views
│       ├── views/            # V: one file per page
│       ├── components/
│       │   ├── layout/       # AppNavbar, ThemeToggle
│       │   ├── map/          # MapCanvas (MapLibre)
│       │   ├── planner/  quest/  passport/  profile/
│       │   └── forecast/  content/  chat/  sidequest/
│       ├── stores/           # Pinia: auth, trip, itinerary, quest, passport, ...
│       ├── services/         # http.js + one *Api.js per resource
│       ├── composables/      # useTheme, useGeolocation
│       ├── map/              # createMap, threeLayer (MapLibre + Three.js), questPathLayer
│       ├── styles/           # theme.css (brand tokens)
│       └── assets/
└── server/                   # Express 5 + Mongoose
    ├── api/index.js          # Vercel serverless entry
    ├── vercel.json
    ├── src/
    │   ├── app.js            # express app (exported, used by tests)
    │   ├── server.js         # local entry
    │   ├── config/           # env.js, db.js (cached connection)
    │   ├── models/           # M: User, Place, Trip, Itinerary, Quest, Passport, Stamp,
    │   │                     #    Achievement, Clan, Advisory, SocialPost, Conversation,
    │   │                     #    Message, SideQuest, JoinRequest
    │   ├── controllers/      # C: one per resource, stubs return 501
    │   ├── routes/           # one router per resource, mounted in routes/index.js
    │   ├── middleware/       # auth (JWT), validate (Zod), notFound, errorHandler
    │   ├── validators/       # Zod request schemas
    │   ├── services/
    │   │   ├── ai/           # geminiClient, itinerarySchema, plannerService, fallbackPlanner
    │   │   ├── geo/          # timeBudget, clusterService (Turf)
    │   │   ├── weather/      # openMeteo, gdacs, severity
    │   │   ├── social/       # oembed, locationSummary
    │   │   ├── travel/       # visa, flights
    │   │   ├── places/       # stbService
    │   │   └── gamification/ # xpService
    │   └── utils/            # HttpError, notImplemented
    └── tests/                # Vitest + Supertest
```

## Tech stack

| Area | Choice |
|------|--------|
| Frontend | Vue 3 (Composition API), Vite, Pinia, Vue Router, Bootstrap 5 |
| Map and 3D | MapLibre GL JS + Three.js (custom layer) |
| Geospatial | Turf.js |
| Backend | Node.js, Express 5 |
| Database | MongoDB with Mongoose |
| Auth | JWT (bcryptjs for password hashing) |
| Validation | Zod |
| AI | Gemini (`@google/genai`) with structured output + fallback planner |
| Hosting | Vercel |
| Tests | Vitest, Supertest |

The proposal does not name the backend language. Node/Express was chosen to match the JS stack. Change it now if the course requires something else.

## External APIs

| Service | Used for | Env var |
|---------|----------|---------|
| Gemini | Itinerary planning, location summaries | `GEMINI_API_KEY`, `GEMINI_MODEL` |
| Open-Meteo | Rain forecast | `OPEN_METEO_BASE_URL` |
| GDACS | Global disaster alerts | `GDACS_BASE_URL` |
| TikTok oEmbed | Embedded posts on location pages | `TIKTOK_OEMBED_URL` |
| Singapore Tourism Board | Places of interest | `STB_API_KEY` |
| Travel Buddy | Visa requirements | `TRAVEL_BUDDY_API_KEY` |
| Trip.com | Flight options and redirect | `TRIPCOM_API_KEY` |
| Browser Geolocation | Live position for the explorer | none |

## Getting started

Requirements: Node 20+ and a MongoDB instance (local or Atlas).

```bash
git clone <repo-url> layquest && cd layquest
npm install                      # installs both workspaces

cp server/.env.example server/.env
cp client/.env.example client/.env
# edit server/.env: set MONGODB_URI and JWT_SECRET

npm run dev                      # API on :3000, client on :5173
```

- Client: http://localhost:5173
- API health check: http://localhost:3000/api/health (works even if MongoDB is down; it reports `db: "disconnected"`)

### Scripts (run from the repo root)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Server and client together |
| `npm run dev:server` / `npm run dev:client` | One side only |
| `npm run build` | Production build of the client |
| `npm test` | Server tests (client has none yet) |

## API surface

All routes are under `/api` and require a Bearer token except `register`, `login` and `health`. Every handler below is a stub unless noted.

| Resource | Routes |
|----------|--------|
| health | `GET /health` (done) |
| auth | `POST /auth/register`, `POST /auth/login`, `GET /auth/me` |
| users | `PATCH /users/me`, `POST /users/me/verify`, `GET /users/:id` |
| places | `GET /places`, `GET /places/nearby`, `GET /places/:id` |
| trips | `GET/POST /trips`, `GET/PATCH/DELETE /trips/:id` |
| itineraries | `POST /itineraries/generate`, `GET /itineraries/:id`, `POST /itineraries/:id/revise`, `POST /itineraries/:id/gamify` |
| quests | `GET /quests`, `GET /quests/:id`, `POST /quests/:id/checkpoints/:checkpointId/arrive`, `GET /quests/:id/encounters`, `POST /quests/:id/encounters/:encounterId/catch` |
| passports | `GET /passports/me`, `PATCH /passports/me/cover`, `GET /passports/:userId` |
| clans | `GET /clans`, `POST /clans/join`, `POST /clans/:id/leave` |
| advisories | `GET /advisories`, `GET /advisories/map` |
| content | `GET /content/places/:placeId/posts`, `GET /content/places/:placeId/summary` |
| chat | `GET /chat/conversations`, `GET/POST /chat/conversations/:id/messages` |
| sidequests | `GET /sidequests/deck`, `POST /sidequests/:id/swipe`, `POST /sidequests/:id/requests`, `PATCH /sidequests/requests/:requestId` |
| travel | `GET /travel/visa`, `GET /travel/flights` |

When you add or change a route, update the matching file in `client/src/services/` too.

## Deployment (Vercel)

Two Vercel projects from the same repo:

1. **Client:** root directory `client/`, framework Vite. Set `VITE_API_BASE_URL` to the deployed API, for example `https://<api-project>.vercel.app/api`.
2. **Server:** root directory `server/`. `api/index.js` exposes the Express app as a serverless function and `vercel.json` rewrites all paths to it. Set every variable from `server/.env.example`, with `CLIENT_ORIGIN` set to the client URL.

The Vercel config has not been deployed yet. Do a test deploy early.

## Team

| Member | Responsibilities |
|--------|------------------|
| Kayra Zalfa Alimaa | Database management, API, backend development |
| Nathanael Steven Chiang | User authentication and middleware, database management |
| Ganaden Matt Eudale Corpuz | Figma design, CSS / Vue.js |
| Shrey Chauhan | Three.js feature, CSS / Vue.js |
| Matthew Tjandera | Site hosting and reliability, Figma design, CSS / Vue.js |
| Hulbert Koh Ming Ren | API, backend development |

## Timeline

| Week | Plan |
|------|------|
| 7 | Project proposal (done) |
| 8 | Weather-aware replanning and side-quests, live API keys, start cross-device testing |
| 9 | Progress evaluation in class. If the core is solid, start quest parties and chat |
| 10 | Parties and chat, polish pass, empty states, error handling, real multi-account testing |
| 11 | Peer evaluation. Feature freeze, fixes only |
| 12 | Final QA, production deploy check, write-up. Deliverables due Friday 9am SG time |
| 13 | Final presentation: live run-through of Jackson's 8-hour and 14-hour layovers |

## Conventions

- Branch per feature (`feature/passport-3d`), pull request into `main`, one reviewer.
- Keep controllers thin. Put logic in `services/` so it can be unit tested.
- Validate every request body with a Zod schema in `validators/` and the `validate()` middleware.
- Never commit `.env` files or API keys. Only `.env.example` is tracked.
- Replace a stub's `notImplemented(...)` with a real handler and add a Supertest test.

## Open questions

Things in the proposal that disagree or need checking before building on them.

1. **Database and AI conflict.** The timeline says to "swap in live Groq and Supabase keys" and test "Supabase's row-level security". The tech stack says MongoDB and Gemini. The scaffold follows the stack list. MongoDB has no row-level security, so access rules live in controllers and middleware.
2. **Layover vs general trip.** The overview describes a trip planner, while the user story and timeline are about 8 to 14 hour layovers. `Trip.layover` is optional and the generate endpoint accepts either `layover` or `days`, so both work.
3. **Real-time chat on Vercel.** Serverless functions do not hold WebSocket connections. Start with polling for chat, or use a hosted realtime service.
4. **API access.** Confirm early that you can actually get keys and terms for Trip.com, Travel Buddy, STB and Lemon8/Instagram embeds. I am not sure all of them have open public access. Only TikTok oEmbed is confirmed as an open embed API. Plan a mocked fallback for each.
5. **Map stack.** The API list names Google Maps, OpenStreetMap, GoMap and Mapbox, but the stack and X-factors use MapLibre. The scaffold uses MapLibre only, with a demo style from MapLibre. We need a real style and tile source.
6. **Placeholder numbers to tune.** Immigration buffer 60 min, return buffer 180 min (`services/geo/timeBudget.js`) and average transit speed 20 km/h (`services/geo/clusterService.js`).
