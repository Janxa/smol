from flask import Blueprint, request,current_app
from backend.services import generate_url ,delete_url
from backend.extensions import url_collection

from datetime import datetime


shortner = Blueprint('shortner',__name__, url_prefix='/api/shortner')
@shortner.route('/generate',methods=['POST'])

def generate():
    x = request.get_json()
    long_url,alias,allowMod,time = x['url'],x['alias'],x['allowMod'],datetime.utcnow()
    generated_url=generate_url(long_url,alias,allowMod,time)
    return generated_url, 200

# @shortner.route('/retrieve',methods=['GET'])

# def retrieve_url():
#     x = request.get_json()
#     long,alias = x['url'],x['alias']
#     response  = url_collection.find_one()
#     return response

@shortner.route('/delete',methods=['DELETE'])
def delete():
    x = request.get_json()
    response = delete_url(x["short"])
    return response
