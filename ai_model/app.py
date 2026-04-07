from flask import Flask, request, jsonify
from flask_cors import CORS
from pose_detector import PoseDetector
import cv2
import numpy as np
import base64

app = Flask(__name__)
CORS(app)

detector = PoseDetector()

@app.route('/analyze', methods=['POST'])
def analyze():
    try:
        data = request.json
        if not data or 'frame' not in data:
            return jsonify({"error": "No frame data provided"}), 400

        base64_img = data['frame']
        exercise_id = data.get('exerciseId', 'default')
        session_id = data.get('sessionId', 'default_session')
        
        if ',' in base64_img:
            base64_img = base64_img.split(',')[1]

        img_data = base64.b64decode(base64_img)
        np_arr = np.frombuffer(img_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        if img is None:
            return jsonify({"error": "Invalid image string"}), 400

        img = detector.find_pose(img, draw=False)
        landmarks = detector.get_position(img)
        
        accuracy, repCount, feedback, stage, errors = detector.analyze_form(landmarks, exercise_id, session_id)

        return jsonify({
            "accuracy": accuracy,
            "repCount": repCount,
            "feedback": feedback,
            "stage": stage,
            "errors": errors
        })

    except Exception as e:
        print(f"Error analyzing pose: {str(e)}")
        return jsonify({"error": "Internal server error analyzing pose"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001, debug=True)
