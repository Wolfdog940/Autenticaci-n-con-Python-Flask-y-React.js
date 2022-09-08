"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException

api = Blueprint('api', __name__)


@api.route('/hello', methods=['POST','GET'])
def nuevo_registro():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200


@api.route('/users', methods=['GET'])
def get_users():
    users_list = User.query.all()
    users_list= [user.serialize() for user in users_list]
    
    return jsonify(users_list), 200

@api.route('/registro',methods=['POST'])
def post_registro():
    valores=request.get_json()
    password=valores.get('password')
    usuario =User.query.filter_by(email=valores.get('email')).first()
    if usuario is not None :
        return 'El usuario ya existe',404
    
    new_user = User(email=valores.get('email'),password=password,is_active=True)

    db.session.add(new_user)
    db.session.commit()
    return jsonify(new_user.serialize()),200

@api.route('/login', methods=['POST'])
def create_token():
    email = request.json.get("email", None)
    password = request.json.get("password", None)
    
    user = User.query.filter_by(email=email, password=password).first()
    
    if user is None :
        return jsonify({"msg": "Bad username or password"}), 403
    
    
  
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })