from flask import Flask
from flask_sqlalchemy import SQLAlchemy
db = SQLAlchemy()
class User(db.Model):
    __tablename__ = 'user'
    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(250), unique=False, nullable=False)
    name = db.Column(db.String(80), unique=False, nullable=False)
    last_name = db.Column(db.String(80), unique=False, nullable=False)
    age = db.Column(db.Integer)
    band = db.Column(db.Boolean(), nullable=False)
    description = db.Column(db.String(250), unique=False, nullable=False)
    avatar = db.Column(db.String(700), unique=False, nullable=False)
    experience = db.Column(db.Boolean(), nullable=False)
    artist_name_or_band_name = db.Column(db.String(120), unique=False, nullable=False)
    def repr(self):
        return '<User %r>' % self.name
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "name":self.name,
            "last_name":self.last_name,
            "age":self.age,
            "band":self.band,
            "description":self.description,
            "avatar":self.avatar,
            "experience":self.experience,
            "artist_name_or_band_name":self.artist_name_or_band_name,
            # do not serialize the password, its a security breach
        }
class Instruments(db.Model):
    __tablename__ = 'instruments'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    def repr(self):
        return '<Instruments %r>' % self.name
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
class Genre(db.Model):
    __tablename__ = 'genre'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(250), nullable=False)
    def repr(self):
        return '<Genre %r>' % self.name
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
class Instruments_user(db.Model):
    __tablename__ = 'instruments_user'
    id = db.Column(db.Integer, primary_key=True)
    instruments_id = db.Column(db.Integer, db.ForeignKey('instruments.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    instrument = db.relationship('Instruments')
    user = db.relationship('User')
    def repr(self):
        return '<Instruments_user %r>' % self.name
    def serialize(self):
        return {
            "user": self.user.serialize(),
            "instrument":self.instrument.serialize(),
        }
class Generos_user(db.Model):
    __tablename__ = 'generos_user'
    id = db.Column(db.Integer, primary_key=True)
    genre_id = db.Column(db.Integer, db.ForeignKey('genre.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    genre = db.relationship('Genre')
    user = db.relationship('User')
    def repr(self):
        return '<Generos_user %r>' % self.name
    def serialize(self):
        return {
            "user": self.user.serialize(),
            "genre":self.genre.serialize()
        }
class Images(db.Model):
    __tablename__ = 'images'
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(700), nullable=False)
    def repr(self):
        return '<Images %r>' % self.name
    def serialize(self):
        return {
            "id": self.id,
            "name": self.name
        }
class Images_user(db.Model):
    __tablename__ = 'images_user'
    id = db.Column(db.Integer, primary_key=True)
    image_id = db.Column(db.Integer, db.ForeignKey('images.id'))
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'))
    image = db.relationship('Images')
    user = db.relationship('User')
    def repr(self):
        return '<Images_user %r>' % self.name
    def serialize(self):
        return {
            "user": self.user.serialize(),
            "image":self.image.serialize()
        }