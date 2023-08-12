from flask import Blueprint, request,make_response
from backend.services import generate_url ,delete_url
from backend.extensions import url_collection

from datetime import datetime


shortner = Blueprint('shortner',__name__, url_prefix='/api/shortner')

@shortner.route('/generate',methods=['POST'])
def generate():
    x = request.get_json()
    long_url,alias,allowMod,time = x['url'],x['alias'],x['allowMod'],datetime.utcnow()
    try:
      generated_url=generate_url(long_url,alias,allowMod,time)
    except NameError:
        return make_response({"error":"Name already taken"},409)
    except Exception:
            return ({"error":"Server error, try again later"},500)
    return make_response({'urls':generated_url}, 200)



@shortner.route('/delete',methods=['DELETE'])
def delete():
    x = request.get_json()
    response = delete_url(x["short"])
    return response
