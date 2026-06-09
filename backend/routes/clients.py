from flask import Blueprint, request, jsonify
from groq import Groq
from models import Client, Message
from db import db
import os

GROQ_API_KEY = os.getenv('GROQ_API_KEY')

clients = Blueprint('clients' , __name__)

@clients.route('/clients', methods=['POST'])
def add_client():
    data = request.get_json()

    client = Client(
        name = data.get('name', ''),
        email = data.get('email', '')
    )

    db.session.add(client)
    db.session.commit()

    return jsonify({"id" : client.id, 'name': client.name, }) , 201

@clients.route('/clients', methods = ['GET'])
def get_clients():
    all_clients = Client.query.all()
    return jsonify([{"id": c.id, "name": c.name, "email" : c.email} for c in all_clients])


##Messages Routes

@clients.route('/clients/<client_id>/message', methods=["POST"])
def save_message(client_id):
    data = request.get_json()

    msg = Message(
        client_id = client_id, 
        source = data.get('source', ''),
        direction = data.get('direction', ''),
        content = data.get('content', '')
    )

    db.session.add(msg)
    db.session.commit()

    return jsonify({'id': msg.id}), 201


@clients.route('/clients/<client_id>/messages', methods=['GET'])
def get_messages(client_id):
    messages = Message.query.filter_by(client_id=client_id).all()
    return jsonify([{'id': msg.id, 'client_id': msg.client_id, 'source' : msg.source, 'direction':msg.direction, 'content':msg.content}for msg in messages])

@clients.route('/clients/<client_id>/summarize', methods=['GET'])
def summarize(client_id):
    client = Groq(api_key=GROQ_API_KEY)
    messages = Message.query.filter_by(client_id=client_id).all()
    
    msg_text = ''
    for i, msg in enumerate(messages, 1):
        msg_text += f"""Message {i}:
        
        Client ID = {client_id}
        Source = {msg.source}
        Direction = {msg.direction}
        Content = 
                {msg.content}
        
        """

    text = f"""
        You are a conversation analyzer for a Digital Marketing Owner
        You've been given a set of messages which you will need to summarize

        {msg_text}


        -Give an executive summary for the whole conversation, Give all important information and deadlines(if any)
        -Ignore all blank spaces and adjust accordingly
        -Highlight any descrepancy or unhappiness
        -Tone should be confident and analytical
        -Minimize the use of emojis as this is a professional summary
        -Do not use filler or robotic phrases like 'it is important to note'

        """
    
    response = client.chat.completions.create(
        model='openai/gpt-oss-120b', 
        messages = [{'role' : 'user', 'content': text}]
    )

    return jsonify({"summary":response.choices[0].message.content})

@clients.route('/clients/<client_id>/pending', methods=['GET'])
def access_pending(client_id):
    client = Groq(api_key=GROQ_API_KEY)
    messages = Message.query.filter_by(client_id=client_id).all()
    
    msg_text = ''
    for i, msg in enumerate(messages, 1):
        msg_text += f"""Message {i}:
        
        Client ID = {client_id}
        Source = {msg.source}
        Direction = {msg.direction}
        Content = 
                {msg.content}
        
        """

    text = f"""You are a conversation analyst for the owner of Digital Marketing Firm
        Your job is to first analyze all the given messages and analyze which tasks are still pending

        {msg_text}

        -Give concise bit sized actions for the owner to do
        -Details on pending tasks
        -Professional tone
        -Minimal use of emojis
    """

    pending = client.chat.completions.create(
        model = 'openai/gpt-oss-120b', 
        messages= [{'role' : 'user', 'content': text}]
    )

    return jsonify({'pending': pending.choices[0].message.content})

@clients.route('/clients/<client_id>/draft', methods = ['POST'])
def generate_draft(client_id):
    client = Groq(api_key=GROQ_API_KEY)
    messages = Message.query.filter_by(client_id=client_id).all()
    
    msg_text = ''
    for i, msg in enumerate(messages, 1):
        msg_text += f"""Message {i}:
        
        Client ID = {client_id}
        Source = {msg.source}
        Direction = {msg.direction}
        Content = 
                {msg.content}
        
        """

    tone = request.get_json('tone', '')

    text = f"""You are a conversational analyst for the owner of Digital Marketing Firm
        Your job is to analyze these messages and create a professional draft message that the owner can send.
        
        {msg_text}

        -Create an executive tone draft reply for said platform
        -Tone should {tone}
        -Minimal use of emojis
        """

    pending = client.chat.completions.create(
    model = 'openai/gpt-oss-120b', 
    messages= [{'role' : 'user', 'content': text}]
    )

    return jsonify({'draft': pending.choices[0].message.content})