

from flask import current_app, make_response
from api.extensions import db, mail
from api.settings import app_config
from flask_mail import  Message

def get_long_url(short):
    domain_name=(current_app.config['DOMAIN_NAME'])
    url_collection = db['shortner']
    url_object = url_collection.find_one({"short":domain_name+'/'+short})
    if url_object is not None:
        return url_object['long']
    else:
        return "Url not found"
def delete_url(short):
    url_collection = db['shortner']
    try :
        res = url_collection.find_one_and_delete({"short":short})
        print(res)
        if res is not None :
            return make_response("Success",200)
        else :
            return make_response("Url already deleted or does not exist",200)
    except Exception as  error:
        return make_response(error,400)

def send_contact_email(mail_content,mail_sender):
    email_object = f"New e-mail from {app_config.DOMAIN_NAME}'s contact form !"
    try:
        if len(mail_content) > 10000:
           raise Exception("Mail too long")

        msg = Message(email_object,sender =current_app.config["MAIL_DEFAULT_SENDER"],recipients = [current_app.config["MAIL_DEFAULT_SENDER"]])
        msg.body = f"""message sent by {mail_sender}
                        {mail_content}"""
        mail.send(msg)
        return  make_response("Email Successfully Sent",200)
    except Exception as  error:
        return make_response(str(error),400)