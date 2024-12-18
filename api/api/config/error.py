from flask import jsonify, Blueprint

errors = Blueprint('errors', __name__)

@errors.app_errorhandler(404)
def not_found_error(e):
    return jsonify({"error": "Resource not found", "status_code": 404}), 404

@errors.app_errorhandler(500)
def internal_error(e):
    return jsonify({"error": "Internal server error", "status_code": 500}), 500