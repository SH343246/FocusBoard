from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
#from app.routes import habit_routes as habits
from app.routes import auth
from app.routes.habit_routes import router as habit_routes
from starlette.middleware.sessions import SessionMiddleware
import os


from dotenv import load_dotenv
load_dotenv()
print("GOOGLE_CLIENT_ID =", os.getenv("GOOGLE_CLIENT_ID"))




app = FastAPI()
app.include_router(habit_routes)
app.include_router(auth.router)

app.add_middleware(
    SessionMiddleware,
    secret_key=os.getenv("SESSION_SECRET_KEY")  
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)
