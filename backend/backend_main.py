from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from openai import OpenAI
import google.generativeai as genai
import os

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

cred = credentials.Certificate("backend/flash-cards-app-3c9c4-firebase-adminsdk-wjhu1-a78d1a1b5d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()
LLAMA = 'LA-b120b71321af419aa505987678cbcf6e13c7ea96e463477bbb0a6e6a9a8de3d0'
GEMINI = 'AIzaSyD8-xYBe8S4joPpI-gUAGN2ww2xUoHeoaE'
client = OpenAI(
api_key = LLAMA,
base_url = "https://api.llama-api.com"
)



genai.configure(api_key=GEMINI)

model = genai.GenerativeModel('gemini-1.5-flash')


@app.route('/')
def home():
    users_ref = db.collection('Cards')
    docs = users_ref.stream()
    users = []
    for doc in docs:
        users.append(doc.id)


    return jsonify(users)


@app.route('/AI',methods=['GET'])
def ai():
    query = request.args.get("query")
    print(query)
    response = model.generate_content(query)

    return jsonify(response.text)



if __name__ == '__main__':
    app.run(debug=True)




