import firebase_admin
from firebase_admin import credentials, firestore
import json

cred = credentials.Certificate("backend/flash-cards-app-3c9c4-firebase-adminsdk-wjhu1-a78d1a1b5d.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

doc_ref = db.collection('Cards').document('Popular')

with open('backend/flashcards.json', 'r') as file:
    flashcards = json.load(file)



for flashcard in flashcards:
    doc_ref.set(flashcard, merge=True)