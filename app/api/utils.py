

def validate_MustStr(key:str, body:dict, errors: dict):
    if not key in body or body[key] is None:
        errors[key] = key + ' required'
    else:
        if not body[key].strip():
            errors[key] = key + ' not valid'
