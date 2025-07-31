from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
import httpx, random
from fastapi.responses import JSONResponse
from app.schemas import WidgetOrderUpdate

from app.db import get_db
from app.models import Widget, UserWidget, Quote
from utils.token_verification import get_current_user
from app.schemas import WidgetRead, UserWidgetRead, UserWidgetUpdate

router = APIRouter(prefix="/widgets", tags=["widgets"])

@router.get("/", response_model=list[WidgetRead])
def get_all_widgets(db: Session = Depends(get_db)):
    return db.query(Widget).all()

@router.get("/me", response_model=list[UserWidgetRead])
def get_user_widgets(db: Session = Depends(get_db), current_user = Depends(get_current_user)):
    return db.query(UserWidget).filter(UserWidget.user_id == current_user["id"]).all()
@router.put("/{user_widget_id}", response_model=UserWidgetRead)
def update_user_widget(
    user_widget_id: int,
    update_data: UserWidgetUpdate,
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    user_widget = db.query(UserWidget).filter(
        UserWidget.id == user_widget_id,
        UserWidget.user_id == current_user["id"]
    ).first()

    if user_widget is None:
        raise HTTPException(status_code=404, detail="User widget setting not found")

    if update_data.enabled is not None:
        user_widget.enabled = update_data.enabled
    if update_data.style is not None:
        user_widget.style = update_data.style

    db.commit()
    db.refresh(user_widget)
    return user_widget


@router.get("/quotes")
def get_quote(db: Session = Depends(get_db)):
    quotes = db.query(Quote).all()
    if not quotes:
        raise HTTPException(status_code=404, detail="No quotes found")
    
    selected = random.choice(quotes)
    return {
        "text": selected.text,
        "author": selected.author or "Unknown"
    }

@router.patch("/order")
def update_widget_order(
    updates: list[WidgetOrderUpdate],
    db: Session = Depends(get_db),
    current_user = Depends(get_current_user)
):
    for update in updates:
        user_widget = db.query(UserWidget).filter_by(
            id=update.id,
            user_id=current_user["id"]
        ).first()

        if user_widget:
            user_widget.position = update.position
    db.commit()
    return {"message": "Widget updated"}
