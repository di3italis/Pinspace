'''Pins routes'''
from flask import Blueprint, request
from flask_login import login_required, current_user
from app.models import Pin, db#, tables
from .utils import validate_MustStr

# from app.models import User

pins_routes = Blueprint("pins", __name__)

@pins_routes.route("/all")
def pins_all():
    """
    Displays all pins
    """
    pins = Pin.query.all()
    # testing pins = User.query.all()
    return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route("/")
def pins_all2():
    """
    Displays all pins. this route can be modified to include paging and query parameters.
    """
    pins = Pin.query.all()
    return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route("/current")
@login_required
def pins_current():
    """
    Displays all pins of currently logged in user.
    """
    pins = Pin.query.filter_by(id=current_user.id).all()
    return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/', methods=['POST'])
@login_required
def pins_add():
    """
    Create a pin for the current user. Figure out how to access body and validation of body.
    body expected:
        image (required)
        title (required)
        desciption (required)
    """
    # '''Validate body'''
    body = request.json
    errors = {}
    validate_MustStr('image', body, errors)
    validate_MustStr('title', body, errors)
    validate_MustStr('description', body, errors)

    # if not "image" in body or body['image'] is None:
    #     errors["image"] = 'image required'
    # else:
    #     if not body['image'].strip():
    #         errors["image"] = 'image not valid'

    if errors:
        return {"errors": errors}, 400 #if errors else {}


    pin = Pin(
        image=body['image'].strip(),
        title=body['title'].strip(),
        description=body['description'].strip(),
        ownerId=current_user.id
    )
    db.session.commit()
    db.session.add(pin)

    return pin.to_dict()

    # if errors:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------=
    #     return {errors}, 400
    # print(request.json)
    # return request.json
    # pin = []
    # return {'pin': pin}
    # return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/<int:id>')
def pins_1pin(id):
    """
    Displays 1 pin by id else [].
    """
    pin = Pin.query.filter_by(id=id).first()
    return {'pin': pin.to_dict() if pin else None}
    # return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/<int:id>', methods=['POST'])
@login_required
def pins_1pin_edit(id):
    """
    Edits a pin by id. Figure out how to handle body passed in.
    Also figure out proper validation.
    """
    pin = Pin.query.filter_by(id=id).first()
    return {'pin': pin.to_dict() if pin else None}
    # return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def pins_1pin_delete(id):
    """
    deletes a pin by id.
    """
    pin = Pin.query.filter_by(id=id).first()
    return {'pin': pin.to_dict() if pin else None}
    # return {'pins': [pin.to_dict() for pin in pins]}
