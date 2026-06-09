from flask import Blueprint, request
from groq import Groq
import os

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

report = Blueprint('report', __name__)

@report.route('/project_report', methods=['GET', 'POST'])
def report_generate():
    Groq(api_key='GROQ_API_KEY')
    prname = request.json
    return 

