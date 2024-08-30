# from flask import Flask, request, jsonify # type: ignore
# import requests # type: ignore
# import os

# app = Flask(__name__)

# # Mailgun setup
# MAILGUN_API_KEY = '55b1945ac361f5736d08e78ca2f075da-777a617d-75bd1d21'  # Replace with your Mailgun API key
# MAILGUN_DOMAIN = 'sandboxe1b4d363fa164ea29a21e3def1f8d93a.mailgun.org'  # Replace with your sandbox domain from Mailgun
# SENDER_EMAIL = 'purav.ahya2004@gmail.com'  # Replace with your sandbox domain's postmaster email
# # Directory to save uploaded files (optional)
# UPLOAD_FOLDER = 'uploads'
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # Function to send email using Mailgun
# def send_email_notification(email_recipient, subject, content):
#     response = requests.post(
#         f"https://api.mailgun.net/v3/{MAILGUN_DOMAIN}/messages",
#         auth=("api", MAILGUN_API_KEY),
#         data={
#             "from": SENDER_EMAIL,
#             "to": email_recipient,
#             "subject": subject,
#             "text": content,
#         }
#     )
#     return response

# @app.route('/submit_assignment', methods=['POST'])
# def submit_assignment():
#     user_email = request.form.get('email')  # Get user's email from form data
#     if not user_email:
#         return jsonify({'message': 'Email address is required'}), 400

#     # Get the uploaded file
#     file = request.files.get('file')
#     if not file:
#         return jsonify({'message': 'File is required'}), 400

#     # Save the file to the uploads directory (optional)
#     file_path = os.path.join(UPLOAD_FOLDER, file.filename)
#     file.save(file_path)

#     # Send notification email
#     subject = "Document Uploaded"
#     content = "Your document has been successfully uploaded."
#     response = send_email_notification(user_email, subject, content)

#     if response.status_code == 200:
#         return jsonify({'message': 'Document uploaded and email notification sent!'}), 200
#     else:
#         return jsonify({'message': 'Failed to send email', 'error': response.json()}), 500

# if __name__ == '__main__':
#     app.run(debug=True)
from flask import Flask, request, jsonify
import requests
import os
from pymongo import MongoClient
from datetime import datetime

app = Flask(__name__)

# Mailgun setup
MAILGUN_API_KEY = '55b1945ac361f5736d08e78ca2f075da-777a617d-75bd1d21'  # Replace with your Mailgun API key
MAILGUN_DOMAIN = 'sandboxe1b4d363fa164ea29a21e3def1f8d93a.mailgun.org'  # Replace with your sandbox domain from Mailgun
SENDER_EMAIL = 'purav.ahya2004@gmail.com'  # Replace with your sandbox domain's postmaster email

# MongoDB setup
MONGO_URI = 'mongodb+srv://vivekagangwani:EPiUJaC7dSOhQDoR@cluster0.skc7t.mongodb.net/'  # Replace with your MongoDB URI
DB_NAME = 'test'  # Replace with your MongoDB database name

# Initialize MongoDB client
client = MongoClient(MONGO_URI)
db = client[DB_NAME]

# Directory to save uploaded files (optional)
UPLOAD_FOLDER = 'uploads'
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# Function to send email using Mailgun
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
    # Get user details from the form
    user_id = request.form.get('user_id')
    user_email = request.form.get('email')
    if not user_id or not user_email:
        return jsonify({'message': 'User ID and email address are required'}), 400

    # Get the uploaded file
    file = request.files.get('file')
    if not file:
        return jsonify({'message': 'File is required'}), 400

    # Save the file to the uploads directory (optional)
    file_path = os.path.join(UPLOAD_FOLDER, file.filename)
    file.save(file_path)

    # Send notification email
    subject = "Document Uploaded"
    content = "Your document has been successfully uploaded."
    response = send_email_notification(user_email, subject, content)

    # Record submission details in MongoDB
    assignment_collection = db.assignment
    assignment_collection.insert_one({
        'user_id': user_id,
        'email': user_email,
        'timestamp': datetime.utcnow()
    })

    if response.status_code == 200:
        return jsonify({'message': 'Document uploaded and email notification sent!'}), 200
    else:
        return jsonify({'message': 'Failed to send email', 'error': response.json()}), 500

if __name__ == '__main__':
    app.run(debug=True)
