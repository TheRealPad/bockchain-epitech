from dotenv import load_dotenv
from flask import Flask

from api.config.error import errors
from api.controllers.routes import register_routes


def init_app():
    load_dotenv()

    app = Flask(__name__)
    register_routes(app)
    app.register_blueprint(errors)
    return app