from flask import Flask, request, jsonify
from pymongo import MongoClient
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

client = MongoClient('localhost', 27017)

db = client.flask_db
contacts = db.contacts

# Test route
@app.route('/test', methods=['GET'])
def my_profile():
    return jsonify({"name": "Jessica"})

@app.route('/add_contact', methods=['POST'])
def create_contact():
    try:
        data = request.get_json()
        print(data)

        return jsonify({"message": "Contact added successfully"}), 200

    except Exception as e:
        print(e)
        return jsonify({"error": "An error occurred"}), 500


# Index and filter contacts
@app.route('/', methods=['GET'])
def list_contacts():
    data = request.get_json()

    # add to database

    response = {'message': 'Contact added successfully'}
    return jsonify(response), 201


# Show contact by ID
@app.route('/contact', methods=['GET'])
def show_contact():
    contact_id = request.args.get('id')

    if not (contact_id and len(contact_id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    # retrieve from database
    contact = ['Sophie', 'Xie', ['Blacklisted'], 'Company', 'Toronto', 'sophie@gmail.com',
               '1234567890', 'notes notes notes', '02-02-2020']

    if contact:
        keys = ['first_name', 'last_name', 'labels', 'company', 'location',
                'email', 'phone_number', 'notes', 'last_contacted']
        data = dict(zip(keys, contact))
        return jsonify(data), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404


@app.route('/update_contact', methods=['PUT'])
def update_contact():
    data = request.get_json()

    contact_id = data['id']

    if not (contact_id and len(contact_id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    # edit database
    contact = ['Sophie', 'Xie', ['Potential Customer'], 'Company', 'Toronto', 'sophie@gmail.com',
               '1234567890', 'notes notes notes', '02-02-2020']

    if contact:
        keys = ['first_name', 'last_name', 'labels', 'company', 'location',
                'email', 'phone_number', 'notes', 'last_contacted']
        data = dict(zip(keys, contact))
        return jsonify(data), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404


@app.route('/delete', methods=['DELETE'])
def delete_contact():
    data = request.get_json()
    contact_id = data['id']

    if not (contact_id and len(contact_id) > 0):
        return jsonify({'error': 'Invalid contact ID'}), 400

    # remove from database
    success = True

    if success:
        return jsonify(data), 200
    else:
        return jsonify({'error': 'Contact not found'}), 404

if __name__ == "__main__":
   app.run(port=5000, debug=True)