import secrets

from flask import make_response
from backend.settings import domain_name
from backend.extensions import url_collection


def generate_url(long,alias,allowMod):
    
    if alias == '':
        short = domain_name + secrets.token_urlsafe(7)
        while url_collection.find_one({"short":short}) != None:
            short = domain_name + secrets.token_urlsafe(7)
    else:
        short= domain_name+alias
        if url_collection.find_one({"short":short}) != None:
            print("invalid name, already taken")
            if allowMod==True:
                short = domain_name +alias+"/" +secrets.token_urlsafe(7)
            else:
                return 'error'
    url_collection.insert_one({"short":short,"long":long})
    return {"short":short,"long":long}
        
def get_long_url(short):
    print(short)
    url_object = url_collection.find_one({"short":domain_name+short})
    print(url_object)
    if url_object != None:
        return url_object['long']
    else:
        return "Url not found"
def delete_url(short):
    try :
        res = url_collection.find_one_and_delete({"short":short})
        print(res)
        if res !=  None :
            return make_response("Success",200)
        else :
            return make_response("Url already deleted or does not exist",200)
    except Exception as  error:
        return make_response(error,400)
        