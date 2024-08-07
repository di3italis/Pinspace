# models/boards.py
"""Model definitions"""

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class Board(db.Model):
    """Describes boards table"""

    __tablename__ = "boards"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), nullable=False)

    ownerId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    owner = relationship("User", back_populates="boards")

    board_pins = relationship("BoardPin", back_populates="board")

    def to_dict(self):
        """dict of Board"""
        return {
            "id": self.id,
            "description": self.description,
            "owner": self.owner.to_dict() if self.owner else None,
            # "comments": self.board_pins.to_dict() if self.board_pins else None,
        }
