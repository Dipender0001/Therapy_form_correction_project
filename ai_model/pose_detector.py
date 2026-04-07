import cv2
import mediapipe as mp
import numpy as np

class PoseDetector:
    def __init__(self, static_image_mode=False, model_complexity=1, smooth_landmarks=True, min_detection_confidence=0.5, min_tracking_confidence=0.5):
        self.mp_drawing = mp.solutions.drawing_utils
        self.mp_pose = mp.solutions.pose
        self.pose = self.mp_pose.Pose(
            static_image_mode=static_image_mode,
            model_complexity=model_complexity,
            smooth_landmarks=smooth_landmarks,
            min_detection_confidence=min_detection_confidence,
            min_tracking_confidence=min_tracking_confidence
        )
        # Store state for different sessions
        self.sessions = {}

    def find_pose(self, img, draw=True):
        img_rgb = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
        self.results = self.pose.process(img_rgb)
        
        if self.results.pose_landmarks and draw:
            self.mp_drawing.draw_landmarks(
                img, 
                self.results.pose_landmarks, 
                self.mp_pose.POSE_CONNECTIONS,
                self.mp_drawing.DrawingSpec(color=(245, 117, 66), thickness=2, circle_radius=2),
                self.mp_drawing.DrawingSpec(color=(245, 66, 230), thickness=2, circle_radius=2)
            )
        return img

    def get_position(self, img):
        self.landmarks_list = []
        if self.results.pose_landmarks:
            h, w, c = img.shape
            for id, lm in enumerate(self.results.pose_landmarks.landmark):
                cx, cy = int(lm.x * w), int(lm.y * h)
                self.landmarks_list.append([id, cx, cy])
        return self.landmarks_list

    def calculate_angle(self, a, b, c):
        """ Calculates the angle between three points a, b, c. """
        a = np.array(a)
        b = np.array(b)
        c = np.array(c)
        
        radians = np.arctan2(c[1]-b[1], c[0]-b[0]) - np.arctan2(a[1]-b[1], a[0]-b[0])
        angle = np.abs(radians*180.0/np.pi)
        
        if angle > 180.0:
            angle = 360 - angle
            
        return angle

    def analyze_form(self, landmarks_list, exercise_id, session_id):
        if session_id not in self.sessions:
            self.sessions[session_id] = {"repCount": 0, "stage": "down"}

        state = self.sessions[session_id]
        
        if len(landmarks_list) == 0:
            return 0, state["repCount"], ["No person detected"], state["stage"], {"noPerson": True}

        try:
            # Example: Basic tracking for Arm Raise / Bicep Curl
            # In a real app, logic branches based on exercise_id
            shoulder = landmarks_list[11][1:]
            elbow = landmarks_list[13][1:]
            wrist = landmarks_list[15][1:]
            hip = landmarks_list[23][1:]
            knee = landmarks_list[25][1:]
            ankle = landmarks_list[27][1:]
            
            elbow_angle = self.calculate_angle(shoulder, elbow, wrist)
            knee_angle = self.calculate_angle(hip, knee, ankle)
            
            accuracy = 100
            feedback = []
            errors = {}

            # Logic for Bicep Curl
            if elbow_angle > 160:
                if state["stage"] == "up":
                    state["stage"] = "down"
            if elbow_angle < 30 and state["stage"] == "down":
                state["stage"] = "up"
                state["repCount"] += 1
                
            if 30 <= elbow_angle <= 160:
                accuracy = 85
                feedback.append("Straighten your arm fully on the way down")
                errors["armNotStraight"] = True
            else:
                feedback.append("Good form")

            return round(accuracy, 2), state["repCount"], feedback, state["stage"], errors

        except Exception as e:
            print("Error parsing landmarks:", e)
            return 0, state["repCount"], ["Error analyzing form"], state["stage"], {"parsingError": True}
