from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class HabitCreate(BaseModel):
    name: str
    description: Optional[str] = None
    frequency: str
    start_date: Optional[datetime] = None

class HabitRead(BaseModel):
    id: int
    name: str
    description: Optional[str] = None
    frequency: str
    start_date: datetime

    class Config:
        orm_mode = True


