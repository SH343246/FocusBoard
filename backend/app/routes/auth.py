import os, secrets
from dotenv import load_dotenv
load_dotenv()
from utils.jwt_handler import create_access_token, create_refresh_token
from fastapi.responses import RedirectResponse
from sqlalchemy.orm import Session
from fastapi import Depends
from app.models import User
from app.db import get_db  

from authlib.integrations.starlette_client import OAuth
from fastapi import APIRouter, Request
import os

router = APIRouter()
oauth = OAuth()

oauth.register(
    name="google",
    client_id=os.getenv("GOOGLE_CLIENT_ID"),
    client_secret=os.getenv("GOOGLE_CLIENT_SECRET"),
    server_metadata_url="https://accounts.google.com/.well-known/openid-configuration",
    client_kwargs={
        "scope": "openid email profile",
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
        nonce=nonce,         
        prompt="consent",    
    )



@router.get("/auth/google/callback")
async def auth_callback(request: Request, db: Session = Depends(get_db)):
    token = await oauth.google.authorize_access_token(request)

    print("OAuth token response:", token)
    if "access_token" not in token:
        raise HTTPException(status_code=400, detail="Missing access token from Google")
    if "refresh_token" not in token:
        print(" No refresh token returned — check if prompt='consent' + access_type='offline' were set.")

    user_info = token["userinfo"]    
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

    redirect_url = (
        "http://localhost:5173/auth/callback"
        f"?access_token={access_token}&refresh_token={refresh_token}"
    )
    print("Redirecting to:", redirect_url)



    return RedirectResponse(redirect_url)


