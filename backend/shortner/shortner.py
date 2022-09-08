from flask import Flask, request, Blueprint
import secrets
from backend.extensions import url_col

shortner = Blueprint('shortner',__name__, url_prefix='/shortner')
@shortner.route('',methods=['POST'])
def get_urls():
    x = request.get_json()
    long,alias = x['long'],x['alias']
    generate_url( long,alias)
    return x 

def generate_url(long,alias=''):
    if alias == '':
        short = "http://smol/" + secrets.token_urlsafe(7)
        url_col.insert_one({short:long})
    else:
        short= 'http://smol/'+alias
        url_col.insert_one({short:long})
    print(short)
    return
