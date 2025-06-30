from fastapi import FastAPI
from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from fastapi import HTTPException
from fastapi import status


from app import models, schemas
from app.db import engine, get_db          
from app.models import Base, Habit          

Base.metadata.create_all(bind=engine)
router = APIRouter()

@router.post("/habits", response_model=schemas.HabitRead)
def create_habit( habit: schemas.HabitCreate, db: Session = Depends(get_db)):
    db_habit = Habit(
        name=habit.name,
        description=habit.description,
        frequency=habit.frequency,
        start_date=habit.start_date or None
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
