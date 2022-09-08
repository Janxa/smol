from pymongo import MongoClient
from backend.settings import mongo_url,db_name
mongo_db = MongoClient(mongo_url).get_database(db_name)

url_col=mongo_db.get_collection('shortner')


