from sqlalchemy import Column, Integer, String, DateTime
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
    completed = Column(Integer, default=False)
