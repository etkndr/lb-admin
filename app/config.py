import os



class Config:
    SECRET_KEY = os.environ.get('SECRET_KEY')
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    # SQLAlchemy 1.4 no longer supports url strings that start with 'postgres'
    # (only 'postgresql') but heroku's postgres add-on automatically sets the
    # url in the hidden config vars to start with postgres.
    # so the connection uri must be updated here (for production)
    SQLALCHEMY_DATABASE_URI = "mysql+mysqlconnector://{username}:{password}@{hostname}/{databasename}".format(
        username="etkndr",
        password="lbdbpassword",
        hostname="etkndr.mysql.pythonanywhere-services.com",
        databasename="etkndr$default",
        )
    SQLALCHEMY_POOL_RECYCLE = 299
    SQLALCHEMY_ECHO = True
