import cv2
from pose_detector import PoseDetector

def main():
    cap = cv2.VideoCapture(0)
    
    # Initialize detector
    detector = PoseDetector()
    
    while True:
        success, img = cap.read()
        if not success:
            print("Failed to capture image")
            break
        

        # Process the image for pose
        img = detector.find_pose(img)
        landmarks = detector.get_position(img)
        
        # Analyze formulation (e.g. Bicep Curl / Arm Raise)
        accuracy, feedback, angles = detector.analyze_form(landmarks)

        # Draw accuracy and feedback on the frame
        cv2.putText(img, f"Accuracy: {accuracy}%", (50, 50), cv2.FONT_HERSHEY_SIMPLEX, 1, (0, 255, 0) if accuracy > 85 else (0, 0, 255), 3)
        cv2.putText(img, f"Feedback: {feedback}", (50, 100), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 0, 0), 3)

        # Draw specific angles (optional)
        if "elbow" in angles:
            cv2.putText(img, f"Elbow: {angles['elbow']}", (50, 150), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)
        if "knee" in angles:
            cv2.putText(img, f"Knee: {angles['knee']}", (50, 200), cv2.FONT_HERSHEY_SIMPLEX, 1, (255, 255, 0), 2)

        cv2.imshow("Move to Heal - AI Tracker Demo", img)
        
        # Press 'q' to quit
        if cv2.waitKey(1) & 0xFF == ord('q'):
            break
            
    cap.release()
    cv2.destroyAllWindows()

if __name__ == "__main__":
    main()
