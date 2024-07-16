'''Board routes'''
from flask import Blueprint#, render_template, request
from flask_login import current_user, login_required
from app.models import Board

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
    Create a board for the current user. Figure out how to access body and validation of body.
    """
    board = []
    return {'board': board}

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
    Edits a board by id. Figure out how to handle body passed in.
    Also figure out proper validation.
    """
    board = Board.query.filter_by(id=id).first()
    return {'board': board.to_dict() if board else None}

@boards_routes.route('/<int:id>', methods=['DELETE'])
@login_required
def board_delete(id):
    """
    deletes a board by id.
    """
    board = Board.query.filter_by(id=id).first()
    return {'board': board.to_dict() if board else None}
