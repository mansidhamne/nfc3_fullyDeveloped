from flask import Flask, request, jsonify
import requests
import os
from pymongo import MongoClient
from datetime import datetime
from flask_cors import CORS

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Mailgun setup
MAILGUN_API_KEY = '55b1945ac361f5736d08e78ca2f075da-777a617d-75bd1d21'
MAILGUN_DOMAIN = 'sandboxe1b4d363fa164ea29a21e3def1f8d93a.mailgun.org'
SENDER_EMAIL = 'mansiadhamne@gmail.com'

# MongoDB setup
MONGO_URI = 'mongodb+srv://vivekagangwani:<db_password>@cluster0.skc7t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
DB_NAME = 'test'
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

@app.route('/')
# ‘/’ URL is bound with hello_world() function.
def hello_world():
    return 'Hello World'

def send_email_notification(email_recipient, subject, content):
    response = requests.post(
        f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages",
        auth=("api", MAILGUN_API_KEY),
        data={
            "from": SENDER_EMAIL,
            "to": email_recipient,
            "subject": subject,
            "text": content,
        }
    )
    return response

@app.route('/submit_assignment', methods=['POST'])
def submit_assignment():
    user_id = request.form.get('user_id')
    user_email = request.form.get('email')
    if not user_id or not user_email:
        return jsonify({'message': 'User ID and email address are required'}), 400

    file = request.files.get('file')
    if not file:
        return jsonify({'message': 'File is required'}), 400

    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    subject = "Document Uploaded"
    content = "Your document has been successfully uploaded."
    response = send_email_notification(user_email, subject, content)

    assignments_collection = db.assignments
    assignments_collection.insert_one({
        'user_id': user_id,
        'email': user_email,
        'file_path': file_path,
        # 'timestamp': datetime.time()
    })

    if response.status_code == 200:
        return jsonify({'message': 'Document uploaded and email notification sent!'}), 200
    else:
        return jsonify({'message': 'Failed to send email', 'error': response.json()}), 500

if __name__ == '__main__':
    app.run(debug=True)
