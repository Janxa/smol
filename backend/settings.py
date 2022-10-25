import os
from dotenv import load_dotenv

load_dotenv()

class mongo_config():
    MONGO_URL=os.getenv('MONGO_URL')
    DB_NAME=os.getenv('DB_NAME')
class app_config():
    DOMAIN_NAME=os.getenv("DOMAIN_NAME")    
    MAIL_PASSWORD = os.getenv("PASSWORD")
    MAIL_SERVER="smtp.protonmail.com"
    MAIL_PORT = 465
    MAIL_USERNAME = os.getenv("CONTACT_EMAIL")
    MAIL_DEFAULT_SENDER=os.getenv("CONTACT_EMAIL")
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True