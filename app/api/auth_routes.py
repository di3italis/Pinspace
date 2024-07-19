from flask import Blueprint, request
from flask_login import current_user, login_user, logout_user  # , login_required
from app.models import User, db

# from app.forms import LoginForm
# from app.forms import SignUpForm
from .utils import validate_MustStr

auth_routes = Blueprint("auth", __name__)


@auth_routes.route("/")
def authenticate():
    """
    Authenticates a user.
    """
    print("current_user:", current_user)
    if current_user.is_authenticated:
        return current_user.to_dict()
    return {"errors": {"message": "Unauthorized"}}, 401


@auth_routes.route("/login", methods=["POST"])
def login():
    print("help")
    """
    Logs a user in
    body:
        credential
        password
    """
    body = request.json
    print("body:", body)
    errors = {}
    # validate_MustStr("credential", body, errors)
    # validate_MustStr("password", body, errors)

    if errors:
        print("errors:", errors)
        return {"errors": errors}, 400  # if errors else {}

    # credential can be email or username

    password = body["password"]
    credential = body["credential"]
    user = User.query.filter(
        User.email == credential or User.username == credential
    ).first()

    if not user:
        return {"errors": {"user": "No such user exists."}}, 400

    if not user.check_password(password):
        return {"errors": {"password": "Password was incorrect."}}, 400

    login_user(user)
    return user.to_dict()

    # form = LoginForm()
    # Get the csrf_token from the request cookie and put it into the
    # form manually to validate_on_submit can be used
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    # Add the user to the session, we are logged in!
    #     user = User.query.filter(User.email == form.data['email']).first()
    #     login_user(user)
    #     return user.to_dict()
    # return form.errors, 401


@auth_routes.route("/logout")
def logout():
    """
    Logs a user out
    """
    logout_user()
    return {"message": "User logged out"}


@auth_routes.route("/signup", methods=["POST"])
def sign_up():
    """
    Creates a new user and logs them in
    body:
        first_name
        last_name
        username
        email
        password
        profile_image
    """
    body = request.json
    errors = {}
    validate_MustStr("first_name", body, errors)
    validate_MustStr("last_name", body, errors)
    validate_MustStr("username", body, errors)
    validate_MustStr("email", body, errors)
    validate_MustStr("password", body, errors)
    validate_MustStr("profile_image", body, errors)

    if errors:
        return {"errors": errors}, 400  # if errors else {}

    user = User(
        first_name=body["first_name"],
        last_name=body["last_name"],
        username=body["username"],
        email=body["email"],
        password=body["password"],  # setting password creats a hashed pw.
        profile_image=body["profile_image"],
    )
    db.session.add(user)
    db.session.commit()
    login_user(user)
    return user.to_dict()

    # form = SignUpForm()
    # form['csrf_token'].data = request.cookies['csrf_token']
    # if form.validate_on_submit():
    #     user = User(
    #         username=form.data['username'],
    #         email=form.data['email'],
    #         password=form.data['password']
    #     )
    #     db.session.add(user)
    #     db.session.commit()
    #     login_user(user)
    #     return user.to_dict()
    # return form.errors, 401


@auth_routes.route("/unauthorized")
def unauthorized():
    """
    Returns unauthorized JSON when flask-login authentication fails
    """
    return {"errors": {"message": "Unauthorized"}}, 401
