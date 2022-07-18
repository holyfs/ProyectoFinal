from flask import Flask, request, jsonify, url_for, Blueprint
import cloudinary
import cloudinary.uploader
import cloudinary.api

cloudinary.config( 
  cloud_name = "facemusic", 
  api_key = "216346968812243", 
  api_secret = "mmzFZGFS-jRirON88rr7ZQ58Il4" 
)

def upload_image():
    image_to_load =  request.files["file"]

    if image_to_load:
        resutl = cloudinary.uploader.upload(image_to_load)
        url= result["url"]

    return url