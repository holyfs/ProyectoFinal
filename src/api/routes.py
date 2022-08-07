"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint, current_app
from api.models import db, User, Instruments, Genre, Generos_user, Instruments_user, Images, Images_user
from api.utils import generate_sitemap, APIException
import bcrypt
from flask_jwt_extended import create_access_token
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required
from flask import Flask
from sqlalchemy.exc import IntegrityError
import cloudinary
import cloudinary.uploader
import cloudinary.api
import random
from flask_mail import Mail, Message

from datetime import timedelta
delta = timedelta(
    days=50,
    seconds=27,
    microseconds=10,
    milliseconds=29000,
    minutes=5,
    hours=8,
    weeks=2
)

cloudinary.config( 
  cloud_name = "facemusic", 
  api_key = "216346968812243", 
  api_secret = "mmzFZGFS-jRirON88rr7ZQ58Il4" 
)

api = Blueprint('api', __name__)
FORMAT_CODE = 'utf-8'

def upload_image():
    image_to_load= request.files["file"]
    result = cloudinary.uploader.upload(image_to_load)
    return result


@api.route('/image', methods=['POST'])
def add_image():
    image_name = upload_image()
    images=Images(
        name=image_name["url"],
        public_id=image_name["public_id"]
    )
    if images is None:
        raise APIException("Please insert an image", 404)
    db.session.add(images)
    db.session.commit()
    return jsonify(images.serialize(),201)

@api.route('/image', methods=['GET'])
def get_images():
    images = Images.query.all()
    if len(images) <= 0:
        raise APIException("no image, please enter an image", 404)
    all_images = list(map(lambda images: images.serialize(), images))    
    return jsonify(all_images),200
#Image methods by ID
@api.route('/image/<int:id>', methods=['GET'])
def get_image_by_id(id):
    images = Images.query.get(id)
    if images is None:
        raise APIException("image not found", 404)
    return jsonify(images.serialize()),200

@api.route('/image/<int:id>', methods=['DELETE'])
def delete_image_by_id(id):
    images = Images.query.get(id)
    if images is None:
        raise APIException("image not found", 404)
    cloudinary.uploader.destroy(images.public_id)
    db.session.delete(images)
    db.session.commit()
    res = {"msg":"image deleted"}
    return jsonify(res),200

#User images Methods
@api.route('/user/images', methods=['POST'])
def add_images_to_user():
    body = request.get_json()
    user_id=body["user_id"]
    images_user = Images_user (
        user_id=body["user_id"],
        image_id=body["image_id"]
        ) 
    try:
        db.session.add(images_user)
        db.session.commit()        
    except IntegrityError:
        db.session.rollback()
        return jsonify("user or image not found"),500
    res = {"msg":"image added"}
    return jsonify(res),200

#USER MUSIC INSTRUMENT GET
@api.route('/user/<int:user_id>/images', methods=['GET'])
def get_user_image(user_id):
    images_user = Images_user.query.filter_by(user_id=user_id).all()
    if len(images_user) <= 0:
        raise APIException("user not found", 500)
    all_images = list(map(lambda image: image.serialize(), images_user))
    return jsonify(all_images),200
#USER MUSIC INSTRUMENT DELETE
@api.route('/user/image/delete', methods=['DELETE'])
def delete_user_image():
    body = request.get_json()
