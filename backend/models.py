from db import db
from datetime import datetime

class Client(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    name = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable =True)
    created_at = db.Column(db.DateTime, default = datetime.utcnow)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key = True)
    client_id = db.Column(db.Integer, db.ForeignKey('client.id'), nullable = False)
    source = db.Column(db.String[50], nullable = True)
    direction = db.Column(db.String[20], nullable = True)
    content = db.Column(db.String[200], nullable = False)
    timestampe = db.Column(db.DateTime, default = datetime.utcnow)