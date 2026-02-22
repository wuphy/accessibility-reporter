from stuckapp import app
from flask import render_template, url_for, flash, redirect, request
from stuckapp import db
from stuckapp.models import Issue

@app.route("/")
def index():
    submitted = False
    if request.method == 'POST':
        # Handle form submission here
        severity = request.form.get('severity')
        details = request.form.get('details')
        location = request.form.get('location')

        # add issue to database
        new_issue = Issue(severity=severity, description=details, location=location)
        db.session.add(new_issue)
        db.session.commit()

        submitted = True
    
    if submitted:
        flash('Issue submitted successfully!', 'success')
    return render_template('index.html')

@app.route("/reports")
def reports():
    return render_template('all-pins.html')


@app.route("/get_issues", methods=["POST"])
def get_issues():
    issues = Issue.query.all()
    issues_data = []
    for issue in issues:
        issues_data.append({
            "severity": issue.severity,
            "description": issue.description,
            "location": issue.location
        })
    
    return {"issues": issues_data}

@app.route("/test")
def test():
    return render_template('test.html')

@app.route("/map")
def map():
    return render_template('test.html')


