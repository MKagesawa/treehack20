import datetime

from flask import Flask
from flask import g
from flask import redirect
from flask import request
from flask import session
from flask import url_for, abort, render_template, flash
from flask import jsonify
from functools import wraps
from hashlib import md5

from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp

import model

def hash(plaintext):
    return md5(password).hexdigest()

def authenticate(username, password):
    user = model.User.get_or_none(email=username)
    if user and safe_str_cmp(user.password.encode('utf-8'), hash(password).encode('utf-8')):
        return user

def identity(payload):
    user_id = payload['identity']
    return model.User.get(id=user_id)

DEBUG = True
SECRET_KEY = 'secret'

app = Flask(__name__)
app.config.from_object(__name__)

jwt = JWT(app, authenticate, identity)

@app.errorhandler(404)
def resource_not_found(e):
    return jsonify(error=str(e)), 404

@app.before_request
def before_request():
    g.db = model.database
    g.db.connect()

@app.after_request
def after_request(response):
    g.db.close()
    return response

@app.route('/requests', methods=['GET'])
def requests():
    return jsonify(list(model.Request.select().dicts()))

@app.route('/requests/<id>', methods=['GET'])
def requests_one(id):
    try:
        data = jsonify(model.Request.select().where(model.Request.id == id).dicts().get())
    except model.Request.DoesNotExist as e:
        abort(404, description='no such request with id')

    return data

@app.route('/requests/<id>/fulfill', methods=['GET', 'POST'])
def requests_fulfill(id):
    try:
        req = model.Request.get(id=id)
    except model.Request.DoesNotExist as e:
        abort(404, description='no such request with id')

    with g.db.atomic():
        pass

@app.route('/requests/<id>/receive', methods=['GET', 'POST'])
def requests_receive():
    pass


# allow running from the command line
if __name__ == '__main__':
    #create_tables()
    app.run()
