from sqlalchemy import create_engine, text

DATABASE_URL = "postgresql://slimethoughts:@localhost/focusboard"

engine = create_engine(DATABASE_URL)

with engine.connect() as connection:
    try:
        connection.execute(text("ALTER TABLE habits ADD COLUMN completed BOOLEAN DEFAULT FALSE;"))
        print("worked")
    except Exception as e:
        print("error", e)
