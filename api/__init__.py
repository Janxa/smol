from flask import Flask
from api.contact.contact import contact
from api.shortner.shortner import shortner
from api.redirect.redirect import redirection
from api.extensions import mail


def create_app() :

    app = Flask(__name__,static_folder="../build", static_url_path='/')
    app.config.from_object('api.settings.app_config')
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