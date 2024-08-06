# models/board_pin.py
"""Model definitions"""

from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod


class BoardPin(db.Model):
    """Describes board_pins table. Each board has 0 or more pins"""

    __tablename__ = "board_pins"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # Will have to test this. Not sure if this should be relationshipped.
    # Should pinID be linked? or just straight integer.
    # pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    # pin = relationship("Pin", back_populates="pins")
    pinId = db.Column(db.Integer, nullable=False)

    boardId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("boards.id")))
    board = relationship("Board", back_populates="board_pins")

    def to_dict(self):
        """dict of BoardPin"""
        return {"id": self.id, "pinId": self.pinId, "boardId": self.boardId}
