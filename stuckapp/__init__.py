from flask import Flask

app = Flask(__name__)
app.config['SECRET_KEY'] = "suckyourmumontuesdays"
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///site.db"
app.config['TEMPLATES_AUTO_RELOAD'] = True

from stuckapp import routes
