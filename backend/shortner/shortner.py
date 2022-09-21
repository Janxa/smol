from flask import Blueprint, request
from backend.services import generate_url 
from backend.extensions import url_col

shortner = Blueprint('shortner',__name__, url_prefix='/shortner')
@shortner.route('/generate',methods=['POST'])

def generate():
    x = request.get_json()
    long_url,alias,allowMod = x['url'],x['alias'],x['allowMod']
    generated_url=generate_url(long_url,alias,allowMod)
    return generated_url, 200

@shortner.route('/retrieve',methods=['GET'])

def retrieve_url():
    x = request.get_json()
    long,alias = x['url'],x['alias']
    response  = url_col.find_one()
    return response