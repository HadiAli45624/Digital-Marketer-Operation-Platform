from flask import Flask
from flask_cors import CORS 
import os 
from dotenv import load_dotenv
from routes.copycrafter import copy
from routes.report import report
from routes.clients import clients
from db import db

load_dotenv()

app = Flask (__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///app.db'
db.init_app(app)


app.register_blueprint(copy)
app.register_blueprint(report)
app.register_blueprint(clients)



CORS(app, origins='http://localhost:5173')

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True) 