from pymongo import MongoClient
from flask_mail import Mail
from api.settings import mongo_config

mail = Mail()

mongo_db = MongoClient(mongo_config.MONGO_URL).get_database(mongo_config.DB_NAME)
url_collection=mongo_db.get_collection('shortner')


