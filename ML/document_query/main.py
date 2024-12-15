from flask import Flask
from app.config import Config
from app.database import db

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)
    db.init_app(app)
    app.app_context().push()

app = create_app()


if __name__ == "__main__":
    from app.controllers import *
    app.run(debug = True)