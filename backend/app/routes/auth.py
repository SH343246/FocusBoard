import os
from dotenv import load_dotenv
load_dotenv()
from utils.jwt_handler import create_access_token

from sqlalchemy.orm import Session
from fastapi import Depends
from app.models import User
from app.database import get_db  

from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Request
import os

router = APIRouter()
oauth = OAuth()

oauth.register(
    name='google',
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    access_token_url='https://accounts.google.com/o/oauth2/token',
    authorize_url='https://accounts.google.com/o/oauth2/auth',
    api_base_url='https://www.googleapis.com/oauth2/v1/',
    userinfo_endpoint='https://openidconnect.googleapis.com/v1/userinfo',
    client_kwargs={'scope': 'openid email profile'},
)

@router.get("/auth/google")
async def login(request: Request):
    redirect_uri = os.getenv("GOOGLE_REDIRECT_URI")
    return await oauth.google.authorize_redirect(request, redirect_uri)




@router.get("/auth/google/callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)
    user_info = await oauth.google.parse_id_token(request, token)

    email = user_info["email"]
    name = user_info.get("name")
    user = db.query(User).filter(User.email == email).first()

    if not user:
        user = User(email=email, name=name)
        db.add(user)
        db.commit()
        db.refresh(user)

    access_token = create_access_token(data={"sub": user.email, "id": user.id})

    redirect_url = f"http://localhost:5173/auth/callback?token={access_token}"
    return RedirectResponse(url=redirect_url)
