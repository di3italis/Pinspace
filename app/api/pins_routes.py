"""Pins routes"""

from flask import Blueprint, request, jsonify
from flask_login import login_required, current_user
from app.models import Pin, db, Comment
from .utils import validate_MustStr

pins_routes = Blueprint("pins", __name__)


@pins_routes.route("/all")
def pins_all():
    """
    Displays all pins
    """
    pins = Pin.query.all()
    # testing pins = User.query.all()
    return {"pins": [pin.to_dict() for pin in pins]}


@pins_routes.route("/")
def pins_all2():
    """
    Displays all pins. this route can be modified to include paging and query parameters.
    """
    pins = Pin.query.all()
    return {"pins": [pin.to_dict() for pin in pins]}


@pins_routes.route("/current")
@login_required
def pins_current():
    """
    Displays all pins of currently logged in user.
    """
    pins = Pin.query.filter_by(ownerId=current_user.id).all()
    return {"pins": [pin.to_dict() for pin in pins]}


@pins_routes.route("/", methods=["POST"])
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
    validate_MustStr("image", body, errors)
    validate_MustStr("title", body, errors)
    validate_MustStr("description", body, errors)

    # if not "image" in body or body['image'] is None:
    #     errors["image"] = 'image required'
    # else:
    #     if not body['image'].strip():
    #         errors["image"] = 'image not valid'

    if errors:
        return {"errors": errors}, 400  # if errors else {}

    pin = Pin(
        image=body["image"].strip(),
        title=body["title"].strip(),
        description=body["description"].strip(),
        ownerId=current_user.id,
    )
    db.session.add(pin)
    db.session.commit()

    return pin.to_dict()

    # if errors:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------=
    #     return {errors}, 400
    # print(request.json)
    # return request.json
    # pin = []
    # return {'pin': pin}
    # return {'pins': [pin.to_dict() for pin in pins]}


@pins_routes.route("/<int:id>")
def pins_1pin(id):
    """
    Displays 1 pin by id else []=
    """
    pin = Pin.query.filter_by(id=id).first()
    return {"pin": pin.to_dict() if pin else None}


@pins_routes.route("/<int:id>", methods=["PUT"])
@login_required
def pins_1pin_edit(id):
    """
    Edits a pin by id.
    """
    # '''Validate body'''
    body = request.json
    errors = {}
    validate_MustStr("image", body, errors)
    validate_MustStr("title", body, errors)
    validate_MustStr("description", body, errors)

    if errors:
        return {"errors": errors}, 400  # if errors else {}

    pin = Pin.query.filter_by(id=id).first()
    if not pin:
        return {"errors": {"pin": "not found"}}, 400

    if not pin.ownerId == current_user.id:
        return {"errors": {"ownerId": "does not own pin"}}, 400

    pin.image = body["image"]
    pin.title = body["title"]
    pin.description = body["description"]

    db.session.update(pin)
    db.session.commit()

    return pin.to_dict()


@pins_routes.route("/<int:id>", methods=["DELETE"])
@login_required
def pins_1pin_delete(id):
    """
    deletes a pin by id.
    """
    pin = Pin.query.filter_by(id=id).first()

    if not pin:
        return {"errors": {"pin": "not found"}}, 404

    if pin.ownerId != current_user.id:
        return {"errors": {"ownerId": "does not own pin"}}, 403

    db.session.delete(pin)
    db.session.commit()

    return {"message": "Pin deleted successfully"}, 200
    # return {'pins': [pin.to_dict() for pin in pins]}


@pins_routes.route("/<int:id>/comment", methods=["GET"])
def pins_comment(id):
    """
    get all comments on a pin
    """

    comments = Comment.query.filter_by(pinId=id).all()

    return {"comments": [comment.to_dict() for comment in comments]}


"""In the Future: May need to add a route to GET all comments for a pin, for more nuanced functionality and robust comments storage/retrieval"""

"""comments are anonymous for now."""


@pins_routes.route("/<int:id>/comment", methods=["POST"])
# @login_required
def pins_comment_add():
    """
    adds a comment on a pin
    body expected:
        comment (required)
    """
    # '''Validate body'''
    body = request.json
    errors = {}
    validate_MustStr("comment", body, errors)

    if errors:
        return {"errors": errors}, 400

    pin = Pin.query.filter_by(id=id).first()
    if not pin:
        return {"errors": {"pin": "not found"}}, 400

    # if not pin.ownerId == current_user.id:
    #     return {"errors": {'ownerId': 'does not own pin'}}, 400

    comment = Comment(comment=body["comment"].strip(), pinId=id)
    db.session.add(comment)
    db.session.commit()

    return pin.to_dict()


@pins_routes.route("/comment/<int:cid>", methods=["DELETE"])
@login_required
def pins_comment_delete(cid):
    """
    deletes a comment by id.
    """
    comment = Comment.query.filter_by(id=cid).first()

    if not comment:
        return {"errors": {"comment": "not found"}}, 404

    # if not comment.pin.ownerId == current_user.id:
    #     return {"errors": {"pin.ownerId": "does not own pin"}}, 403
    #
    # comment = Comment.query.filter_by(id=id).delete()

    db.session.delete(comment)
    db.session.commit()

    return {"message": "Comment deleted successfully"}, 200
    # return {'pins': [pin.to_dict() for pin in pins]}


@pins_routes.route("/comment/<int:cid>", methods=["PUT"])
@login_required
def pins_comment_edit(cid):
    """
    edits a comment by id.
    body expected:
        comment (required)
    """
    # '''Validate body'''
    body = request.json
    errors = {}
    validate_MustStr("comment", body, errors)

    if errors:
        return {"errors": errors}, 400

    comment = Comment.query.filter_by(id=cid).first()
    if not comment:
        return {"errors": {"comment": "not found"}}, 400

    if not comment.pin.ownerId == current_user.id:
        return {"errors": {"pin.ownerId": "does not own pin"}}, 400

    comment.comment = body["comment"]

    db.session.update(comment)
    db.session.commit()

    return {}
    # return {'pins': [pin.to_dict() for pin in pins]}
