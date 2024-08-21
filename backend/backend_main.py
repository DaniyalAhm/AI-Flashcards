from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import firebase_admin
from firebase_admin import credentials, firestore
import google.generativeai as genai
import os
import json
from termcolor import colored

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

try:
    cred = credentials.Certificate("backend/flashcards-app-cc39f-firebase-adminsdk-azs6x-52d9351ad1.json")
    firebase_admin.initialize_app(cred)
    db = firestore.client()
    print(colored("Firebase initialized successfully", 'green'))
except Exception as e:
    print(colored(f"Error initializing Firebase: {e}", 'red'))

try:
    GEMINI = os.environ["GEMINI_KEY"]
    genai.configure(api_key=GEMINI)
    model = genai.GenerativeModel('gemini-1.5-flash',
        system_instruction="Your main role is to make flashcards on the given subject and return it in python in the following format: [{\Question:Answer}]")
    print(colored("Google Generative AI configured successfully", 'green'))
except Exception as e:
    print(colored(f"Error configuring Google Generative AI: {e}", 'red'))


@app.route('/')
def home():
    try:
        Cards_ref = db.collection('Cards').document('Popular')
        Cards = Cards_ref.get()
        print(colored("Successfully fetched cards from Firestore", 'green'))

        if Cards.exists:
            data = Cards.to_dict()
            print(colored("Cards data exists", 'green'))
        else:
            data = {}
            print(colored("No cards found in Firestore", 'red'))

        titles = []
        cards = []

        for x in data.get('Entries', []):
            titles.append(x['title'])
            cards.append(x['Cards'])

        response = {
            'titles': titles,
            'cards': cards
        }

        print(colored("Response successfully prepared", 'green'))
        print(response)

        return jsonify(response)

    except Exception as e:
        print(colored(f"Error in home route: {e}", 'red'))
        return jsonify({'error': str(e)}), 500


@app.route('/AI', methods=['GET'])
def ai():
    try:
        query = request.args.get("query")
        print(colored(f'Fetched {query} from frontend', 'green'))

        response = model.generate_content(query)
        final_result = format_string_to_list(response.text)
        print(colored("AI response generated and formatted successfully", 'green'))

        return jsonify(final_result)

    except Exception as e:
        print(colored(f"Error in AI route: {e}", 'red'))
        return jsonify({'error': str(e)}), 500


@app.route('/public_save', methods=['POST'])
def public_save():
    try:
        data = request.json
        title = data.get("title")
        query = data.get("query")

        print(colored(f"Received title: {title}", 'yellow'))
        print(colored(f"Received query: {query}", 'yellow'))

        doc_ref = db.collection('Cards').document('Popular')
        updates = {'title': title, 'Cards': query}

        doc_ref.update({
            'Entries': firestore.ArrayUnion([updates])
        })

        print(colored("Data saved successfully to Firestore", 'green'))
        return '200'

    except Exception as e:
        print(colored(f"Error in public_save route: {e}", 'red'))
        return jsonify({'error': str(e)}), 500


def format_string_to_list(input_string):
    try:
        # Remove the "python" prefix and strip any whitespace
        cleaned_string = input_string.replace("python", "").strip().strip("`")
        
        # Use the `eval` function to convert the string into a Python object
        result_list = eval(cleaned_string)
        print(colored("String successfully formatted into list", 'green'))
        return result_list

    except SyntaxError as e:
        print(colored(f"Failed to evaluate the string: {e}", 'red'))
        print(colored(f"String that failed: {cleaned_string}", 'red'))
        return []

if __name__ == '__main__':
    app.run(debug=True)
