from flask import Flask
from flask import request, jsonify
from flask_cors import CORS 
import os 
from dotenv import load_dotenv
from groq import Groq


load_dotenv()
GROQ_API_KEY = os.getenv('GROQ_API_KEY')

client = Groq(api_key=GROQ_API_KEY)

app = Flask (__name__)
CORS(app, origins='http://localhost:5173')

@app.route('/copycrafter', methods=['GET','POST'])
def generate_copy():
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
    target audience — not the name itself"""

    response = client.chat.completions.create(
        model = 'llama-3.3-70b-versatile',
        messages = [{'role': 'user', 'content': text}]
    )

    return jsonify({"copies" : response.choices[0].message.content})

if __name__ == '__main__':
    app.run(debug=True) 