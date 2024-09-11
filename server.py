# Import necessary libraries
from flask import Flask, request, jsonify
import pickle
import os
from flask_cors import CORS #


# Initialize the Flask app
app = Flask(__name__)


CORS(app)

model_path = os.path.join(os.path.dirname(__file__), 'phishing.pkl') 

# Load your trained model
with open(model_path, 'rb') as model_file:
    loaded_model = pickle.load(model_file)

# Define the prediction route
@app.route('/predict', methods=['POST'])
def predict():
    # Extract the URL from the incoming JSON data
    data = request.get_json(force=True)
    url = data['url']

    # Preprocess the URL and extract features (this step depends on your model's training process)
    # For example, you might have a function `extract_features(url)` that transforms the URL into feature vectors
    #features = extract_features(url)

    # Make a prediction using the loaded model
    prediction_prob = list(loaded_model.predict([url]))[0] # Probability of phishing
    

    # Return the prediction as a JSON response
    return jsonify({"phishing_prob": prediction_prob})

def extract_features(url):
    # Implement the feature extraction logic based on how you trained your model
    # Example (simplified):
    # Return a feature vector for the given URL
    # For simplicity, this could just be a placeholder function for now
    return [len(url), int('.' in url), int('-' in url)]  # Example features

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)

