Focusboard
A minimalist productivity dashboard with Todos, Habits, and customizable Widgets (Weather, News, NASA APOD, Crypto, Time, Quotes, Jokes).
Built with React + TypeScript (frontend) and FastAPI (backend) on PostgreSQL. OAuth is done via Google, and Deployment is on Render.

Features
Google OAuth login (access + refresh tokens)

Todos: create, update, delete

Habits: full CRUD + toggle completed

Widgets: User settings and widgets seeded on first login
Weather, News, NASA APOD, Crypto prices, Local time, Quotes, Random jokes

Backend proxy for external APIs (no frontend keys)

Production build serves SPA + API from one service

Tech
Frontend: React, TypeScript, React Query, Tailwind, Vite

Backend: FastAPI, SQLAlchemy, Pydantic

DB: PostgreSQL

Auth: Google OAuth (Authlib)

Infra: Render (web service + managed Postgres)


### Login
![Login animation](Gifs/Login.gif)

### Add Habit & Todo
![Add habit and todo](Gifs/Add-A-Habit-and-Todo.gif)

### Move / Collapse Widgets
![Rearranging widgets](Gifs/Move-and-Collapse-Widgets.gif)
Set it up yourself (optional)

Prereqs
Node.js (for frontend)
Python 3.11+ (for backend)
PostgreSQL (or another hosted instance)
'.env' file (example below)

Steps

1. Clone the repo:
   ```bash
   git clone https://github.com/youruser/focusboard.git
   cd focusboard

2. Copy this .env template and fill in the keys:
   DATABASE_URL=postgresql://user:password@host:port/dbname?sslmode=require
   GOOGLE_CLIENT_ID=your-google-client-id.apps.googleusercontent.com
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   FRONTEND_REDIRECT_URI=http://localhost:5173
   SESSION_SECRET_KEY=some-random-string
   JWT_ALGORITHM=HS256
   SECRET_KEY=some-random-string
   NEWS_API_KEY=your_newsapi_key
   OPENWEATHER_API_KEY=your_openweather_key
   VITE_DEFAULT_CITY=Chicago

3. Backend:
   cd backend
   pip install -r requirements.txt
   uvicorn app.main:app --reload

4. Frontend:
   cd ../frontend
   npm install
   npm run dev

5. Open http://localhost:5173 and log in with Google.

Notes:
   * You can seed quotes/widgets manually via SQL if needed.
   * Tokens are stored in localStorage and refresh logic is built in.
   * Your Google OAuth app needs to have the correct redirect URIs put in.
  
Deployment
The app is deployed on Render using the free tier for low traffic. You can deploy by connecting this repo to Render, Fly.io, or any container-compatable host.

Troubleshooting
   * If any of the .env keys are not set then the app will run into errors.
   * A OAuth state mismatch could happen if the callback URL/state doesnt align, try logging in again.