#revisar este if
    if body is None:
        raise APIException("user not found", 404)
    else: images_user = Images_user.query.filter((Images_user.user_id==body["user_id"]) & (Images_user.image_id==body["image_id"])).first()
    if images_user is None:
        raise APIException("images not found", 404)
    db.session.delete(images_user)
    db.session.commit()
    res = {"msg":"image deleted"}
    return jsonify(res),200


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200
    
    
#USER METHODS
@api.route('/signup', methods=['POST'])
def add_user():
    image_to_load = request.files['file']
    result = cloudinary.uploader.upload(image_to_load)
    url = result["url"]
    password = request.form["password"]
    name = request.form["name"]
    last_name = request.form["last_name"]
    email = request.form["email"]
    age = request.form["age"]
    description = request.form["description"]
    artist_name_or_band_name = request.form["artist_name_or_band_name"]    
    band=request.form["band"]
    if band == 'true':
        band = True
    else:
        band = False
    experience=request.form["experience"]
    if experience == 'true':
        experience = True
    else:
        experience = False 
    hashed = bcrypt.hashpw(password.encode(FORMAT_CODE), bcrypt.gensalt())
    exist_user = User.query.filter_by(email=email).first()
    if exist_user:
        return jsonify({"msg":"Email ya esta registrado"}),500  
    user = User(
        name=name,
        last_name=last_name,
        email=email,
        password=hashed.decode(FORMAT_CODE),
        age=age,
        description=description,
        artist_name_or_band_name =artist_name_or_band_name,
        band=band,
        experience=experience,
        avatar=url,
    )
    db.session.add(user)
    db.session.commit()   
    response=jsonify(user.serialize())
    return jsonify(user.serialize()),201

#GET ALL USERS - LIST
# @api.route('/user', methods=['GET'])
# def get_users():
#     users = User.query.all()
#     if len(users) <= 0:
#         raise APIException("no user, please enter a valid user", 404)
#     all_users = list(map(lambda user: user.serialize(), users))    
#     return jsonify(all_users),200

# @api.route('/user', methods=['GET'])
# def get_users():

#     users = User.query.all()
#     all_users=list(map(lambda users: users.serialize(), users))
#     if len(users) <= 0:
#         raise APIException("no user, please enter a valid user", 404)
#     generos_user = Generos_user.query.all()
#     all_genres=list(map(lambda genre: genre.serialize_search(), generos_user))
#     instruments_user = Instruments_user.query.all()
#     all_instruments=list(map(lambda instrument: instrument.serialize_search(), instruments_user))
#     new_list=[]
#     for user in all_users:
#         user_with_genre = list(filter(lambda ge: ge["user_id"] == user["id"], all_genres))
#         user_with_instruments = list(filter(lambda ge: ge["user_id"] == user["id"], all_instruments))
#         complete_user={
#             "user":user,
#             "genres":user_with_genre,
#             "instruments":user_with_instruments
#         }
#         new_list.append(complete_user)
#     result = {"msg": "ok",
#     "response": new_list} 
#     return jsonify(result),200




@api.route('/user', methods=['GET','POST'])
def search_users_filtered():
    if request.method == 'GET':
        instruments=""
        genres =""
    elif request.method == 'POST':    
        body = request.get_json()
        instruments=body["instruments"] 
        genres =body["genres"]

    users = User.query.all()
    if len(users) <= 0:
        raise APIException("no users", 404)
    
    if str(instruments)!="":
        instruments_user = Instruments_user.query.filter_by(instruments_id=instruments).all()    
    elif instruments=="":
        instruments_user = Instruments_user.query.all()

    if str(genres)!="":
        generos_user = Generos_user.query.filter_by(genre_id=genres).all() 
    elif str(genres)=="":
        generos_user = Generos_user.query.all()

    all_users=list(map(lambda users: users.serialize(), users))
    all_genres=list(map(lambda genre: genre.serialize_search(), generos_user))
    all_instruments=list(map(lambda instrument: instrument.serialize_search(), instruments_user))

    new_list=[]
    complete_user={}
    for user in all_users:
        user_with_genre = list(filter(lambda ge: ge["user_id"] == user["id"], all_genres))
        user_with_instruments = list(filter(lambda ge: ge["user_id"] == user["id"], all_instruments))
        if str(instruments)=="" and str(genres)=="":
             complete_user={
                "user":user,
                "genres":user_with_genre,
                "instruments":user_with_instruments
            }
        elif str(instruments)!="" and len(user_with_instruments) > 0: 
            complete_user={
                "user":user,
                "genres":user_with_genre,
                "instruments":user_with_instruments
            }
        elif str(genres)!="" and len(user_with_genre) > 0:
            complete_user={
                "user":user,
                "genres":user_with_genre,
                "instruments":user_with_instruments
            }
        else:
            continue
        new_list.append(complete_user)
    result = {"msg": "ok",
    "response": new_list} 
    return jsonify(result),200



