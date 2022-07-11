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
            "name":self.name,
            "last_name":self.last_name,
            "age":self.age,
            "band":self.band,
            "description":self.description,
            "experience":self.experience,
            "artist_name_or_band_name":self.artist_name_or_band_name
            # do not serialize the password, its a security breach
        }

class Instruments(db.Model):
    __tablename__ = 'Instruments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)

    def repr(self):
        return f'<Instruments {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
    
class Genre(db.Model):
    __tablename__ = 'Genre'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)

    def repr(self):
        return f'<Genre {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }

class Instruments_user(db.Model):
    __tablename__ = 'Instruments_user'
    id = db.Column(db.Integer, primary_key=True)
    instruments_id = db.Column(db.Integer, db.ForeignKey('Instruments.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    instrument = db.relationship(Instruments)
    user = db.relationship(User)
    def repr(self):
        return f'<Instruments_user {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "Instruments_user": self.name
        }

class Generos_user(db.Model):
    __tablename__ = 'Genre_user'
    id = db.Column(db.Integer, primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('Genre.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('User.id'))
    genre = db.relationship(Genre)
    user = db.relationship(User)
    def repr(self):
        return f'<Generos_user {self.name}>'

    def serialize(self):
        return {
            "id": self.id,
            "Generos_user": self.name
        }

