import secrets
from backend.settings import domain_name
from backend.extensions import url_col


def generate_url(long,alias,allowMod):
    
    if alias == '':
        short = domain_name + secrets.token_urlsafe(7)
        while url_col.find_one({"short":short}) != None:
            short = domain_name + secrets.token_urlsafe(7)
    else:
        short= domain_name+alias
        if url_col.find_one({"short":short}) != None:
            print("invalid name, already taken")
            if allowMod==True:
                short = domain_name +alias+"/" +secrets.token_urlsafe(7)
            else:
                return 'error'
    url_col.insert_one({"short":short,"long":long})
    return {"short":short,"long":long}
        
def get_long_url(short):
    print(short)
    url_object = url_col.find_one({"short":domain_name+short})
    print(url_object)
    if url_object != None:
        return url_object['long']
    else:
        return "Url not found"