#USER METHODS BY ID    
@api.route('/user/<int:id>', methods=['GET'])
def get_user_by_id(id):
    user = User.query.get(id)
    if user is None:
        raise APIException("user not found", 404)
    generos_user = Generos_user.query.filter_by(user_id=id).all()
    instruments_user = Instruments_user.query.filter_by(user_id=id).all()
    result = {"msg": "ok",
    "user":user.serialize(),
    "genres":list(map(lambda genre: genre.serialize_dropdown(), generos_user)),
    "instruments":list(map(lambda instrument: instrument.serialize_dropdown(), instruments_user))  
    }
    return jsonify(result),200    

@api.route('/user', methods=['PUT'])
@jwt_required()
def update_user_by_id():
    user = User.query.get(request.form["id"])
    user.name = request.form["name"]if request.form["name"] != "" else user.name
    user.last_name = request.form["last_name"]if request.form["last_name"] != "" else user.last_name
    user.age = request.form["age"]if request.form["age"] != "" else user.age
    user.description = request.form["description"]if request.form["description"] != "" else user.description
    user.band =True if request.form["band"]  == "true" else False
    user.experience =True if request.form["experience"]  == "true" else False
    user.artist_name_or_band_name = request.form["artist_name_or_band_name"]if request.form["artist_name_or_band_name"] != "" else user.artist_name_or_band_name
    instrumentos=request.form["instruments"].split(",") if request.form["instruments"]!="" else []
    genres=request.form["genres"].split(",") if request.form["genres"]!="" else []
    add_genre_to_user(user.id, genres)
    add_instrument_to_user(user.id, instrumentos) 
    try:    
        image_to_load = request.files['file']
        result = cloudinary.uploader.upload(image_to_load)
        user.avatar=result["url"] 
    except:
        print("imagen no se actualizo")
    if not user:
        return jsonify("user not found"), 404     
    db.session.commit()        
    return jsonify(user.serialize()),200

@api.route('/user/new-password', methods=['PUT'])
@jwt_required()
def user_new_password():
    user = User.query.get(request.form["id"])
    exist_user = User.query.filter(User.id==user.id).first()
    if not exist_user:
        return jsonify({"msg":"user not found"}), 404
    password=request.form["password"]
    if not bcrypt.checkpw(password.encode(FORMAT_CODE), user.password.encode(FORMAT_CODE)):
        return jsonify("bad password, try again"),404
    else: new_password = request.form["new_password"]
    hashed = bcrypt.hashpw(new_password.encode(FORMAT_CODE), bcrypt.gensalt())
    user.password = hashed.decode(FORMAT_CODE)
    if not user:
        return jsonify("user not found"),404
    db.session.commit()
    response_body = {
        "msg" : "password changed"
    } 
    return jsonify(response_body),200   
 
    

@api.route('/user/<int:id>', methods=['DELETE'])
@jwt_required()
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
    # Query your database for email and password
    user = User.query.filter_by(email=email).first()
    if user is None:
        # the user was not found on the database
        raise APIException("Bad username or password", 404)       
    if not bcrypt.checkpw(password.encode(FORMAT_CODE), user.password.encode(FORMAT_CODE)):
        raise APIException("Bad username or password", 404)

    data = {
        "id": user.id,
        'email': user.email,
        'name': user.name,
        'lastName': user.last_name
    }     
    access_token = create_access_token(identity=user.id, expires_delta=timedelta(minutes=120))
    return jsonify({ "token": access_token, "user_id": user.id })

#PRIVATE AREA
@api.route("/private", methods=["GET"])
@jwt_required(optional=True)
def protected():
    # Access the identity of the current user with get_jwt_identity
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
  
    return jsonify({"id": user.id, "email": user.email , "msg": "ok"}), 200


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
        
    all_instruments = list(map(lambda instrument: instrument.serialize_dropdown(), instruments))    
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
    db.session.add(genre)
    db.session.commit()
    response_body = {
        "msg" : "genre created",
        "user": genre.serialize()
    }
    return jsonify(response_body),201
