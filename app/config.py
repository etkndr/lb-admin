import os



class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
        username="etkndr",
        password="lbdbpassword",
        hostname="etkndr.mysql.pythonanywhere-services.com",
        databasename="etkndr$default",
        )
    SQLALCHEMY_POOL_RECYCLE = 299
    SQLALCHEMY_ECHO = True