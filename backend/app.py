from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
import os
from werkzeug.security import generate_password_hash, check_password_hash
from models.user import User
from models.job import Job
from models.application import Application

app = Flask(__name__)
CORS(app)  # Enable CORS

# MongoDB connection
MONGO_URI = "mongodb+srv://poshikam:jobboardflask@cluster0.e5rkgkc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
client = MongoClient(MONGO_URI, tls=True, tlsAllowInvalidCertificates=True)
db = client["jobboard_db"]  # Database name
jobs_collection = db["jobs"]
users_collection = db["users"]
applications_collection = db["applications"]

try:
    client.admin.command('ping')
    print("✅ MongoDB connection successful!")
except Exception as e:
    print(f"❌ MongoDB connection failed: {e}")

# Pre-populate Jobs if not already populated
if jobs_collection.count_documents({}) == 0:
    predefined_jobs = [
        Job("job001", "Frontend Developer", "Build UI components using React", "Remote", "₹6-8 LPA"),
        Job("job002", "Backend Developer", "Develop APIs using Flask", "Bangalore", "₹7-10 LPA"),
        Job("job003", "Data Scientist", "Analyze data and build ML models", "Remote", "₹9-12 LPA"),
        Job("job004", "DevOps Engineer", "Manage cloud infrastructure", "Hyderabad", "₹8-10 LPA"),
        Job("job005", "Product Manager", "Lead the product team", "Delhi", "₹10-14 LPA"),
        Job("job006", "Mobile App Developer", "Create mobile applications using Flutter", "Remote", "₹6-9 LPA"),
        Job("job007", "UI/UX Designer", "Design intuitive user interfaces and experiences", "Mumbai", "₹5-7 LPA"),
        Job("job008", "Cloud Architect", "Design scalable cloud solutions", "Bangalore", "₹12-16 LPA"),
        Job("job009", "Cybersecurity Analyst", "Monitor and secure network systems", "Pune", "₹7-11 LPA"),
        Job("job010", "Full Stack Developer", "Develop front-end and back-end applications", "Remote", "₹8-12 LPA"),
        Job("job011", "Business Analyst", "Analyze business processes and suggest improvements", "Delhi", "₹6-8 LPA"),
        Job("job012", "QA Engineer", "Test software applications for bugs", "Chennai", "₹5-7 LPA"),
        Job("job013", "AI Engineer", "Develop AI-driven applications", "Remote", "₹10-14 LPA"),
        Job("job014", "Technical Writer", "Create technical documentation and manuals", "Remote", "₹4-6 LPA"),
        Job("job015", "Systems Administrator", "Maintain and troubleshoot IT systems", "Hyderabad", "₹6-9 LPA"),
    ]
    jobs_collection.insert_many([job.to_dict() for job in predefined_jobs])

# Signup
@app.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()
    name = data['name']
    email = data['email']
    password = data['password']

    if users_collection.find_one({"email": email}):
        return jsonify({"message": "User already exists"}), 400

    hashed_password = generate_password_hash(password)
    user = User(name, email, hashed_password)
    users_collection.insert_one(user.to_dict())

    return jsonify({"message": "Signup successful"}), 201

# Login
@app.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data['email']
    password = data['password']

    user = users_collection.find_one({"email": email})
    if not user or not check_password_hash(user['password'], password):
        return jsonify({"message": "Invalid email or password"}), 401

    return jsonify({"message": "Login successful", "user_id": str(user['_id'])}), 200


# Job Routes
@app.route("/")
def home():
    return "Welcome to the Job Board Backend!"

# Get all jobs
@app.route("/jobs", methods=["GET"])
def get_jobs():
    jobs = list(jobs_collection.find())
    return jsonify(jobs), 200

@app.route('/apply', methods=['POST'])
def apply_job():
    data = request.get_json()
    user_id = data['user_id']
    job_id = data['job_id']

    existing_application = applications_collection.find_one({"user_id": user_id, "job_id": job_id})
    if existing_application:
        return jsonify({"message": "Already applied to this job"}), 400

    application = Application(user_id, job_id)
    applications_collection.insert_one(application.to_dict())

    return jsonify({"message": "Application submitted"}), 201

@app.route('/my-applications/<user_id>', methods=['GET'])
def get_my_applications(user_id):
    applications = list(applications_collection.find({"user_id": user_id}))
    applied_job_ids = [app['job_id'] for app in applications]
    applied_jobs = list(jobs_collection.find({"_id": {"$in": applied_job_ids}}, {'_id': 0}))

    return jsonify(applied_jobs), 200

if __name__ == "__main__":
    app.run(debug=True)