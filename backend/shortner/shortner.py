from genericpath import exists
from flask import Flask, request, Blueprint
import secrets
from backend.extensions import url_col

shortner = Blueprint('shortner',__name__, url_prefix='/shortner')
@shortner.route('',methods=['POST'])
def get_urls():
    x = request.get_json()
    long,alias,allowMod = x['url'],x['alias'],x['allowMod']
    short  = generate_url( long,alias,allowMod)
    return short

def generate_url(long,alias='',allowMod=False):
    if alias == '':
        short = "http://smol/" + secrets.token_urlsafe(7)
        url_col.insert_one({short:long})
    else:
        short= 'http://smol/'+alias
        if url_col.find_one({short: {'$exists':True}}) != None:
            print("invalid name already taken")
            if allowMod==True:
                short = "http://smol/" +alias+"/" +secrets.token_urlsafe(7)
                url_col.insert_one({short:long})
            else:
                return 'error'
        else:
            url_col.insert_one({short:long})
    print(short)
    return short
