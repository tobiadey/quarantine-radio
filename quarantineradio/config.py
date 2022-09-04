import os


class Config:
    SECRET_KEY= 'SECRET_KEY'
    # os.environ.get('SECRET_KEY')
    SQLALCHEMY_DATABASE_URI= 'sqlite:///site.db'
    # os.environ.get('SQLALCHEMY_DATABASE_URI')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    MAIL_SERVER = 'smtp.gmail.com'
    MAIL_PORT = 465
    MAIL_USE_TLS = False
    MAIL_USE_SSL = True
    MAIL_USERNAME = 'testingwebsitesqr@gmail.com'
    MAIL_PASSWORD = '@ForMaT1on442!'


# "postgresql://postgres:password@localhost/database1"
