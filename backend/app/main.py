from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_methods=["*"],
    allow_headers=["*"],
)
dummy_habits = [
    {"id": 1, "name": "Drink Water", "frequency": "daily"},
    {"id": 2, "name": "Read Book", "frequency": "weekly"},
    {"id": 3, "name": "Workout", "frequency": "3x/week"}
]

@app.get("/habits")
def get_habits():
    return dummy_habits