from stuckapp import app
from flask import render_template, url_for, flash, redirect, request

@app.route("/")
def index():
    if request.method == 'POST':
        # Handle form submission here
        severity = request.form.get('severoty')  # Example of getting form data

    return render_template('index.html')

@app.route("/test")
def test():
    return render_template('test.html')

@app.route("/testtest")
def testtest():
    return render_template('testtest.html')

@app.route("/map")
def map():
    return render_template('test.html')


