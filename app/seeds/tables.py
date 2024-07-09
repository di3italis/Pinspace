from sqlalchemy.sql import text
from app.models import Pin, db, User, environment, SCHEMA

# Adds demo info to any tables we want to seed
def seed_tables():
    '''Seeds the additional tables'''
    pin1 = Pin(ownerId='1', image='None', title='demo title', description='demo descrip');

    db.session.add(pin1)
    db.session.commit()

# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_tables():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()
