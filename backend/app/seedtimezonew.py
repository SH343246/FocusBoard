from app.db import SessionLocal
from app.models import Widget

db = SessionLocal()

timezone = Widget(name="timezone", description="Displays the current time for a timezone")

db.add(timezone)
db.commit()
db.close()
