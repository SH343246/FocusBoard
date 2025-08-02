from app.db import SessionLocal
from app.models import User, Widget, UserWidget

db = SessionLocal()

user = db.query(User).first()

if not user:
    raise Exception("No user found — make sure a user exists before seeding widgets.")

for widget in db.query(Widget).all():
    exists = db.query(UserWidget).filter_by(
        user_id=user.id, widget_id=widget.id
    ).first()

    if not exists:
        db.add(
            UserWidget(
                user_id=user.id,
                widget_id=widget.id,
                enabled=False  
            )
        )

db.commit()
db.close()
print(" Seeded UserWidgets")
