from flask import Blueprint, current_app, make_response, request
from .services import send_contact_email


contact = Blueprint('contact',__name__, url_prefix='/api/contact')

@contact.route('/send',methods=['POST'])
def sendmail():
    data = request.get_json()
    if not data:
        return make_response({"error": "Invalid or missing JSON in request"}, 400)

    mail_content, mail_sender = data.get('mail_content'), data.get('mail_sender')

    if not mail_content or not mail_sender:
        return make_response({"error": "Missing mail_content or mail_sender"}, 400)

    try:
        send_contact_email(mail_content, mail_sender)
        return make_response("Email Successfully Sent", 200)

    except ValueError as error:
        return make_response(str(error), 413)

    except Exception as error:
        current_app.logger.exception(f'Error in send_contact_email: {error}')
        return make_response("Something went wrong", 500)