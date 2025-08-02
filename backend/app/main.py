from dotenv import load_dotenv
load_dotenv()

import os
from pathlib import Path
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware

from app.routes import auth
from app.routes.habit_routes import router as habit_routes
from app.routes.todo_routes import router as todo_routes
from app.routes.widget_routes import router as widget_routes
from app.db import get_db
from app.models import Widget

if not os.getenv("RENDER"):  
    from dotenv import load_dotenv
    load_dotenv()

print("GOOGLE_CLIENT_ID =", os.getenv("GOOGLE_CLIENT_ID"))

app = FastAPI()


app.include_router(habit_routes)
app.include_router(widget_routes)
app.include_router(todo_routes)
app.include_router(auth.router)



FRONTEND_DIST = os.getenv("FRONTEND_DIST", "static")
static_path = Path(__file__).parent.parent / FRONTEND_DIST
app.mount("/", StaticFiles(directory=static_path, html=True), name="frontend")


app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY"),
    same_site="none",     
    https_only=True    
)

# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=[
#         "https://focusboard-frontend.fly.dev",
#         "https://backend-solitary-silence-6711.fly.dev"
#     ],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

def seed_widgets():
    db = next(get_db())
    widget_types = [
        {"type": "weather", "description": "displays current weather"},
        {"type": "quote", "description": "a motivational quote"},
        {"type": "news", "description": "news headlines"},
    ]
    for w in widget_types:
        if not db.query(Widget).filter_by(type=w["type"]).first():
            db.add(Widget(**w))
    db.commit()
