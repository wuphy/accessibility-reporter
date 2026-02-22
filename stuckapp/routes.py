from stuckapp import app
from flask import render_template, url_for, flash, redirect

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/test")
def test():
    return render_template('test.html')