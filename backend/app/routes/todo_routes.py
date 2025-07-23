from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.db import get_db
from app.models import ToDo
from app.schemas import ToDoCreate, ToDoRead, ToDoUpdate
from utils.token_verification import get_current_user

router = APIRouter(prefix="/todos", tags=["todos"])


@router.post("/", response_model=ToDoRead, status_code=status.HTTP_201_CREATED)
def create_todo(
    todo: ToDoCreate, db: Session = Depends(get_db),current_user = Depends(get_current_user)):
    db_todo = ToDo(
        title=todo.title,
        description=todo.description,
        done=False,
        user_id=current_user["id"]
    )
    db.add(db_todo)
    db.commit()
    db.refresh(db_todo)
    return db_todo


@router.get("/", response_model=list[ToDoRead])
def list_todos(db: Session = Depends(get_db),current_user = Depends(get_current_user)):
    return db.query(ToDo).filter(ToDo.user_id == current_user["id"]).all()


@router.put('/{todo_id}', response_model=ToDoRead)
def update_todo(todo_id: int,todo: ToDoUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    db_todo = db.query(ToDo).filter(ToDo.id == todo_id,ToDo.user_id == current_user["id"]
    ).first()

    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    if todo.title is not None:
        db_todo.title = todo.title
    if todo.description is not None:
        db_todo.description = todo.description
    if todo.done is not None:
        db_todo.done = todo.done

    db.commit()
    db.refresh(db_todo)
    return db_todo


@router.delete('/{todo_id}', status_code=status.HTTP_204_NO_CONTENT)
def delete_todo(todo_id: int,db: Session = Depends(get_db),current_user = Depends(get_current_user)
):
    db_todo = db.query(ToDo).filter(
        ToDo.id == todo_id,ToDo.user_id == current_user["id"]).first()

    if db_todo is None:
        raise HTTPException(status_code=404, detail="Todo not found")

    db.delete(db_todo)
    db.commit()
