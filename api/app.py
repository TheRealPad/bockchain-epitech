from api.config.init import init_app
import os

app = init_app()

if __name__ == '__main__':
    port = int(os.getenv('FLASK_RUN_PORT', 8000))
    app.run(port=port, debug=os.getenv('FLASK_DEBUG', 'False') == 'True', use_reloader=os.getenv('FLASK_DEBUG', 'False') == 'True')
