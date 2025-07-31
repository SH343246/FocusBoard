from app.db    import SessionLocal
from app.models import User, Widget, UserWidget

db = SessionLocal()

for widget in db.query(Widget).all():
    exists = db.query(UserWidget).filter_by(
        user_id=User.id, widget_id=widget.id
    ).first()

    if not exists:
        db.add(
            UserWidget(
                user_id=User.id,
                widget_id=widget.id,
                enabled=False  
            )
        )
db.commit()
