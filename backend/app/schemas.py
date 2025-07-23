from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HabitCreate(BaseModel):
    name: str
    description: Optional[str] = None
    frequency: str
    start_date: Optional[datetime] = None
    completed: Optional[bool] = False

class HabitRead(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    frequency: str
    start_date: Optional[datetime] = None
    completed: bool 

    class Config:
        orm_mode = True

class ToDoCreate(BaseModel):
    title: str
    description: Optional[str] = None
  

class ToDoRead(BaseModel):
    id: int
    title: str
    description: Optional[str] = None
    done: bool


    class Config:
        orm_mode = True

class ToDoUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    done: Optional[bool] = None

