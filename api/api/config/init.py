from dotenv import load_dotenv
from flask import Flask

from api.config.error import errors
from api.controllers.routes import register_routes
from api.config.db.db_init import initialize_database

def init_app():
    load_dotenv()

    initialize_database()

    app = Flask(__name__)
    register_routes(app)
    app.register_blueprint(errors)
    return app