#GET ALL GENRES - LIST
@api.route('/genre', methods=['GET'])
def get_genre():
    genres = Genre.query.all()
    if len(genres) <= 0:
        raise APIException("no genre, please enter a musical genre", 404)
    all_genres = list(map(lambda genre: genre.serialize_dropdown(), genres))    
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
def add_genre_to_user(user_id,list_of_genre):
    exist_genre = Generos_user.query.filter((Generos_user.user_id==user_id)).delete()
    db.session.commit()

    for genre in list_of_genre:
        if genre == "":
            continue
        generos_user = Generos_user (
            user_id=user_id,
            genre_id=genre
        )
        try:
            db.session.add(generos_user)
            db.session.commit()        
        except IntegrityError:
            db.session.rollback()
            return jsonify("user or instrument not found"),500  
    res = {"msg":"musical genre added"}
    return jsonify(res),200

#USER MUSICAL GENRE GET
@api.route('/user/<int:user_id>/genre', methods=['GET'])
def get_user_genre(user_id):
    generos_user = Generos_user.query.filter_by(user_id=user_id).all()
    if len(generos_user) <= 0:
        raise APIException("not user or genres found", 404)
    all_genres = list(map(lambda genre: genre.serialize(), generos_user))
    return jsonify(all_genres),200

# @api.route('/user/favorites', methods=['GET'])
# def get_user_instrument_genre():
#     # user_genre_instruments=RelacionUsuario(
         
#     #      id=User.id,
#     #      name=User.name,
#     # )
#     #, Genre.name,Instruments.name
#     user_genre_instruments = db.session.query(User.id, User.name,User.artist_name_or_band_name, User.avatar, User.experience, User.band, Genre.name, Instruments.name).join(Generos_user, Generos_user.user_id == User.id).join(Instruments_user, Instruments_user.user_id == User.id).all()
#     #user_genre_instruments = db.session.query(User.id, User.name, User.artist_name_or_band_name, User.avatar, User.experience, User.band,db.func.group_concat(Genre.name),db.func.group_concat( Instruments.name) ).outerjoin(Generos_user, Generos_user.user_id == User.id).outerjoin(Instruments_user, Instruments_user.user_id == User.id).filter( Genre.name, Instruments.name).group_by(User.id).all()
#     # user_genre_instruments =db.session.query(
#     # User.id,
#     # User.name,
#     # db.func.count(Genre.name),
#     # db.func.count(Instruments.name)
#     # ).filter(User.id, Generos_user.user_id, Instruments_user.user_id).group_by(User.id).all()
#     if len(user_genre_instruments) <= 0:
#         raise APIException("not user or genres found", 404)
#     all_genres = list(map(lambda row: convertidObj(row), user_genre_instruments))
#     return jsonify(all_genres),200

# def convertidObj(row):
#     print(row)
#     pepito=dict(
#         id=row.id,
#         name=row[1],
#         gnre=row[6],
#         intrument=row[7],
#         artist_name_or_band_name=row.artist_name_or_band_name, 
#         avatar=row.avatar,
#         experience=row.experience,
#         band =row.band,

#     )
#     print(pepito)
#     return pepito
# @api.route('/user/filterby/genre', methods=['GET'])
# def get_filterby_genre():
#     generos_user = Generos_user.query.order_by(Generos_user.user_id).all()
#     if len(generos_user) <= 0:
#         raise APIException("not user or genres found", 404)
#     all_genres = list(map(lambda genre: genre.serialize(), generos_user))
#     mydic = {}
#     for element in all_genres:
#        mydic[element["user"]["id"]]=5
# #       print(mydic)

#     return jsonify(all_genres),200


#USER MUSICAL GENRE DELETE
@api.route('/user/genre/delete', methods=['DELETE'])
def delete_user_genre():
    body = request.get_json()
    generos_user = Generos_user.query.filter((Generos_user.user_id==body["user_id"]) & (Generos_user.genre_id==body["genre_id"])).first()
    if generos_user is None:
        raise APIException("music genres or user not found", 404)
    db.session.delete(generos_user)
    db.session.commit()
    res = {"msg":"music genre deleted"}
    return jsonify(res),200

#USER MUSIC INSTRUMENT POST
#@api.route('/user/instrument', methods=['POST'])
def add_instrument_to_user(user_id,list_of_instruments):

    exist_instrument = Instruments_user.query.filter((Instruments_user.user_id==user_id)).delete()
    db.session.commit()
    for instrument in list_of_instruments:
        if instrument == "":
            continue
        instruments_user = Instruments_user (
        user_id=user_id,
        instruments_id=instrument
        )
        try:
            db.session.add(instruments_user)
            db.session.commit()        
        except IntegrityError:
            db.session.rollback()
            return jsonify("user or instrument not found"),500   
    
    res = {"msg":"OK"}
    return jsonify(res)

#USER MUSIC INSTRUMENT GET
@api.route('/user/<int:user_id>/instrument', methods=['GET'])
def get_user_instrument(user_id):
    instruments_user = Instruments_user.query.filter_by(user_id=user_id).all()
    if len(instruments_user) <= 0:
        raise APIException("music instruments or user not found", 400)
    all_instruments = list(map(lambda instrument: instrument.serialize(), instruments_user))
    return jsonify(all_instruments),200
#USER MUSIC INSTRUMENT DELETE
@api.route('/user/instrument/delete', methods=['DELETE'])
def delete_user_instrument():
    body = request.get_json()
#revisar este if
    instruments_user = Instruments_user.query.filter((Instruments_user.user_id==body["user_id"]) & (Instruments_user.instruments_id==body["instruments_id"])).first()
    if instruments_user is None:
        raise APIException("music instruments or user not found", 500)
    db.session.delete(instruments_user)
    db.session.commit()
    res = {"msg":"music instrument deleted"}
    return jsonify(res),200


#ENVIAR MAIL CON CAMBIO DE PASSWORD

def reset_password():
    password_choice = ["A","B","C","D","E","F","G","H","J","Q","K","1","2","3","4","5","6","7","8","9","l","m","n","o","p","q","r","s","t","u",".","<","#","@","-","_","/","&","%","$"]
    password_list= random.sample(password_choice, k=8)
    new_password = "".join(str(x) for x in password_list)
    print(new_password)
    return new_password


@api.route('/user/reset-password', methods=['PUT'])
def reset_user_password():
    mail = Mail(current_app)
    body=request.get_json()
    email = body["email"]
    exist_user = User.query.filter_by(email=email).first()
    if not exist_user:
        return jsonify({"msg":"Email is not registered"}), 404
    else:
        password = reset_password()
        hashed = bcrypt.hashpw(password.encode(FORMAT_CODE), bcrypt.gensalt())
    exist_user.password = hashed.decode(FORMAT_CODE)
    db.session.commit()
    msg = Message('Hello', sender='facemusicapp@gmail.com', recipients = [email])
    msg.body = 'This is your new password: ' + password
    mail.send(msg)
    return jsonify({"msg":"Password enviado"})


#ENVIAR MENSAJE DE CONTACTO AL USUARIO

@api.route('/sendmsg', methods=['POST'])
def send_Msg():
    mail = Mail(current_app)
    body= request.get_json()
    id = body["id_user"]
    user = User.query.filter_by(id=id).first()
    email = user.email
    name=body["name"]
    contact_email=body["contact_email"] 
    telefono=body["phone"]
    mensaje=body["mensaje"]
    body="Hola " + user.name + "\n" + "Tienes un posible nuevo cliente llamado: "+name+ "\n"+"Correo: "+contact_email+ "\n"+"Número de telefono: "+telefono+"\n"+"y te manda a decir: "+mensaje
    msg = Message('Alguien se quiere poner en contacto contigo', sender='facemusicapp@gmail.com', recipients = [email], body =body)
    mail.send(msg)
    return jsonify({"msg":"Mensaje enviado"})


if __name__ == '__main__':
   app.run(debug = True)
