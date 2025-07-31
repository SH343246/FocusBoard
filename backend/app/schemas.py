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
    done: Optional[bool] = False
  

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

class WidgetRead(BaseModel):
    id: int
    name: str
    slug: str
    description: str | None

    class Config:
        orm_mode = True

class UserWidgetRead(BaseModel):
    id: int
    widget_id: int
    user_id: int
    enabled: bool
    position: Optional[int] = None
    widget: WidgetRead
    style: Optional[str] = None

    class Config:
        orm_mode = True

class UserWidgetUpdate(BaseModel):
    enabled: Optional[bool] = None
    style: Optional[str] = None
    position: Optional[int] = None

class WidgetOrderUpdate(BaseModel):
    id: int
    position: int
