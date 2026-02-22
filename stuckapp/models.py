from stuckapp import db

class Issue(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    severity = db.Column(db.Integer, nullable=False)
    description = db.Column(db.Text, nullable=False)

    def __repr__(self):
        return f"Issue('{self.url}', '{self.description}')"
    