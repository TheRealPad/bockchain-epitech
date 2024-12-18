from flask import Blueprint

health_routes = Blueprint('health_routes', __name__)

@health_routes.route('/health')
def health():
    return 'App is healthy'
