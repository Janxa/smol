from flask import Blueprint, request, make_response, current_app

from .services import delete_url, generate_url

shortner = Blueprint('shortner',__name__, url_prefix='/api/shortner')

@shortner.route('/generate', methods=['POST'])
def generate():
    try:
        data = request.get_json()
        long_url = data['url']
        alias = data['alias']
        allow_mod = data['allowMod']
        generated_url = generate_url(long_url, alias, allow_mod)

        return make_response({'urls': generated_url}, 200)

    except KeyError as e:
        current_app.logger.exception(f'Exception when extracting data from request: {request} \n missing field: {e}')
        return make_response({"error": f"Missing field: {e}"}, 400)

    except NameError:
        return make_response({"error": "Alias already taken"}, 409)

    except Exception as e:
        current_app.logger.exception('Exception when generating url', e)
        return make_response({"error": "Server error, try again later"}, 500)


@shortner.route('/delete',methods=['DELETE'])
def delete():
    data = request.get_json()
    try:
        delete_url(data["short"])
        return make_response({"success": "Url deleted successfully"}, 200)

    except Exception as e:
        current_app.logger.exception('Exception when deleting url', e)
        return make_response({"error": "Server error, try again later"}, 500)

