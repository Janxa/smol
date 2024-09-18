from flask import Blueprint, make_response, request
from .services import send_contact_email


contact = Blueprint('contact',__name__, url_prefix='/api/contact')

@contact.route('/send',methods=['POST'])
def sendmail():
    data = request.get_json()
    if not data:
        return make_response({"error": "Invalid or missing JSON in request"}, 400)

    mail_content, mail_sender = data['mail_content'],data['mail_sender']
    return send_contact_email(mail_content,mail_sender)