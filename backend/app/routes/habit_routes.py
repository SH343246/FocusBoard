from fastapi import FastAPI
from fastapi import APIRouter, Depends, Request, HTTPException, status
from fastapi.responses import JSONResponse
from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi import status
from jose import JWTError

from utils.jwt_handler import create_access_token, decode_refresh_token

from app import models, schemas
from app.db import engine, get_db          
from app.models import Base, Habit, User, ToDo    
from utils.token_verification import get_current_user
Base.metadata.create_all(bind=engine)
router = APIRouter()


@router.get("/me")
def read_users_me(user: dict = Depends(get_current_user)):
    return {"id": user["id"], "email": user["sub"]}

@router.get("/protected")
def protected_route(current_user: dict = Depends(get_current_user)):
    return {
        "message": f" access granted: {current_user['sub']}",
        "user_id": current_user['id']
    }

@router.post("/refresh")
def refresh_token(request: Request, db: Session = Depends(get_db)):
    refresh_token = request.headers.get("Authorization")
    if not refresh_token:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Missing refresh token")

    try:
        token = refresh_token.replace("Bearer ", "")
        payload = decode_refresh_token(token)
        user = db.query(User).filter(User.email == payload["sub"]).first()

        if not user:
            raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="User not found")

        new_access_token = create_access_token(data={"sub": user.email, "id": user.id})
        return {"access_token": new_access_token}

    except JWTError:
        raise HTTPException(status_code=status.HTTP_401_UNAUTHORIZED, detail="Invalid refresh token")

@router.post("/habits", response_model=schemas.HabitRead)
def create_habit( habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    db_habit = Habit(
        name=habit.name,
        description=habit.description,
        frequency=habit.frequency,
        start_date=habit.start_date or None,
        completed=habit.completed if habit.completed is not None else False
    )
    db.add(db_habit)
    db.commit()
    db.refresh(db_habit)
    return db_habit

@router.get("/habits", response_model=list[schemas.HabitRead])
def return_all_habits( db: Session = Depends(get_db)):
    return db.query(Habit).all()
    
@router.get("/habits/{habit_id}", response_model=schemas.HabitRead)
def get_habit_by_id(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id).first()

    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")

    return habit

@router.put("/habits/{habit_id}", response_model=schemas.HabitRead)
def update_habit(habit_id: int, updated_data: schemas.HabitCreate, db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id).first()

    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")

    habit.name = updated_data.name
    habit.description = updated_data.description
    habit.frequency = updated_data.frequency
    habit.start_date = updated_data.start_date
    habit.completed   = updated_data.completed 
    db.commit()
    db.refresh(habit)
    return habit


@router.delete("/habits/{habit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_habit(habit_id: int, db: Session = Depends(get_db)):
    habit = db.query(Habit).filter(Habit.id == habit_id).first()

    if habit is None:
        raise HTTPException(status_code=404, detail="Habit not found")

    db.delete(habit)
    db.commit()
    return None

__all__ = ["router"]
