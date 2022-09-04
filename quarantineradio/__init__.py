from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from quarantineradio.config import Config
from flask_socketio import SocketIO

# import smtplib


db = SQLAlchemy()
bcrypt = Bcrypt()
socketio= SocketIO()
login_manager = LoginManager()
login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'

mail = Mail()



def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(Config)
    # socketio= SocketIO(app)


    db.init_app(app)
    bcrypt.init_app(app)
    socketio.init_app(app)
    login_manager.init_app(app)
    mail.init_app(app)


    from quarantineradio.users.routes import users
    from quarantineradio.rooms.routes import rooms
    from quarantineradio.main.routes import main
    from quarantineradio.errors.handlers import errors
    app.register_blueprint(users)
    app.register_blueprint(rooms)
    app.register_blueprint(main)
    app.register_blueprint(errors)

    return app
