from flask import Flask, current_app
from backend.contact.contact import contact
from backend.shortner.shortner import shortner
from backend.redirect.redirect import redirection
from backend.extensions import mail
from flask_mail import Mail


def create_app() :
    app = Flask(__name__,static_folder="../build", static_url_path='/')
    app.config.from_object('backend.settings.app_config')
    mail.init_app(app)
    app.register_blueprint(contact)
    app.register_blueprint(shortner)
    app.register_blueprint(redirection)
    @app.route('/')
    def index():
        return app.send_static_file('index.html')
    @app.route('/<path>')
    def renderindex(path):
        return app.send_static_file('index.html')
    return app
