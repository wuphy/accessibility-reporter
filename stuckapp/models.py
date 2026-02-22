from stuckapp import db

class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.Integer, nullable=False, default=1)
    description = db.Column(db.Text, nullable=False)
    location = db.Column(db.String(100), nullable=False)
    # time = db.Column(db.String(100), nullable=True)

    def __repr__(self):
        return f"Issue('{self.url}', '{self.description}')"
    