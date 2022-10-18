from flask import Flask, request
from backend.extensions import url_collection
from backend.shortner.shortner import shortner
from backend.redirect.redirect import redirection

def create_app() :
    app = Flask(__name__)
    app.register_blueprint(shortner)
    app.register_blueprint(redirection)
    return app
