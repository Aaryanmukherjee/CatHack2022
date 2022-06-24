from flask import Flask, redirect, session, request, jsonify, send_from_directory
from flask_restful import Api, Resource, reqparse
#from flask_cors import CORS #comment this on deployment

from validate_email_address import validate_email
from flask_cors import CORS, cross_origin
from flask_session import Session
import datetime
import dynamodb_handler
from flask_mail import *
from random import *
# from app import app
from validate_email_address import validate_email
from flask_socketio import SocketIO, emit
from flask_login import LoginManager, logout_user


app = Flask(__name__, static_url_path='', static_folder='frontend/build')
app.config['MAIL_SERVER']='smtp.mailtrap.io'
app.config['MAIL_PORT'] = 2525
app.config['MAIL_USERNAME'] = 'bdf508ef969ff3'
app.config['MAIL_PASSWORD'] = 'be45ecdec2e16e'
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['CORS_HEADERS'] = 'Content-Type'
app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'



#CORS(app) #comment this on deployment
api = Api(app)
mail = Mail(app)
server_session = Session(app)
socketio = SocketIO(app)


import re
regex = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'

def check(email):

    # pass the regular expression
    # and the string into the fullmatch() method
    if(re.fullmatch(regex, email)):
        return True

    else:
        return False


@socketio.on('disconnect')
def disconnect_user():
    logout_user()
    session.pop('email')
    session.pop('role')


@app.route("/clear", methods=['GET'])
def serve():
    session.clear()
    return {'message':'cleared'}


@app.route("/dashboard",methods=['GET'])
def get_current_user():
    email = session.get("email")
    role = session.get("role")

    if not email:
        return jsonify({"error": "Unauthorized"}), 401

    return jsonify({
        "email": email,
        "role": role
    })

@app.route('/index', methods=['POST'])
def index():
    json = request.json
    if 'otp' in json:
        realOtp = session.get("otp")
        userOtp = json['otp']
        print(userOtp)
        print(realOtp)
        if int(userOtp) == realOtp:
            now = datetime.datetime.now()
            date_time = now.strftime("%m/%d/%Y, %H:%M:%S")
            dynamodb_handler.updatelog(json['email'], date_time)

            res = dynamodb_handler.GetUser(json['email'])
            print(res)
            if 'Item' in res and 'email' in res['Item']:
                session["email"] = json['email']
                session["role"] = res['Item']['role']

            return jsonify({
                'status': 'authenticated'
            })
        else:
            return jsonify({
                'status': 'wrong_otp'
            }), 500
    if 'email' in json:
        userEmail = json['email']
        print (check(userEmail))
        if check(userEmail):
            session['otp'] = randint(100000,999999)
            msg = Message('OTP',sender = '176ca7a4c9-97c23c+1@inbox.mailtrap.io', recipients = [userEmail])
            msg.body = str(session.get("otp"))
            mail.send(msg)
            return jsonify({
                'status': 'requested_otp'
            })
        else:
            return jsonify({
                'status': 'invalid_email'
            })
    else:
        return jsonify({
            'status': 'requested_email'
        })


@app.route("/get_users",methods=['GET'])
def get_users():

    res = dynamodb_handler.scan_user()

    return jsonify(res['Items'])

@app.route("/get_assets",methods=['GET'])
def get_assets():

    res = dynamodb_handler.scan_machine_data()

    return jsonify(res['Items'])


@app.route("/add_user",methods=['POST'])
def add_user():
    json = request.json
    user = json['email']
    role = json['role']

    #aws stuff
    dynamodb_handler.addUser(user,'caterpillar', '',role)

    return jsonify({
        'status':'updated',
        'message':(user + " updated to have role: " + role)
    })

@app.route("/update_user",methods=['POST'])
def update_user():
    json = request.json
    user = json['email']
    role = json['role']
    print(user)
    print(role)


    #aws stuff
    dynamodb_handler.UpdateUserRole(user,role)

    return jsonify({
        'status':'updated',
        'message':(user + " updated to have role: " + role)
    })

@app.route("/delete_user",methods=['POST'])
def delete_user():
    json = request.json
    user = json['email']

    #aws stuff
    dynamodb_handler.DeleteUser(user)

    return jsonify({
        'status':'deleted',
        'message':(user + " deleted ")
    })


# @app.route('/dash', methods=['POST'])s
# def dashboard():
#     return jsonify({})
@app.route("/test", defaults={'path':''}, methods = ['POST'])
def test(path):
    return {
      'resultStatus': 'SUCCESS',
      'message': "test"
      }

# api.add_resource(HelloApiHandler, '/flask/hello')
# api.add_resource(SignInHandler, '/index')

