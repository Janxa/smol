from flask import Flask, request
from backend.extensions import url_col
from backend.shortner.shortner import shortner

def create_app() :
    app = Flask(__name__)
    app.register_blueprint(shortner)
    return app
