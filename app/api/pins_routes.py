from flask import Blueprint#, request
from flask_login import current_user, login_user, logout_user, login_required
from app.models import tables, db, Pin


# pins_routes = Blueprint("pins", __name__, url_prefix="/pins")
pins_routes = Blueprint("pins", __name__)

@pins_routes.route("/all")
def pins_all():
    """
    Displays all pins
    """
    pins = Pin.query.all()
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
    pins = Pin.query.all()
    return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/', methods=['POST'])
@login_required
def pins_add():
    """
    Create a pin. Figure out how to access body and validation of body.
    """
    pin = []
    return {'pin': pin}
    # return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/<int:id>')
def pins_1pin(id):
    """
    Displays 1 pin by id else [].
    """
    pin = Pin.query.filter_by(id=id).first()
    return {'pin': pin.to_dict() if pin else []}
    # return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/<int:id>', methods=['POST'])
@login_required
def pins_1pin_edit(id):
    """
    Edits a pin by id. Figure out how to handle body passed in.
    Also figure out proper validation.
    """
    pin = Pin.query.filter_by(id=id).first()
    return {'pin': pin.to_dict() if pin else []}
    # return {'pins': [pin.to_dict() for pin in pins]}

@pins_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def pins_1pin_delete(id):
    """
    deletes a pin by id.
    """
    pin = Pin.query.filter_by(id=id).first()
    return {'pin': pin.to_dict() if pin else []}
    # return {'pins': [pin.to_dict() for pin in pins]}
