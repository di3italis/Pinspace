from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from sqlalchemy.orm import relationship
from .db import db, environment, SCHEMA


class User(db.Model, UserMixin):
    __tablename__ = "users"

    if environment == "production":
        __table_args__ = {"schema": SCHEMA}

    id = db.Column(db.Integer, primary_key=True)
    first_name = db.Column(db.String(20), nullable=False)
    last_name = db.Column(db.String(50), nullable=False)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(255), nullable=False)
    profile_image = db.Column(db.String(255), nullable=False)

    pins = relationship("Pin", back_populates="owner")
    boards = relationship("Board", back_populates="owner")

    @property
    def password(self):
        """returns the hashed password"""
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        """verifies the password matches the hashed password"""
        return check_password_hash(self.password, password)

    def to_dict(self, show_pins=True):
        """dict of self"""
        dict_ = {
            "id": self.id,
            "username": self.username,
            "email": self.email,
        }
        if show_pins:
            dict_["pins"] = [pin.to_dict() for pin in self.pins] if self.pins else None
        return dict_
        # return {
        #     'id': self.id,
        #     'username': self.username,
        #     'email': self.email,
        #     # Can't recursively call owner to pin to owner to pin etc....
        #     'pins': [pin.to_dict() for pin in self.pins] if show_pins and self.pins else None
        # }

        # 'owner': self.owner.to_dict() if self.owner else None,
