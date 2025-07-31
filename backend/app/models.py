from sqlalchemy import Column, Integer, String, DateTime, Boolean, ForeignKey
from datetime import datetime
from sqlalchemy.orm import declarative_base, relationship

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

class Widget(Base):
    __tablename__ = "widgets"
    id = Column(Integer, primary_key=True, autoincrement=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    slug = Column(String, unique =True, nullable=False)

    user_widgets = relationship("UserWidget", back_populates="widget", lazy='joined')

class UserWidget(Base):
    __tablename__ = "user_widgets"

    id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    widget_id = Column(Integer, ForeignKey("widgets.id"), nullable=False)
    enabled = Column(Boolean, default=True)
    position = Column(Integer, nullable=True)
    widget = relationship("Widget", back_populates="user_widgets", lazy='joined')
    style = Column(String, nullable=True)  


class Quote(Base):
    __tablename__ = "quotes"

    id = Column(Integer, primary_key=True, autoincrement=True)
    text = Column(String, nullable=False)
    author = Column(String, nullable=True)

    