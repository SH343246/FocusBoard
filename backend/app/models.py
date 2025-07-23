from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime
from sqlalchemy.orm import declarative_base

Base = declarative_base()

class Habit(Base):
    __tablename__ = 'habits'

    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    frequency = Column(String, nullable=False)  
    start_date = Column(DateTime, default=datetime.utcnow)
    completed = Column(Boolean, default=False, nullable=False)

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True,index=True)
    email = Column(String, unique=True, index= True, nullable=False)
    name = Column(String)

class ToDo(Base):
    __tablename__ = "todos"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String, nullable=False)
    description = Column(String, nullable=True)
    done = Column(Boolean, default=False, nullable=False)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False )  
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

