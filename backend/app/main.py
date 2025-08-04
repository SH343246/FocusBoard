from dotenv import load_dotenv
from starlette.responses import FileResponse, RedirectResponse
import os
from pathlib import Path
from fastapi import FastAPI, APIRouter, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware
from sqlalchemy.orm import Session

from app.routes import auth
from app.routes.habit_routes import router as habit_routes
from app.routes.todo_routes import router as todo_routes
from app.routes.widget_routes import router as widget_routes
from app.db import get_db
from app.models import Widget




app = FastAPI()

app.include_router(habit_routes,  prefix="/api")
app.include_router(widget_routes, prefix="/api")
app.include_router(todo_routes,   prefix="/api")

app.include_router(auth.router)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY"),
    same_site="none",      
    https_only=True,       )

FRONTEND_DIST = os.getenv("FRONTEND_DIST", "static")
static_path = Path(__file__).parent.parent / FRONTEND_DIST
app.mount("/assets", StaticFiles(directory=static_path / "assets"), name="assets")

@app.get("/favicon.svg", include_in_schema=False)
def favicon():
    return FileResponse(static_path / "favicon.svg", media_type="image/svg+xml")


@app.get("/", include_in_schema=False)
def root_index():
    return FileResponse(static_path / "index.html")

@app.get("/auth/callback", include_in_schema=False)
def spa_auth_callback():
    return FileResponse(static_path / "index.html")

@app.get("/{full_path:path}", include_in_schema=False)
def spa_catch_all(full_path: str):
    if full_path.startswith(("api/", "auth/google", "auth/google/callback")):
        from fastapi import HTTPException
        raise HTTPException(status_code=404)
    return FileResponse(static_path / "index.html")


from sqlalchemy.orm import Session
from app.models import Widget

@app.on_event("startup")
def ensure_widgets_seed():
    db = next(get_db())
    data = [
        {"name":"Crypto","description":"crypto prices","slug":"crypto"},
        {"name":"Weather","description":"weather","slug":"weather"},
        {"name":"Nasa","description":"nasa apod","slug":"nasa"},
        {"name":"News","description":"top headlines","slug":"news"},
        {"name":"Timezone","description":"local time","slug":"timezone"},
        {"name":"Quote","description":"daily quote","slug":"quote"},
        {"name":"Joke","description":"random joke","slug":"joke"},
    ]
    for w in data:
        if not db.query(Widget).filter_by(slug=w["slug"]).first():
            db.add(Widget(**w))
    db.commit()

