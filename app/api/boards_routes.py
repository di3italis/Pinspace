'''Board routes'''
from flask import Blueprint, request
from flask_login import current_user, login_required
from app.models import Board, db
from .utils import validate_MustStr

boards_routes = Blueprint("boards", __name__)

@boards_routes.route("/")
@boards_routes.route("/current")
@login_required
def boards_get():
    """
    Gets all boards for the current user
    """
    boards = Board.query.filter_by(id=current_user.id).all()
    return {"boards": [board.to_dict() for board in boards]}

@boards_routes.route('/', methods=['POST'])
@login_required
def boards_add():
    """
    Create a board for the current user.
    body expected:
        description
    """
    body = request.json
    errors = {}
    validate_MustStr('description', body, errors)

    if errors:
        return {"errors": errors}, 400

    board = Board(
        description=body['description'].strip(),
        ownerId=current_user.id
    )
    db.session.commit()
    db.session.add(board)

    return board.to_dict()

@boards_routes.route('/<int:id>')
def boards_1(id):
    """
    Displays a board by id.
    """
    board = Board.query.filter_by(id=id).first()
    return {'board': board.to_dict() if board else None}

@boards_routes.route('/<int:id>', methods=['POST'])
@login_required
def board_edit(id):
    """
    Edits a board by id.
    """
    body = request.json
    errors = {}
    validate_MustStr('description', body, errors)

    if errors:
        return {"errors": errors}, 400

    board = Board.query.filter_by(id=id).first()
    if not board:
        return {"errors": {'board': 'not found'}}, 400

    if not board.ownerId == current_user.id:
        return {"errors": {'ownerId': 'does not own board'}}, 400

    board.description = body['description']

    db.session.commit()
    db.session.add(board)

    return board.to_dict()

@boards_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def board_delete(id):
    """
    deletes a board by id.
    """
    board = Board.query.filter_by(id=id).delete()

    if not board.ownerId == current_user.id:
        return {"errors": {'ownerId': 'does not own board'}}, 400

    db.session.commit()

    return {}
