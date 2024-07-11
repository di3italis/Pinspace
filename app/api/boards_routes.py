'''Board routes'''
from flask import Blueprint#, render_template, request
from flask_login import current_user, login_required
from app.models import Board

boards_routes = Blueprint("boards", __name__)

@boards_routes.route("/current")
# @login_required
def boards_get():
    """
    Gets all boardsThis is essentially the profile page for a user. It will display all of the boards that a user has created.
    """
    print('cur user::::', current_user.to_dict())
    print('ENDDDcur user::::')
    boards = Board.query.all()
    return {"boards": [board.to_dict() for board in boards]}
