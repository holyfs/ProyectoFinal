"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Instruments, Genre, Generos_user, Instruments_user
from api.utils import generate_sitemap, APIException
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask import Flask
from flask_mail import Mail, Message

app = Flask(__name__)
mail= Mail(app)

app.config['MAIL_SERVER']='smtp.gmail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USERNAME'] = 'facemusicapp@gmail.com'
app.config['MAIL_PASSWORD'] = 'FaceMusic123'
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True
mail = Mail(app)

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
    
#comentario prueba
#USER METHODS
@api.route('/signup', methods=['POST'])
def add_user():
    body = request.get_json(),
    user = User(
    name = body["name"],
    last_name = body["last_name"],
    email = body["email"],
    password=body["password"],
    re_password=body["re_password"],    
    age = body["age"],
    description = body["description"],
    artist_name_or_band_name = body["artist_name_or_band_name"],
    band = False,
    experience= False,
    avatar="url"
    )
    if re_password != password:
        raise APIException("Not same password, please check again!")
    db.session.add(user)
    db.session.commit()
#    response_body = {
#        "msg" : "user created",
#        "user": user.serialize()
#    }
    return jsonify(user.serialize()),201
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
    user.age=body["age"]
    user.description=body["description"]
    user.experience=body["experience"]
    user.artist_name_or_band_name=body["artist_name_or_band_name"]
    db.session.commit()        
    return jsonify(user.serialize()),200

#RESET PASSWORD
#@api.route('/user/<int:id>', methods=['GET'])
#def get_user_by_id(id):
#    user = User.query.get(id)
#    if user is None:
#        raise APIException("user not found", 404)
#    return jsonify(user.serialize()),200


@api.route('/user/<int:id>', methods=['DELETE'])
def delete_user_by_id(id):
    user = User.query.get(id)
    if user is None:
        raise APIException("user not found", 404)
    db.session.delete(user)
    db.session.commit()
    res = {"msg":"user deleted"}
    return jsonify(res),200

#LOGIN
@api.route("/login", methods=["POST"])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    if email != email:
        raise APIException("wrong email, please insert a valid email", 401)
    if password != password:
        raise APIException("wrong password, try again", 401)
    # Query your database for email and password
    user = User.query.filter_by(email=email, password=password).first()
    if user is None:
        # the user was not found on the database
        raise APIException("Bad username or password", 401)       
    # create a new token with the user id inside
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })

#PRIVATE AREA
@api.route("/private", methods=["GET"])
@jwt_required()
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)    
    return jsonify({"id": user.id, "email": user.email }), 200


#MUSICAL_INSTRUMENTS METHODS
@api.route('/instruments', methods=['POST'])
def add_instrument():
    body = request.get_json()
    instrument = Instruments(
    name = body["name"],
    )
    db.session.add(instrument)
    db.session.commit()
    response_body = {
        "msg" : "instrument created",
        "user": instrument.serialize()
    }
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
    genre = Genre(
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
    if len(genres) <= 0:
        raise APIException("no genre, please enter a musical genre", 404)
    all_genres = list(map(lambda genre: genre.serialize(), genres))    
    return jsonify(all_genres),200

#GENRE METHODS BY ID    
@api.route('/genre/<int:id>', methods=['GET'])
def get_genre_by_id(id):
    genre = Genre.query.get(id)
    if genre is None:
        raise APIException("genre not found", 404)
    return jsonify(genre.serialize()),200

@api.route('/genre/<int:id>', methods=['DELETE'])
def delete_genre_by_id(id):
    genre = Genre.query.get(id)
    if genre is None:
        raise APIException("genre not found", 404)
    db.session.delete(genre)
    db.session.commit()
    res = {"msg":"genre deleted"}
    return jsonify(res),200


#USER MUSICAL GENRE POST
@api.route('/user/genre', methods=['POST'])
def add_genre_to_user():
    body = request.get_json()
    generos_user = Generos_user (
        user_id=body["user_id"],
        genre_id=body["genre_id"]
        )
    db.session.add(generos_user)
    db.session.commit()
    res = {"msg":"musical genre added"}
    return jsonify(res),200
#USER MUSICAL GENRE GET
@api.route('/user/<int:user_id>/genre', methods=['GET'])
def get_user_genre(user_id):
    generos_user = Generos_user.query.filter_by(user_id=user_id).all()
    if len(generos_user) <= 0:
        raise APIException("not genres found", 404)
    all_genres = list(map(lambda genre: genre.serialize(), generos_user))
    return jsonify(all_genres),200
#USER MUSICAL GENRE DELETE
@api.route('/user/genre/delete', methods=['DELETE'])
def delete_user_genre():
    body = request.get_json()
    if body is None:
        raise APIException("user not found", 404)
    else: generos_user = Generos_user.query.filter((Generos_user.user_id==body["user_id"]) & (Generos_user.genre_id==body["genre_id"])).first()
    if generos_user is None:
        raise APIException("music genres not found", 404)
    db.session.delete(generos_user)
    db.session.commit()
    res = {"msg":"music genre deleted"}
    return jsonify(res),200

#USER MUSIC INSTRUMENT POST
@api.route('/user/instrument', methods=['POST'])
def add_instrument_to_user():
    body = request.get_json()
    user_id=body["user_id"]
    instruments_user = Instruments_user (
        user_id=body["user_id"],
        instruments_id=body["instruments_id"]
        )
    if body["user_id"] is None:
        raise APIException("user not found", 404)
    db.session.add(instruments_user)
    db.session.commit()
    res = {"msg":"music instrument added"}
    return jsonify(res),200
#USER MUSIC INSTRUMENT GET
@api.route('/user/<int:user_id>/instrument', methods=['GET'])
def get_user_instrument(user_id):
    instruments_user = Instruments_user.query.filter_by(user_id=user_id).all()
    if len(instruments_user) <= 0:
        raise APIException("music instruments not found", 400)
    all_instruments = list(map(lambda instrument: instrument.serialize(), instruments_user))
    return jsonify(all_instruments),200
#USER MUSIC INSTRUMENT DELETE
@api.route('/user/instrument/delete', methods=['DELETE'])
def delete_user_instrument():
    body = request.get_json()
#revisar este if
    if body is None:
        raise APIException("user not found", 404)
    else: instruments_user = Instruments_user.query.filter((Instruments_user.user_id==body["user_id"]) & (Instruments_user.instruments_id==body["instruments_id"])).first()
    if instruments_user is None:
        raise APIException("music instruments not found", 404)
    db.session.delete(instruments_user)
    db.session.commit()
    res = {"msg":"music instrument deleted"}
    return jsonify(res),200

#ENVIO DE EMAIL
@app.route("/mail")
def index():
   msg = Message('Hello', sender = 'facemusicapp@gmail.com', recipients = ['facemusicapp@gmail.com'])
   msg.body = "Hello Flask message sent from Flask-Mail"
   mail.send(msg)
   return "Sent"

if __name__ == '__main__':
   app.run(debug = True)
