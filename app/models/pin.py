# models/pin.py
"""Model definitions"""

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Pin(db.Model):
    """Describes pins table"""

    __tablename__ = "pins"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)

    ownerId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    owner = relationship("User", back_populates="pins")

    comments = relationship("Comment", back_populates="pin")
    labels = relationship("Label", back_populates="pin")

    def to_dict(self):
        """dict of Pin"""
        return {
            "id": self.id,
            "image": self.image,
            "title": self.title,
            "description": self.description,
            "owner": self.owner.to_dict(show_pins=False) if self.owner else None,
            # 'comments': self.comments.to_dict() if self.comments else None,
            "comments": [comment.to_dict() for comment in self.comments]
            if self.comments
            else None,
            "labels": self.labels.to_dict() if self.labels else None,
            # 'owner': self.owner.to_dict() if self.owner else Noneself.owner,
            # 'comments': self.comments.to_dict() if self.comments else self.comments,
            # 'labels': self.labels.to_dict() if self.labels else self.labels
        }
