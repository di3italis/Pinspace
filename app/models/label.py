# models/labels.py
"""Model definitions"""

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Label(db.Model):
    """Describes labels (tags) table. Each Pin has 0 or more labels."""

    __tablename__ = "labels"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(15), nullable=False)

    pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    pin = relationship("Pin", back_populates="labels")
