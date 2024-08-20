# seeds/tables.py
from sqlalchemy.sql import text
from random import choice
from app.models import Pin, db, Comment, environment, SCHEMA
from .seed_data import (
    users_list,
    pin_image_urls,
    comments,
    pin_titles,
    pin_descriptions,
)


def check_list_lengths():
    """Check that all lists are the same length"""
    list_lengths = [
        len(pin_image_urls),
        len(comments),
        len(pin_titles),
        len(pin_descriptions),
    ]
    if len(set(list_lengths)) != 1:
        raise ValueError("All seed data lists must be the same length")


try:
    check_list_lengths()
    print("All seed lists are the same length, proceeding with seeding")
except ValueError as e:
    print(f"Error: {e}")
    print("Aborting seed process")


def seed_pins():
    """Seeds the pins table"""
    for i in range(len(pin_titles)):
        # print(f"Seeding pin {i + 1}")
        i = i - 1
        print(f"i is {i + 1}")
        pin = Pin(
            ownerId=choice(range(1, len(users_list) + 1)),
            image=pin_image_urls[i],
            title=pin_titles[i],
            description=pin_descriptions[i],
        )
        db.session.add(pin)
    db.session.commit()


def seed_comments():
    """Seeds the comments table"""
    for i in range(len(comments)):
        comment = Comment(
            pinId=f"{i + 1}",
            comment=comments[i],
        )
        db.session.add(comment)
    db.session.commit()


# Uses a raw SQL query to TRUNCATE or DELETE the users table. SQLAlchemy doesn't
# have a built in function to do this. With postgres in production TRUNCATE
# removes all the data from the table, and RESET IDENTITY resets the auto
# incrementing primary key, CASCADE deletes any dependent entities.  With
# sqlite3 in development you need to instead use DELETE to remove all data and
# it will reset the primary keys for you as well.
def undo_pins():
    if environment == "production":
        db.session.execute(f"TRUNCATE table {SCHEMA}.pins RESTART IDENTITY CASCADE;")
    else:
        db.session.execute(text("DELETE FROM pins"))

    db.session.commit()


def undo_comments():
    if environment == "production":
        db.session.execute(
            f"TRUNCATE table {SCHEMA}.comments RESTART IDENTITY CASCADE;"
        )
    else:
        db.session.execute(text("DELETE FROM comments"))

    db.session.commit()
