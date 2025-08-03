# backend/app/routes/auth.py
import os, secrets
from fastapi import APIRouter, Request, Depends, HTTPException
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from authlib.integrations.starlette_client import OAuth

from app.db import get_db
from app.models import User, Widget, UserWidget
from utils.jwt_handler import create_access_token, create_refresh_token
from jose import JWTError, jwt
if not os.getenv("RENDER"):
    from dotenv import load_dotenv
    load_dotenv()

router = APIRouter()
oauth = OAuth()
oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile",
        "prompt": "consent",
        "access_type": "offline",
    },
)

@router.get("/auth/google")
async def login(request: Request):
    nonce = secrets.token_urlsafe(16)       
    request.session["nonce"] = nonce
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI")
    return await oauth.google.authorize_redirect(
        request,
        redirect_uri,
        # nonce=nonce,         
        prompt="consent",    
        access_type="offline",
    )



@router.get("/auth/google/callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    print("OAuth token:", token)

    print("OAuth token response:", token)
    if "access_token" not in token:
        raise HTTPException(status_code=400, detail="Missing access token from Google")
    if "refresh_token" not in token:
        print(" No refresh token returned — check if prompt='consent' + access_type='offline' were set.")

    user_info = token["userinfo"]  
    if not user_info:
        raise HTTPException(status_code=400, detail="Missing user info from Google")

    email = user_info["email"]
    name  = user_info.get("name")

    user = db.query(User).filter(User.email == email).first()
    if not user:
        user = User(email=email, name=name)
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token  = create_access_token(data={"sub": user.email, "id": user.id})
    refresh_token = create_refresh_token(data={"sub": user.email, "id": user.id})

    frontend_redirect = os.getenv("FRONTEND_REDIRECT_URI")
    redirect_url = (
    f"{frontend_redirect}?access_token={access_token}&refresh_token={refresh_token}"
)

    print("Redirecting to:", redirect_url)

    widgets = db.query(Widget).all()
    for widget in widgets:
        existing = (
            db.query(UserWidget)
            .filter_by(user_id=user.id, widget_id=widget.id)
            .first()
        )

        if not existing:
            user_widget = UserWidget(
                user_id=user.id,
                widget_id=widget.id,
                enabled=False,
                position=None,
                style=None,
            )
            db.add(user_widget)

    db.commit()


SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

@router.post("/api/refresh")
async def refresh_access_token(payload: dict):
    rt = payload.get("refresh_token")
    if not rt:
        raise HTTPException(status_code=400, detail="refresh_token required")

    try:
        data = jwt.decode(rt, SECRET_KEY, algorithms=[ALGORITHM])
    except JWTError:
        raise HTTPException(status_code=401, detail="bad refresh token")

    if data.get("type") != "refresh":
        raise HTTPException(status_code=401, detail="not a refresh token")

    user_id = data.get("id")
    user_email = data.get("sub")
    if not user_id or not user_email:
        raise HTTPException(status_code=401, detail="bad refresh token")

    new_access = create_access_token(data={"sub": user_email, "id": user_id})
    return {"access_token": new_access}




  