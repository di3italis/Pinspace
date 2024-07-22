'''Board routes'''
from flask import Blueprint, request, jsonify
from flask_login import current_user, login_required
from app.models import Board, db, BoardPin
from .utils import validate_MustStr

boards_routes = Blueprint("boards", __name__)

@boards_routes.route("/")
@boards_routes.route("/current")
@login_required
def boards_get():
    """
    Gets all boards for the current user
    """
    boards = Board.query.filter_by(ownerId=current_user.id).all()
    return jsonify({"boards": [board.to_dict() for board in boards]})

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
        return jsonify({"errors": errors}), 400

    board = Board(
        description=body['description'].strip(),
        ownerId=current_user.id
    )
    db.session.add(board)
    db.session.commit()

    return jsonify(board.to_dict())

@boards_routes.route('/<int:id>')
def boards_1(id):
    """
    Displays a board by id.
    """
    board = Board.query.filter_by(id=id).first()
    return jsonify({'board': board.to_dict() if board else None})

@boards_routes.route('/<int:id>', methods=['PUT'])
@login_required
def board_edit(id):
    """
    Edits a board by id.
    """
    body = request.json
    errors = {}
    validate_MustStr('description', body, errors)

    if errors:
        return jsonify({"errors": errors}), 400

    board = Board.query.filter_by(id=id).first()
    if not board:
        return jsonify({"errors": {'board': 'not found'}}), 400

    if not board.ownerId == current_user.id:
        return jsonify({"errors": {'ownerId': 'does not own board'}}), 400

    board.description = body['description']

    db.session.add(board)
    db.session.commit()

    return jsonify(board.to_dict())

@boards_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def board_delete(id):
    """
    deletes a board by id.
    """
    board = Board.query.filter_by(id=id).delete()

    if not board.ownerId == current_user.id:
        return jsonify({"errors": {'ownerId': 'does not own board'}}), 400

    db.session.delete(board)
    db.session.commit()

    return jsonify({})

# '''
# Add pin to board
# remove pin from board
# '''

@boards_routes.route('/<int:id>/boardPin/<int:pid>', methods=['POST'])
# @login_required
def boards_addPin(id, pid):
    """
    Create a board for the current user.
    body expected:
        description
    """

    # errors = {}

    # if errors:
    #     return {"errors": errors}, 400

    board = Board.query.filter_by(id=id).first()
    if not board:
        return jsonify({"errors": {'board': 'not found'}}), 400
    if not board.ownerId == current_user.id:
        return jsonify({"errors": {'ownerId': 'does not own board'}}), 400

    boardPin = BoardPin(
        pinId=pid,
        boardId=id
    )
    db.session.add(boardPin)
    db.session.commit()

    return jsonify(boardPin.to_dict())

@boards_routes.route('/<int:id>/boardPin/<int:pid>', methods=['DELETE'])
@login_required
def boards_delete_pin(id, pid):
    """
    delete
    """

    board = Board.query.filter_by(id=id).first()
    if not board:
        return jsonify({"errors": {'board': 'not found'}}), 400
    if not board.ownerId == current_user.id:
        return jsonify({"errors": {'ownerId': 'does not own board'}}), 400

    boardPin = BoardPin.query.filter_by(pinId=pid, boardId=id).delete()

    db.session.delete(boardPin)
    db.session.commit()

    return jsonify({})

@boards_routes.route('/<int:id>/boardPin')
@login_required
def boards_pin(id):
    """
    get all pins for the board
    """

    board = Board.query.filter_by(id=id).first()
    if not board:
        return jsonify({"errors": {'board': 'not found'}}), 400
    if not board.ownerId == current_user.id:
        return jsonify({"errors": {'ownerId': 'does not own board'}}), 400

    board_pins = BoardPin.query.filter_by(boardId=id).all()
    return jsonify({"boardPins": [boardPin.to_dict() for boardPin in board_pins]})
