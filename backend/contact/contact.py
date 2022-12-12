from flask import Blueprint,request
from backend.services import send_contact_email


contact = Blueprint('contact',__name__, url_prefix='/contact')
@contact.route('/send',methods=['POST'])

def sendmail():
    x = request.get_json()
    mail_content,mail_sender = x['mail_content'],x['mail_sender']
    res = send_contact_email(mail_content,mail_sender)
    return res