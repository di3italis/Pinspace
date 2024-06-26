from flask import Blueprint, render_template, request
from flask_login import login_required
from ..models import Board

bp = Blueprint("boards", __name__, url_prefix="/boards")


@bp.route("/")
@login_required
def boards():
    """
    This is essentially the profile page for a user. It will display all of the boards that a user has created.
    """
    boards = Board.query.all()
    return {"boards": [board.to_dict() for board in boards]}
