from flask import Flask, request
from backend.extensions import url_collection 
from backend.shortner.shortner import shortner
from backend.redirect.redirect import redirection
from backend.extensions import mail
def create_app() :
    app = Flask(__name__)
    app.config.from_object('backend.settings.app_config')
    mail.init_app(app)
    # app.register_blueprint(mail)
    app.register_blueprint(shortner)
    app.register_blueprint(redirection)
    return app
