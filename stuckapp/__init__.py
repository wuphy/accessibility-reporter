from flask import Flask
from flask_sqlalchemy import SQLAlchemy

app = Flask(__name__)
app.config['SECRET_KEY'] = "suckyourmumontuesdays"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['TEMPLATES_AUTO_RELOAD'] = True

db = SQLAlchemy(app)

from stuckapp import routes
