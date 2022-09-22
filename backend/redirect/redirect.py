from flask import Blueprint,redirect,make_response
from backend.services import get_long_url

redirection = Blueprint('redirect',__name__, url_prefix='/redirect')
@redirection.route('/<short>',methods=['GET'])

def redirection_url(short):
    long = get_long_url(short)
    print(long)
    if long == "Url not found":
        response = make_response(long,404)
    else:
        response = make_response(long)
        response.headers.add("Access-Control-Allow-Origin", "*")
    print(response)
    return response