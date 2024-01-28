from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS
from datetime import datetime, timezone
from bson.objectid import ObjectId
import assemblyai as aai
import keys

app = Flask(__name__)
CORS(app)

CONNECTION_STRING = "mongodb+srv://uoft:oPqKe1qnlgxLVJQF@cluster0.fjluu9a.mongodb.net/?retryWrites=true&w=majority"
client = MongoClient(CONNECTION_STRING)

dbname = client['contacts']
contacts = dbname["contacts"]

# Add contact (working)
@app.route('/add_contact', methods=['POST'])
def create_contact():
    data = request.get_json()
    app.logger.info(data)
    
    try:
        if data['firstName'] != "" and data['lastName'] != "":
            contacts.insert_one(data)
        else:
            return jsonify({'message': 'First and last name are required fields'})
        return jsonify({'message': 'Contact added successfully'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 400



# Index and filter contacts
@app.route('/', methods=['GET'])
def list_contacts():
    data = request.get_json()

    # if data.labels == "Contact Soon":
    #     # if today's data - (last contacted + contact frequency) < 3
    #     # get list with three sections, contact today, need to contact in 1 day, need to contact in 2 days

    try:
        # response = contacts.find({"labels": {"$in": [data.category]}})
        response = contacts.find({},{"category": data['category']})
        category_contacts = list(response)
        if len(category_contacts) == 0:
            return jsonify({'message': 'No contacts in this category'}), 201
        else:
            formatted_contacts = [contact for contact in category_contacts]
            return jsonify(formatted_contacts), 200
    except Exception as e:
        return jsonify({'error': str(e)}),500
    
# Show contact by ID (working)
@app.route('/contact', methods=['GET'])
def show_contact():
    data = request.get_json()

    # if not (contact_id and len(contact_id) > 0):
    #     return jsonify({'error': 'Invalid contact ID'}), 400

    # retrieve from database
    contact = contacts.find_one({"_id": ObjectId(data['_id'])})

    try:
        # keys = ['firstName', 'lastName', 'location', 'emailAddress', 'phoneNum',
        #         'company', 'category', 'lastContacted', 'contactFrequency', 'notes']
        # data = dict(zip(keys, contact))
        # return jsonify(data), 200
        if contact: 
            return jsonify(contact), 200
        else:
            return jsonify({'message': 'Contact not found'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 404

# Edit contact
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
