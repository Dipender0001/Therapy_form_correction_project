# Move To Heal - Real Time AI Based Physical Therapy Form Correction

## Full-Stack Architecture
This app integrates:
1. **React Frontend**: UI, WebCam access, Axios API Service
2. **Node.js + Express Backend**: Handles Auth, Database (MongoDB), validates session info
3. **Python Flask AI Service**: Receives frame base64 via node proxy, runs MediaPipe, returns angles + feedback

## Prerequisites
- Node.js (v18+)
- Python (3.9+)
- MongoDB running on `mongodb://localhost:27017/movetoheal`

## Step-by-Step Run Instructions

1. **Start the AI Microservice**
   ```bash
   cd ai_model
   pip install -r requirements.txt
   python app.py
   ```
   *Runs on http://localhost:5001*

2. **Start the Backend Node.js API**
   ```bash
   cd backend
   npm install
   npm start # or npm run dev
   ```
   *Runs on http://localhost:5000 (Set PORT=5000 in .env)*

3. **Start the Frontend React App**
   ```bash
   cd frontend
   npm install
   npm run dev
   ```
   *Runs on http://localhost:5173*


## API Request Example

`POST /api/session/analyze-frame` (Backend Proxy Request)
**Headers:**
`Authorization: Bearer <jwt_token>`
**Body:**
```json
{
  "frame": "data:image/jpeg;base64,...",
  "exerciseId": "squat-123",
  "sessionId": "abc-456"
}
```

**Response (from AI via backend):**
```json
{
  "accuracy": 85.0,
  "repCount": 1,
  "stage": "up",
  "feedback": ["Straighten your arm fully on the way down"],
  "errors": { "armNotStraight": true }
}
```

## Common Errors & Fixes
- **CORS Error**: Ensure both Flask and Express have `cors()` middleware active.
- **Port Conflicts**: Backend is on port 5000, AI on 5001. Check your .env config if they clash.
- **MediaPipe Crash**: Ensure you are sending a valid base64 image (stripped of `data:image/jpeg;base64,` header inside python).
- **Webcam access denied**: Accept camera permissions in the browser (`localhost` is allowed to ask for camera access without HTTPS).

## Future Improvements
- Implement specific angle logic for other exercises (Squats, Lunges, Knee bends) in `pose_detector.py`.
- Enhance the Progress charts using Recharts in the React dashboard.
- Create an Admin panel to track multiple patients' histories.
