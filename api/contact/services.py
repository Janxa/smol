from flask import Response, current_app, make_response
from flask_mail import Message
from api.extensions import mail
from api.settings import app_config


def send_contact_email(content: str, sender: str) -> Response:
    subject = f"New email from {app_config.DOMAIN_NAME}'s contact form!"

    try:
        if len(content) > 10000:
            raise ValueError("Mail too long")

        message = Message(
            subject,
            sender=current_app.config["MAIL_DEFAULT_SENDER"],
            recipients=[current_app.config["MAIL_DEFAULT_SENDER"]],
        )
        message.body = f"Message sent by {sender}\n\n{content}"
        mail.send(message)

        return make_response("Email Successfully Sent", 200)

    except ValueError as error:
        return make_response(str(error), 413)

    except Exception as error:
        current_app.logger.exception(f'Error in send_contact_email: {error}')
        return make_response("Something went wrong", 500)
