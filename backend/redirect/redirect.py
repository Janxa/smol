from flask import Blueprint,redirect
from backend.services import get_long_url

redirection = Blueprint('redirect',__name__, url_prefix='/')
@redirection.route('/<short>',methods=['GET'])

def redirection_url(short):
    long = get_long_url(short)
    print(long)
    return redirect(long,code=302)