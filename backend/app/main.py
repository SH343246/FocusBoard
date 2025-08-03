from dotenv import load_dotenv
from starlette.responses import FileResponse, RedirectResponse
import os
from pathlib import Path
from fastapi import FastAPI, APIRouter, Depends, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from starlette.middleware.sessions import SessionMiddleware


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
    same_site="lax",
    https_only=True,
)

FRONTEND_DIST = os.getenv("FRONTEND_DIST", "static")
static_path = Path(__file__).parent.parent / FRONTEND_DIST
app.mount("/", StaticFiles(directory=static_path, html=True), name="frontend")

@app.get("/healthz", include_in_schema=False)
def healthz():
    return {"ok": True}






@app.get("/{full_path:path}", include_in_schema=False)
def spa_catch_all(full_path: str):
    if full_path.startswith(("api/", "auth/google", "auth/google/callback")):
        from fastapi import HTTPException
        raise HTTPException(status_code=404)
    return FileResponse(static_path / "index.html")

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
