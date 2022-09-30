"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token,JWTManager,get_jwt, get_jwt_identity,jwt_required,JWTManager
import redis

app = Flask(__name__)
app.config["JWT_SECRET_KEY"] = "super-secret" 
api = Blueprint('api', __name__)
jwt=JWTManager(app)




jwt_redis_blocklist = redis.StrictRedis(
    host="localhost", port=6379, db=0, decode_responses=True
)



@jwt.token_in_blocklist_loader
def check_if_token_is_revoked(jwt_header, jwt_payload: dict):
    jti = jwt_payload["jti"]
    token_in_redis = jwt_redis_blocklist.get(jti)
    return token_in_redis is not None

@api.route("/logout", methods=["DELETE"])
@jwt_required()
def logout():
    jti = get_jwt()["jti"]
    jwt_redis_blocklist.set(jti, "", ex=360)
    return jsonify(msg="Access token revoked")




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




@api.route("/protected", methods=["POST"])
@jwt_required()
def protected():

    print("hola")
    current_user_id = get_jwt_identity()
    user = User.query.get(current_user_id)
    print (user.serialize())
    return jsonify({"id": user.id, "email": user.email }), 200