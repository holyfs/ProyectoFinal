
import click
from api.models import db, User, Instruments, Genre
from flask import Flask, request, jsonify, url_for, send_from_directory


"""
In this file, you can add as many commands as you want using the @app.cli.command decorator
Flask commands are usefull to run cronjobs or tasks outside of the API but sill in integration 
with youy database, for example: Import the price of bitcoin every night as 12am
"""

def setup_commands(app):
    
    """ 
    This is an example command "insert-test-users" that you can run from the command line
    by typing: $ flask insert-test-users 5
    Note: 5 is the number of users to add
    """
    @app.cli.command("insert-test-users") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        # db.create_all()

        print("Creating test users")
        for x in range(1, int(count) + 1):
            user = User()
            user.email = "test_user" + str(x) + "@test.com"
            user.password = "123456"
            user.name = "pepe"
            user.last_name = "perez"
            user.band = True
            user.description = "hola"
            user.experience = True
            user.age = 20
            user.artist_name_or_band_name = "pepito"
            db.session.add(user)
            db.session.commit()
            print("User: ", user.email, " created.")


    print("All test users created")
    
    instruments = ['saxophone', 'flute', 'clarinet', 'trumpet', 'oboe', 'trombone', 'guitar', 'piano', 'organ', 'double bass', 'bass guitar', 'mandolin', 'sitar', 'harp', 'violin', 'viola', 'cello', 'cymbals', 'drums', 'cajon', 'djembe', 'bongos', 'congas' ,'tambourines' ,'cowbells' ,'timbales', 'gongs', 'claves', 'triangles', 'shakers' ,'kalimbas', 'guiros', 'rainsticks synth', 'electric guitar', 'electric bass guitar', 'electric harp', 'piano rhodes', 'electric violin']



    @app.cli.command("insert-instruments") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating instruments")
        for x in range(len(instruments)):
            
            Instruments.id = x+1 
            Instruments.name = instruments[x]
            db.session.add(Instruments)
            db.session.commit()
            print(" Instrument: ", Instruments.name , " created.")

        print("All test instruments created")
    
    genre = ['blues' , 'classic' , 'country' , 'dance' , 'electronic' , 'experimental' , 'folk' , 'jazz' , 'latin' , 'new age' , 'pop' , 'hip hop and rap' , 'rock' , 'r&b and soul' , 'reggae' , 'music of the world' ]

    @app.cli.command("insert-genre") # name of our command
    @click.argument("count") # argument of out command
    def insert_test_data(count):
        print("Creating genre")
        for x in range(len(genre)):
            
            Genre.id = x+1 
            Genre.name = genre[x]
            db.session.add(Genre)
            db.session.commit()
            print(" Genre: ", Genre.name , " created.")

        print("All test instruments created")