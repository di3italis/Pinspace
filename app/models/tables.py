"""Model definitions"""

# from flask_sqlalchemy import SQLAlchemy
# from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

# imgbb.com


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
            'id': self.id,
            'image': self.image,
            'title': self.title,
            'description': self.description,
            'owner': self.owner.to_dict(show_pins=False) if self.owner else None,
            'comments': self.comments.to_dict() if self.comments else None,
            'labels': self.labels.to_dict() if self.labels else None
            # 'owner': self.owner.to_dict() if self.owner else Noneself.owner,
            # 'comments': self.comments.to_dict() if self.comments else self.comments,
            # 'labels': self.labels.to_dict() if self.labels else self.labels
        }


class Board(db.Model):
    """Describes boards table"""

    __tablename__ = "boards"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), nullable=False)

    ownerId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    owner = relationship("User", back_populates="boards")

    boardPins = relationship("BoardPin", back_populates="board")

    def to_dict(self):
        """dict of Board"""
        return {
            "id": self.id,
            "description": self.description,
            "owner": self.owner.to_dict() if self.owner else None,
            "comments": self.boardPins.to_dict() if self.boardPins else None,
        }


class BoardPin(db.Model):
    """Describes boardPins table. Each board has 0 or more pins"""

    __tablename__ = "boardPins"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    # Will have to test this. Not sure if this should be relationshipped.
    # Should pinID be linked? or just straight integer.
    # pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    # pin = relationship("Pin", back_populates="pins")
    pinId = db.Column(db.Integer, nullable=False)

    boardId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("boards.id")))
    board = relationship("Board", back_populates="boardPins")


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
            "pin": self.pin.to_dict() if self.pin else self.pin,
        }


class Label(db.Model):
    """Describes labels (tags) table. Each Pin has 0 or more labels."""

    __tablename__ = "labels"
    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(15), nullable=False)

    pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    pin = relationship("Pin", back_populates="labels")
