import os
from datetime import datetime, timedelta
from jose import jwt, JWTError
from dotenv import load_dotenv, dotenv_values   

SECRET_KEY = os.getenv("SECRET_KEY")
if not SECRET_KEY:
    available = ', '.join(dotenv_values().keys())
    raise RuntimeError(
        "SECRET_KEY not found. .env contains: "
        f"{available or '[empty]'}"
    )
ALGORITHM = os.getenv("JWT_ALGORITHM", "HS256")

def create_access_token(data: dict, expires_delta: timedelta = timedelta(minutes=45)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def create_refresh_token(data: dict, expires_delta: timedelta = timedelta(days=30)):
    to_encode = data.copy()
    expire = datetime.utcnow() + expires_delta
    to_encode.update({"exp": expire, "type": "refresh"})
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    return token

def decode_access_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload 
    except JWTError:
        raise JWTError("Token is invalid/expired.")

def decode_refresh_token(token: str):
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        if payload.get("type") != "refresh":
            raise JWTError("Invalid refresh token type.")
        return payload
    except JWTError:
        raise JWTError("Refresh token is invalid/expired.")