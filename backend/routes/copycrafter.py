from flask import Blueprint, request, jsonify
from groq import Groq
import os

GROQ_API_KEY = os.getenv('GROQ_API_KEY')



copy = Blueprint('copy', __name__)

@copy.route('/copycrafter', methods=['GET', 'POST'])
def generate_copy():
    client = Groq(api_key=GROQ_API_KEY)
    prname = request.json['name']
    prinfo = request.json.get('info', '')
    prprice = request.json.get('price', '')
    pricp =  request.json.get('icp', '')
    prtone = request.json.get('tone', '')
    prnum = request.json['numberofcopies']
    prformat = request.json.get('format','')
    prindustry = request.json['industry']
    prplatform = request.json['platform']
    prtype = request.json['type']

    text = f"""You are hired to be a master copywriter for a firm that runs the ads of other companies, 
    A list of instructions are provided to you below and you have to create an add using those instructions. 
    A master copywriter creates a hook, an understandable call to action, the body depends on the product 
    but it should be information and fact heavy. Some may be blank, and some may be incorrect/contradictory. 
    I want you to make decisions and what you think is optimal

    You are creating an ad copy for {prplatform}, the name of the product is {prname} with industry 
    {prindustry}, it's a {prtype} copy which targets {pricp}, it's price is {prprice}, More info provided : 
    {prinfo}
    I want you to create {prnum} copies. Please keep a {prtone} tone, with a {prformat} format

    I want you to separate them with a line ###COPY_END###

    Use the product name only as a reference. The copy should be driven by the main focus, product info, and 
    target audience — not the name itself
    
    Keep a predictable pattern, Do not write 'Copy:' or 'Body:' etc. You are generating for copied usage.
    -- No markdown formatting as it needs to be directly copyable"""

    response = client.chat.completions.create(
        model = 'openai/gpt-oss-120b',
        messages = [{'role': 'user', 'content': text}]
    )

    return jsonify({"copies" : response.choices[0].message.content})

