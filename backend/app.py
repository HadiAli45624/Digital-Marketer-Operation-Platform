from flask import Flask
from flask import request, jsonify
from flask_cors import CORS 
import os 
from dotenv import load_dotenv
from routes.copycrafter import copy
from routes.report import report

load_dotenv()


app = Flask (__name__)
app.register_blueprint(copy)
app.register_blueprint(report)

CORS(app, origins='http://localhost:5173')

if __name__ == '__main__':
    app.run(debug=True) 