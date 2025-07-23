from dotenv import load_dotenv
load_dotenv()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
#from app.routes import habit_routes as habits
from app.routes import auth
from app.routes.habit_routes import router as habit_routes
from app.routes.todo_routes import router as todo_routes
from starlette.middleware.sessions import SessionMiddleware
import os



print("GOOGLE_CLIENT_ID =", os.getenv("GOOGLE_CLIENT_ID"))




app = FastAPI()
app.include_router(habit_routes)
app.include_router(todo_routes)  
app.include_router(auth.router)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY")  
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
