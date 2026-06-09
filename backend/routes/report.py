from flask import Blueprint, request, jsonify
from groq import Groq
import os

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

    

report = Blueprint('report', __name__)

@report.route('/project_report', methods=['GET', 'POST'])
def report_generate():
    client = Groq(api_key=GROQ_API_KEY)
    data = request.get_json()

    name = data.get('name', '')
    period = data.get('period', '')
    plat = data.get('platform', {})
    goal = data.get('goal', '')
    notes = data.get('notes', '')


    google = data.get('google', {})
    meta = data.get('meta', {})

    ##Google Metrics
    gspend = google.get('spend', '')
    gimpressions = google.get('impressions', '')
    gclicks = google.get('clicks', '')
    gconversions = google.get('conversions', '')
    gconversion_value = google.get('cvalue', '')

    ##Meta Metrics
    mspend = meta.get('spend', '')
    mimpressions = meta.get('impressions', '')
    mclicks = meta.get('clicks', '')
    mconversions = meta.get('conversions', '')
    mconversion_value = meta.get('cvalue', '')

    text = f"""You are a professional digital marketing analyst writing a client-facing performance report.

    Client: {name}
    Reporting Period: {period}
    Campaign Goal: {goal}
    Additional Notes: {notes}

    CAMPAIGN DATA:

    Google Ads:
    - Spend: {gspend}
    - Impressions: {gimpressions}
    - Clicks: {gclicks}
    - Conversions: {gconversions}
    - Conversion Value: {gconversion_value}

    Meta:
    - Spend: {mspend}
    - Impressions: {mimpressions}
    - Clicks: {mclicks}
    - Conversions: {mconversions}
    - Conversion Value: {mconversion_value}

    INSTRUCTIONS:
    - Write a professional, client-ready report
    - Start with an executive summary
    - Break down performance by platform
    - Calculate and mention CTR, CPC, ROAS where data is available
    - Highlight wins and underperforming areas honestly
    - End with 3 concrete recommendations for next period
    - If a field is empty, ignore it and work with what's available
    - Do not mention missing data to the client
    - Tone should be confident and analytical, not robotic
    - Do not use filler phrases like 'it is important to note'"""

    response = client.chat.completions.create(
        model='openai/gpt-oss-120b', 
        messages = [{'role': 'user', 'content' : text}]
    )

    return jsonify({'report': response.choices[0].message.content})

