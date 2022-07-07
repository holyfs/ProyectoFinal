from flask import Flask
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class User(db.Model):
    __tablename__ = 'User'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(80), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column (db.Integer)
    band = db.Column(db.Boolean(), nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    experience = db.Column(db.Boolean(), nullable=False)
    artist_name_or_band_name = db.Column(db.String(120), unique=False, nullable=False)


    def repr(self):
        return f'<User {self.email}>'

    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            # do not serialize the password, its a security breach
        }