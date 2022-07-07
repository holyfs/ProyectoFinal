"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

#USER METHODS
@api.route('/signup', methods=['POST'])
def add_user():
    body = request.get_json()
    user = User(
    name = body["name"],
    last_name = body["last_name"],
    email = body["email"],
    password=body["password"],    
    age = body["age"],
    description = body["description"],
    artist_name_or_band_name = body ["artist_name_or_band_name"],
    band = False
    )
    response_body = {
        "msg" : "user created",
        "user": user.serialize()
    }
    db.session.add(user)
    db.session.commit()
    return jsonify(response_body),201
#GET ALL USERS - LIST
@api.route('/user', methods=['GET'])
def get_users():
    users = User.query.all()
    if len(users) <= 0:
        raise APIException("no user, please enter user, 401")
    all_users = list(map(lambda user: user.serialize(), users))    
    return jsonify(all_users),200

#USER METHODS BY ID    
@api.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    if user is None:
        raise APIException("user not found", 404)
    return jsonify(user.serialize()),200

@api.route('/user/<int:id>', methods=['PUT'])
def update_user_by_id(id):
    user = User.query.get(id)
    body= request.get_json()
    if user is None:
        raise APIException("user not found", 404)
    user.name = body["name"]
    user.last_name = body["last_name"]
    user.email= body["email"]
    user.password=body["password"],    
    user.age=body["age"]
    user.description=body["description"]
    user.experience=body["experience"]
    user.artist_name_or_band_name=body["artist_name_or_band_name"]
    db.session.commit()        
    return jsonify(user.serialize()),200

@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user_by_id(id):
    user = User.query.get(id)
    if user is None:
        raise APIException("user not found", 404)
    db.session.delete(user)
    db.session.commit()
    res = {"msg":"user deleted"}
    return jsonify(res),200


#MUSICAL_INSTRUMENTS METHODS
@api.route('/instruments', methods=['POST'])
def add_instrument():
    body = request.get_json()
    instrument = Instruments(
    name = body["name"],
    )
    response_body = {
        "msg" : "instrument created",
        "user": instrument.serialize()
    }
    db.session.add(instrument)
    db.session.commit()
    return jsonify(response_body),201
#GET ALL INSTRUMENTS - LIST
@api.route('/instruments', methods=['GET'])
def get_instruments():
    instruments = Instruments.query.all()
    if len(instruments) <= 0:
        raise APIException("no instruments, please enter a musical instrument, 401")
    all_instruments = list(map(lambda instrument: instrument.serialize(), instruments))    
    return jsonify(all_instruments),200

#INSTRUMENTS METHODS BY ID    
@api.route('/instruments/<int:id>', methods=['GET'])
def get_instrument_by_id(id):
    instrument = Instruments.query.get(id)
    if instrument is None:
        raise APIException("instrument not found", 404)
    return jsonify(instrument.serialize()),200

@api.route('/instruments/<int:id>', methods=['DELETE'])
def delete_instrument_by_id(id):
    instrument = Instruments.query.get(id)
    if instrument is None:
        raise APIException("instrument not found", 404)
    db.session.delete(instrument)
    db.session.commit()
    res = {"msg":"instrument deleted"}
    return jsonify(res),200

#MUSICAL GENRE METHODS
@api.route('/genre', methods=['POST'])
def add_musical_genre():
    body = request.get_json()
    genre = Genres(
    name = body["name"],
    )
    response_body = {
        "msg" : "genre created",
        "user": genre.serialize()
    }
    db.session.add(genre)
    db.session.commit()
    return jsonify(response_body),201
#GET ALL GENRES - LIST
@api.route('/genre', methods=['GET'])
def get_genre():
    genres = Genre.query.all()
    if len(genre) <= 0:
        raise APIException("no genre, please enter a musical genre, 401")
    all_genres = list(map(lambda genre: genre.serialize(), genres))    
    return jsonify(all_genres),200

#GENRE METHODS BY ID    
@api.route('/genre/<int:id>', methods=['GET'])
def get_genre_by_id(id):
    genre = Genres.query.get(id)
    if genre is None:
        raise APIException("genre not found", 404)
    return jsonify(genre.serialize()),200

@api.route('/genre/<int:id>', methods=['DELETE'])
def delete_genre_by_id(id):
    genre = Genres.query.get(id)
    if genre is None:
        raise APIException("genre not found", 404)
    db.session.delete(genre)
    db.session.commit()
    res = {"msg":"genre deleted"}
    return jsonify(res),200