from flask import Blueprint, current_app, redirect, make_response

from api.db import find_url

redirection = Blueprint('redirect', __name__, url_prefix='/api/redirect')

@redirection.route('/<short>', methods=['GET'])
def redirection_url(short: str):
    try:
        domain_name=(current_app.config['DOMAIN_NAME'])
        url_object = find_url(domain_name+'/'+short)
        if url_object and url_object['long']:
            response = redirect(url_object['long'])
            response.headers.add("Access-Control-Allow-Origin", "*")
            return response
        else:
            return make_response({"error": "URL not found"}, 404)

    except Exception as error:
        current_app.logger.exception('Exception when redirecting', error)
        return make_response({"error": "Server error, try again later"}, 500)
