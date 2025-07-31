from app.db import SessionLocal
from app.models import Quote

db = SessionLocal()

quotes = [
    {"text": "Be yourself; everyone else is already taken.", "author": "Oscar Wilde"},
    {"text": "You miss 100% of the shots you don’t take.", "author": "Wayne Gretzky"},
    {"text": "The journey of a thousand miles begins with one step.", "author": "Lao Tzu"},
    {"text": "In the middle of every difficulty lies opportunity.", "author": "Albert Einstein"},
]

for q in quotes:
    db.add(Quote(**q))

db.commit()
db.close()
