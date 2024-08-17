from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
from openai import OpenAI
import google.generativeai as genai
import os
import json

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

cred = credentials.Certificate("backend/flash-cards-app-3c9c4-firebase-adminsdk-wjhu1-a78d1a1b5d.json")
firebase_admin.initialize_app(cred)

GEMINI=os.environ["GEMINI_KEY"]



genai.configure(api_key=GEMINI)

db = firestore.client()

model = genai.GenerativeModel('gemini-1.5-flash',
    system_instruction="Your main role is to make flashcards on the given subject and return it in python in the following format: [{\Question:Answer}]"  )


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
    final_result =(format_string_to_list((response.text)))

    return jsonify(final_result)




def format_string_to_list(input_string):

    # Remove the "python" prefix and strip any whitespace
    cleaned_string = input_string.replace("python", "").strip()
    cleaned_string = cleaned_string.strip("`")

    # Use the `eval` function to convert the string into a Python object
    try:
        result_list = eval(cleaned_string)
    except SyntaxError as e:
        print(f"Failed to evaluate the string: {e}")
        print(f"String that failed: {cleaned_string}")

        return []

    return result_list
if __name__ == '__main__':
    app.run(debug=True)




