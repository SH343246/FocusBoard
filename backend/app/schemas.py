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


