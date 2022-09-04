from flask_wtf import FlaskForm
from flask_wtf.file import FileField, FileAllowed
from flask_login import current_user
from wtforms import StringField, PasswordField, SubmitField, BooleanField, RadioField
from wtforms.validators import DataRequired, Length, Email, EqualTo, ValidationError
from quarantineradio.models import User


class RegistrationForm(FlaskForm):
    username = StringField('Username', validators= [DataRequired(),Length(min=2, max=20)])
    email = StringField('Email', validators= [DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Sign Up')

    def validate_username(self,username):
        user = User.query.filter_by(username=username.data).first()
        if user:
            raise ValidationError('That Username is taken. Please choose a different one')

    def validate_email(self,email):
        user = User.query.filter_by(email=email.data).first()
        if user:
            raise ValidationError('That Email is taken. Please choose a different one')

class LoginForm(FlaskForm):
    email = StringField('Email', validators= [DataRequired(), Email()])
    password = PasswordField('Password', validators=[DataRequired()])
    remember = BooleanField('Rememeber Me')
    submit = SubmitField('Login')

class UpdateAccountForm(FlaskForm):
    username = StringField('Username', validators= [DataRequired(),Length(min=2, max=20)])
    email = StringField('Email', validators= [DataRequired(), Email()])
    # picture= FileField('Update Profile Picture', validators=[FileAllowed(['jpg','png'])])
    picture = RadioField(
        # A1:"h1"
        'Update Profile Picture', choices=[('A1.png', 'Picture 1'),
        ('A2.png', 'Picture 2'),
        ('A3.png', 'Picture 3'),
        ('A4.png', 'Picture 4'),
        ('A5.png', 'Picture 5'),
        ('A6.png', 'Picture 6'),
        ('A7.png', 'Picture 7'),
        ('A8.png', 'Picture 8'),
        ('A9.png', 'Picture 9'),
        ('A10.png', 'Picture 10'),
        ('A11.png', 'Picture 11')
        ])
    submit = SubmitField('Update')


    def validate_username(self,username):
        if username.data != current_user.username:
            user = User.query.filter_by(username=username.data).first()
            if user:
                raise ValidationError('That Username is taken. Please choose a different one')

    def validate_email(self,email):
        if email.data != current_user.email:
            user = User.query.filter_by(email=email.data).first()
            if user:
                raise ValidationError('That Email is taken. Please choose a different one')


class RequestResetForm(FlaskForm):
    email = StringField('Email', validators= [DataRequired(), Email()])
    submit = SubmitField('Request Password Reset')

    def validate_email(self,email):
        user = User.query.filter_by(email=email.data).first()
        if user is None:
            raise ValidationError('No account with this email')


class ResetPasswordForm(FlaskForm):
    password = PasswordField('Password', validators=[DataRequired()])
    confirm_password = PasswordField('Confirm Password', validators=[DataRequired(), EqualTo('password')])
    submit = SubmitField('Reset Password')
