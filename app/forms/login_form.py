from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


def user_exists(form, field):
    # Checking if user exists
    email = field.data
    user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')

def credential_exists(form, field):
    # Checking if credential_exists exists
    credential = field.data
    user = User.query.filter(
        (User.email == credential) | (User.username == credential)
    ).first()
    # user = User.query.filter(User.email == email).first()
    if not user:
        raise ValidationError('Email provided not found.')


def password_matches(form, field):
    # Checking if password matches
    password = field.data
    credential = form.data['credential']
    # user = User.query.filter(User.email == email).first()
    user = User.query.filter(
        (User.email == credential) | (User.username == credential)
    ).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('Password was incorrect.')


class LoginForm(FlaskForm):
    credential = StringField('credential', validators=[DataRequired(), credential_exists])
    password = StringField('password', validators=[DataRequired(), password_matches])

# //////////////////////
#     body = request.json
#     # print("body:", body)
#     errors = {}
#     validate_MustStr("credential", body, errors)
#     validate_MustStr("password", body, errors)

#     if errors:
#         # print("errors:", errors)
#         return jsonify({"errors": errors}), 400  # if errors else {}

#     # credential can be email or username
#     password = body["password"]
#     credential = body["credential"]
#     user = User.query.filter(
#         (User.email == credential) | (User.username == credential)
#     ).first()

#     if not user:
#         return jsonify({"errors": {"user": "No such user exists."}}), 400

#     if not user.check_password(password):
#         return jsonify({"errors": {"password": "Password was incorrect."}}), 400

#     login_user(user, remember=True)

#     print('TESTTTTT AUTH!')
#     if current_user.is_authenticated:
#         print('TESTTTTT AUTH! VALIDATED')
#     else:
#         print('TESTTTTT AUTH! NNNNNNNOOOOOOOTTTTTTTT     VALIDATED')

#     # app.test_client(user=user)

#     return jsonify(user.to_dict())
