from flask import Blueprint, current_app, make_response

from api.errors import MailTooLongError
from api.utils import validate_request_data
from .services import send_contact_email


contact = Blueprint('contact',__name__, url_prefix='/api/contact')

@contact.route('/send',methods=['POST'])
def sendmail():

    try:
        request_data = validate_request_data(["mail_content", "mail_sender"])
        mail_content, mail_sender = request_data.get('mail_content'), request_data.get('mail_sender')
        send_contact_email(mail_content, mail_sender)
        return make_response("Email Successfully Sent", 200)

    except KeyError as error:
        return make_response({"error": {error} }, 400)

    except MailTooLongError as error:
        return make_response({"error": error }, 413)

    except Exception as error:
        current_app.logger.exception(f'Error in send_contact_email: {error}')
        return make_response({"error": "Something went wrong"}, 500)