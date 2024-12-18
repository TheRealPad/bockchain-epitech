from flask import Blueprint

authentication_routes = Blueprint('authentication_routes', __name__)

@authentication_routes.route('/login', methods=['POST'])
def login():
    return 'login'

@authentication_routes.route('/register', methods=['POST'])
def register():
    return 'register'
