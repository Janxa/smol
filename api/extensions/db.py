from api.settings import mongo_config
from pymongo import MongoClient

mongo_db = MongoClient(mongo_config.MONGO_URL).get_database(mongo_config.DB_NAME)