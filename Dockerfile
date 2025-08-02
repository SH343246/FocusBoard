
FROM node:20-alpine AS frontend-build
WORKDIR /frontend
COPY focusboard-frontend/ .
RUN npm ci
RUN npm run build          

FROM python:3.11-slim AS backend
ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1

WORKDIR /app

RUN apt-get update \
 && apt-get install -y build-essential libpq-dev gcc \
 && rm -rf /var/lib/apt/lists/*

COPY backend/requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY backend/ .                      

COPY --from=frontend-build /frontend/dist ./static

ENV FRONTEND_DIST=static

EXPOSE 8000
CMD ["sh","-c","uvicorn app.main:app --host 0.0.0.0 --port ${PORT:-8000}"]
