from sqlalchemy.sql import text
from app.models import Pin, db, Comment, environment, SCHEMA


# Adds demo info to any tables we want to seed
def seed_tables():
    """Seeds the additional tables"""
    pin1 = Pin(
        ownerId="1",
        image="https://i.ibb.co/2tTmr1B/1.jpg",
        title="demo title",
        description="demo descrip",
    )
    pin2 = Pin(
        ownerId="2",
        image="https://i.ibb.co/mBb3fjc/2.jpg",
        title="demo title",
        description="demo descrip",
    )
    pin3 = Pin(
        ownerId="3",
        image="https://i.ibb.co/0KzTh3p/3.jpg ",
        title="demo title",
        description="demo descrip",
    )
    comment1 = Comment(
        # userId="1",
        pinId="1",
        comment="demo comment 1",
    )
    comment2 = Comment(
        # userId="2",
        pinId="2",
        comment="demo comment 1",
    )
    comment3 = Comment(
        # userId="3",
        pinId="3",
        comment="demo comment 1",
    )
    db.session.add(comment1)
    db.session.add(comment2)
    db.session.add(comment3)
    db.session.add(pin1)
    db.session.add(pin2)
    db.session.add(pin3)
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
