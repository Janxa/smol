from flask import Blueprint, make_response, current_app

from api.errors import AliasAlreadyExistsError
from api.utils import validate_request_data

from .services import  generate_url
from api.db import delete_url

shortner = Blueprint('shortner',__name__, url_prefix='/api/shortner')

@shortner.route('/generate', methods=['POST'])
def generate_short_url():
    """Generate a short URL from a long URL."""
    try:
        request_data = validate_request_data(["url"])

        long_url = request_data["url"]
        custom_alias = request_data.get("alias", "")
        allow_modification = request_data.get("allowMod", False)

        generated_url = generate_url(long_url, custom_alias, allow_modification)

        return make_response({"urls": generated_url}, 200)

    except KeyError as error:
        return make_response({"error": error}, 400)

    except AliasAlreadyExistsError as error:
        return make_response({"error": error}, 409)

    except Exception as error:
        current_app.logger.exception('Exception when generating url', error)
        return make_response({"error": "Server error, try again later"}, 500)


@shortner.route('/delete',methods=['DELETE'])
def delete():
    """Deletes a URL by its short form."""
    try:
        request_data = validate_request_data(["short"])
        delete_url(request_data["short"])
        return make_response({"success": "Url deleted successfully"}, 200)

    except KeyError as error:
        return make_response({"error": {error}}, 400)

    except Exception as e:
        current_app.logger.exception('Exception when deleting url', e)
        return make_response({"error": "Server error, try again later"}, 500)

