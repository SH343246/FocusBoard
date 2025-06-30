from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
#from app.routes import habit_routes as habits
from app.routes.habit_routes import router as habit_routes




app = FastAPI()
app.include_router(habit_routes)



app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)
