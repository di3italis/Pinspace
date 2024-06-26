'''Model definitions'''
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash
from sqlalchemy import ForeignKey
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA, add_prefix_for_prod

# imgbb.com

class Pin(db.Model):
    '''Describes pins table'''
    __tablename__ = 'pins'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    image = db.Column(db.String(255), nullable=False)
    title = db.Column(db.String(150), nullable=False)
    description = db.Column(db.String(500), nullable=False)

    ownerId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    owner = relationship("User", back_populates="pins")

    comments = relationship("Comment", back_populates="pin")
    labels = relationship("Label", back_populates="pin")

class Board(db.Model):
    '''Describes boards table'''
    __tablename__ = 'boards'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    description = db.Column(db.String(500), nullable=False)

    ownerId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("users.id")))
    owner = relationship("User", back_populates="pins")

    boardPins = relationship("BoardPin", back_populates="board")

class BoardPin(db.Model):
    '''Describes boardPins table. Each board has 0 or more pins'''
    __tablename__ = 'boardPins'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)

    #Will have to test this. Not sure if this should be relationshipped.
    # Should pinID be linked? or just straight integer.
    # pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    # pin = relationship("Pin", back_populates="pins")
    pinId = db.Column(db.Integer, nullable=False)

    boardId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("boards.id")))
    board = relationship("Board", back_populates="boardPins")

class Comment(db.Model):
    '''Describes comment table. Each Pin has 0 or more comments.'''
    __tablename__ = 'comments'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    comment = db.Column(db.String(250), nullable=False)

    pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    pin = relationship("Pin", back_populates="comments")

class Label(db.Model):
    '''Describes labels (tags) table. Each Pin has 0 or more labels.'''
    __tablename__ = 'labels'
    if environment == "production":
        __table_args__ = {'schema': SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    label = db.Column(db.String(15), nullable=False)

    pinId = db.Column(db.Integer, ForeignKey(add_prefix_for_prod("pins.id")))
    pin = relationship("Pin", back_populates="labels")
