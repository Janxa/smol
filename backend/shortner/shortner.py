from genericpath import exists
from flask import Flask, request, Blueprint,make_response
import secrets
from backend.extensions import url_col
from backend.settings import domain_name

shortner = Blueprint('shortner',__name__, url_prefix='/shortner')
@shortner.route('/generate',methods=['POST'])

def generate_url():
    x = request.get_json()
    long,alias,allowMod = x['url'],x['alias'],x['allowMod']
    if alias == '':
        short = domain_name + secrets.token_urlsafe(7)
        url_col.insert_one({short:long})
    else:
        short= domain_name+alias
        if url_col.find_one({short: {'$exists':True}}) != None:
            print("invalid name already taken")
            if allowMod==True:
                short = domain_name +alias+"/" +secrets.token_urlsafe(7)
                url_col.insert_one({short:long})
            else:
                return 'error'
        else:
            
            url_col.insert_one({short:long})
    print("inserted" ,long, " as = >",short, " and its _id is",url_col.find_one({short: {'$exists':True}})['_id'])
    response = make_response({long:short},200)
    print('response',response)
    return response

@shortner.route('/retrieve',methods=['GET'])

def retrieve_url():
    x = request.get_json()
    long,alias = x['url'],x['alias']
    response  = url_col.find_one()
    return response