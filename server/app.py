from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

from bson.objectid import ObjectId
import assemblyai as aai
import keys

app = Flask(__name__)
CORS(app)

CONNECTION_STRING = "mongodb+srv://uoft:oPqKe1qnlgxLVJQF@cluster0.fjluu9a.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

dbname = client['contacts']
contacts = dbname['contacts']

contact_fields = ['_id', 'first_name', 'last_name', 'category', 'company', 'position', 'location',
                  'email', 'phone_number', 'notes', 'meeting_history', 'last_contacted']


# Add contact (working)
@app.route('/add_contact', methods=['POST'])
def create_contact():
    data = request.get_json()
    app.logger.info(data)
    
    try:
        if len(data['firstName']) > 0 and len(data['lastName']) > 0:
            contacts.insert_one(data)
        else:
            return jsonify({'message': 'First and last name are required fields'}), 400
        return jsonify({'message': 'Contact added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400


# Index and filter contacts
@app.route('/', methods=['GET'])
def list_contacts():
    data = request.get_json()
    filter_category = data.get('category')

    if filter_category:
        results = contacts.find({'category': filter_category})
    else:
        results = contacts.find()

    response = {'contacts': results}
    return jsonify(response), 200


# Show contact by ID
@app.route('/contact/<contact_id>', methods=['GET'])
def show_contact(contact_id):
    if not (contact_id and len(contact_id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    # retrieve from database
    contact = contacts.find_one({'_id': contact_id})

    if contact:
        data = {key: contact.get(key, '') for key in contact_fields}
        return jsonify(data), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404


# Edit contact
@app.route('/update/<contact_id>', methods=['PUT', 'PATCH'])
def update_contact(contact_id):
    if not (contact_id and len(contact_id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    data = request.get_json(force=True)
    result = contacts.update_one({'_id': contact_id}, {'$set': data})

    if result:
        return jsonify({'message': 'Contact updated successfully'}), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404


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


# Search
@app.route('/search', methods=['GET'])
def search_contacts():
        data = request.get_json()
        filter = data['category']

        response = {'message': 'Contact added successfully'}
        return jsonify(response), 200


# @app.route('/update_contact/add_meeting', methods=['PUT'])
# def add_meeting():
#     data = request.get_json()
#     app.logger.info(data)

#     # fix
#     try:
#         filter = {'_id': data['_id']}
#         newdata = { "$set": { "lastContacted" : datetime.datetime.now(tz=datetime.timezone.utc) } }
#         contacts.update_one(filter, newdata)
#         response = {'message': 'Last meeting time updated'}
#         return jsonify(response), 200
#     except Exception as e:
#         response = {'message': e}
#         return jsonify(response), 400

    
@app.route('/listen', methods=["POST"])
def listen():
    try:
        audio_file = request.files['audio']
        # Save the audio file to a specific location
        audio_file.save('./audio.wav')

        aai.settings.api_key = keys.assembly_key
        transcriber = aai.Transcriber()

        transcript = transcriber.transcribe("./audio.wav")

        print(transcript.text)
        return jsonify({'success': 'saved'})
    except Exception as e:
        return jsonify({'error': f'Failed to save audio: {str(e)}'}), 500
