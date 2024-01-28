import json
from datetime import datetime
import keys

from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from bson.objectid import ObjectId
import assemblyai as aai
import numpy as np

from semantic_search.embed_and_search import embed_text, search

app = Flask(__name__)

CORS(app)
app.config['CORS_HEADERS'] = 'Content-Type'

cors = CORS(app, resources={r"/foo": {"origins": "http://localhost:5000"}})

CONNECTION_STRING = "mongodb+srv://uoft:oPqKe1qnlgxLVJQF@cluster0.fjluu9a.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

dbname = client['contacts']
contacts = dbname["contacts"]

API_KEY = "PDiALOTJF7sERYakM8ZTY9QdPnIxtp0FfbkSMvTd"  # TODO: Add as env variable


def get_embedding(doc):
    copy = dict(doc)

    # eliminate noise
    if copy.get("_id"):
        del copy["_id"]

    if copy.get("embedding"):
        del copy["embedding"]

    json_string = json.dumps(copy, default=str)
    print('text to embed: ', json_string)
    return embed_text(json_string, API_KEY)


# Add contact (working)
@app.route('/add_contact', methods=['POST'])
def create_contact():
    data = request.get_json()
    app.logger.info(data)

    data['lastContacted'] = datetime(2000, 1, 1)

    try:
        if data['firstName'] != "" and data['lastName'] != "":
            data['embedding'] = get_embedding(data)
            contacts.insert_one(data)
            print('Added contact with embedding: ', data)
        else:
            return jsonify({'message': 'First and last name are required fields'})
        return jsonify({'message': 'Contact added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Index and filter contacts (working)
@app.route('/category', methods=['POST'])
def list_contacts():
    # if data.labels == "Contact Soon":
    #     # if today's data - (last contacted + contact frequency) < 3
    #     # get list with three sections, contact today, need to contact in 1 day, need to contact in 2 days
    data = (request.get_json())['category']
    try:
        response = contacts.find({"category": data},{"embedding":0})
        category_contacts = list(response)
        for contact in category_contacts:
            contact['_id'] = str(contact['_id'])
        if len(category_contacts) == 0:
            return jsonify({'message': 'No contacts in this category'}), 200
        else:
            return jsonify(category_contacts), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# Show contact by ID (working)
@app.route('/contact', methods=['GET'])
def show_contact():
    id = request.args.get('_id')

    if not (id and len(id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    try:
        contact = contacts.find_one({"_id": ObjectId(id)}, {"embedding": 0})
        contact['_id'] = str(contact['_id'])
        if contact:
            return jsonify(contact), 200
        else:
            return jsonify({'message': 'Contact not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 404


# Edit contact (working)
@app.route('/update_contact', methods=['PUT'])
def update_contact():
    id = request.args.get('_id')
    data = request.get_json()

    if not (id and len(id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    try:
        result = contacts.update_one({'_id': ObjectId(id)}, {"$set": data})
        data['embedding'] = get_embedding(result)
        result = contacts.update_one({'_id': ObjectId(id)}, {"$set": data})

        if result.modified_count > 0:
            return jsonify({'message': 'Contact updated successfully'}), 200
        else:
            return jsonify({'message': 'No contact updates made'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 400


@app.route('/update_contact/add_meeting', methods=['PUT'])
def add_meeting():
    data = request.get_json()
    app.logger.info(data)

    # fix
    try:
        filter = {'_id': ObjectId(data['_id'])}
        newdata = {"$set": {"lastContacted": datetime.now()}}
        result = contacts.update_one(filter, newdata)
        newdata['embedding'] = get_embedding(result)
        result = contacts.update_one(filter, newdata)
        response = {'message': 'Last meeting time updated'}
        return jsonify(response), 200
    except Exception as e:
        response = {'message': e}
        return jsonify(response), 400
    
@app.route('/contact_soon', methods=['GET'])
def contact_soon():
    try:
        response = contacts.find({} , { "embedding" : 0 })
        contact_list = list(response)
        filtered_contacts = list(filter(lambda contact: ((datetime.now() - contact['lastContacted']) < timedelta(days=3)), contact_list))
        for contact in filtered_contacts:
            contact['_id'] = str(contact['_id'])
        if len(filtered_contacts) == 0:
            return jsonify({'message': 'No contacts need to be contacted soon'}), 200
        else:
            return jsonify(filtered_contacts), 200
    except Exception as e:
        return jsonify({'error': str(e)}),500


# Delete contact (working)
@app.route('/delete', methods=['DELETE'])
def delete_contact():
    data = request.get_json()
    contact_id = data['_id']

    if not (contact_id and len(contact_id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    try:
        result = contacts.delete_one({'_id': ObjectId(contact_id)})
        if result.deleted_count == 1:
            return jsonify({'message': 'Deleted contact'}), 200
        else:
            return jsonify({'message': 'Contact not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500


# @app.route('/listen', methods=["POST"])
# def listen():
#     try:
#         audio_file = request.files['audio']
#         # Save the audio file to a specific location
#         audio_file.save('./audio.wav')
#
#         aai.settings.api_key = keys.assembly_key
#         transcriber = aai.Transcriber()
#
#         transcript = transcriber.transcribe("./audio.wav")
#
#         print(transcript.text)
#         return jsonify({'success': 'saved'})
#     except Exception as e:
#         return jsonify({'error': f'Failed to save audio: {str(e)}'}), 500


@app.route('/search', methods=["POST"])
def search_contacts():
    try:
        # audio_file = request.files.get('audio')
        #
        # # Save the audio file to a specific location
        # audio_file.save('./audio.wav')
        #
        # aai.settings.api_key = keys.assembly_key
        # transcriber = aai.Transcriber()
        #
        # transcript = transcriber.transcribe("./audio.wav")
        #
        # prompt = transcript.text

        prompt = 'I want to talk to software engineers from RBC Canada'
        print(prompt)

        print('here')
        audio_file = request.files['audio']
        # Save the audio file to a specific location
        audio_file.save('./audio.wav')

        # get all embeddings from the database
        embedded_vectors = []

        for document in contacts.find():
            embedded_vectors.append(np.array(document['embedding']))
        print(f'Processed {len(embedded_vectors)} documents')

        result_id = search(prompt, embedded_vectors, API_KEY)
        print('Search result id: ', result_id)

        if result_id:
            contact = contacts.find_one({"_id": result_id}, {"embedding": 0})
            if contact:
                contact['_id'] = str(contact['_id'])
                return jsonify(contact), 200
        else:
            return jsonify({'message': 'No result matches your search'}), 404
    except Exception as e:
        return jsonify({'error': f'Failed to save audio: {str(e)}'}), 500
