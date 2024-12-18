from flask import Flask
from api.controllers.authentication import authentication_routes
from api.controllers.health import health_routes
from api.controllers.token import token_routes

CUSTOM_PREFIX = "/api"

def register_routes(app: Flask):
    app.register_blueprint(health_routes, url_prefix=CUSTOM_PREFIX)
    app.register_blueprint(authentication_routes, url_prefix=CUSTOM_PREFIX)
    app.register_blueprint(token_routes, url_prefix=CUSTOM_PREFIX)