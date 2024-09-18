from flask import Response, current_app, make_response
from flask_mail import Message
from api.extensions import mail
from api.settings import app_config


def send_contact_email(content: str, sender: str) -> None:
    subject = f"New email from {app_config.DOMAIN_NAME}'s contact form!"

    if len(content) > 10000:
        raise ValueError("Mail too long")

    message = Message(
        subject,
        sender=current_app.config["MAIL_DEFAULT_SENDER"],
        recipients=[current_app.config["MAIL_DEFAULT_SENDER"]],
    )
    message.body = f"Message sent by {sender}\n\n{content}"
    mail.send(message)
