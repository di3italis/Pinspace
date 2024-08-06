# models/comment.py
"""Model definitions"""

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Comment(db.Model):
    """Describes comment table. Each Pin has 0 or more comments."""

    __tablename__ = "comments"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(250), nullable=False)

    pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    pin = relationship("Pin", back_populates="comments")

    def to_dict(self):
        """dict of Comment"""
        return {
            "id": self.id,
            "comment": self.comment,
            "pinId": self.pinId,
            # "pin": self.pin.to_dict() if self.pin else self.pin,
        }
