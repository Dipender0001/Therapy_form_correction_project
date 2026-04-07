exports.handleChat = async (req, res) => {
    try {
        const { state, event, data, ai_feedback } = req.body;
        let botResponse = "";
        let nextState = state;

        switch (state) {
            case 'welcome':
                botResponse = "Hello! I’m the Move To Heal AI Assistant. I’m here to help you perform your physical therapy exercises safely by giving you real-time feedback on your form and counting your reps.\n\nTo get started, please tell me:\n1. What exercise or therapy are you planning to do today?\n2. Which body part are we focusing on?\n3. What is your current pain level on a scale of 0 to 10?";
                nextState = 'camera_setup';
                break;
            case 'camera_setup':
                botResponse = `Got it! We'll focus on your ${data?.bodyPart || 'target area'}. Before we start, let's get you set up. Please step back so your full body is visible in the camera frame.\n\nMake sure the room is well-lit and there's nothing blocking the camera's view of your legs and arms. Say 'Ready' when you are in position!`;
                nextState = 'ready_to_start';
                break;
            case 'ready_to_start':
                botResponse = `Perfect, I can see you clearly. We are ready to begin your ${data?.exercise || 'therapy'}. \n\nRemember to move slowly and within a comfortable range of motion. If you feel any sharp pain, stop immediately. Start whenever you are ready!`;
                nextState = 'in_progress';
                break;
            case 'in_progress':
                if (ai_feedback) {
                    botResponse = ai_feedback;
                } else if (event === 'completion') {
                    botResponse = `Awesome work! You've successfully completed your repetitions of ${data?.exercise || 'the exercise'}.\n\nHow are you feeling now? Has your pain level increased, decreased, or stayed the same compared to before we started?`;
                    nextState = 'summary';
                } else {
                    botResponse = "Keep going, you're doing great!";
                }
                break;
            case 'summary':
                botResponse = "I have saved today's progress to your dashboard. Your physiotherapist will be able to review your session. Great job today and see you next time!";
                nextState = 'welcome';
                break;
            default:
                botResponse = "I'm sorry, I didn't catch that. Do you want to start a session?";
                nextState = 'welcome';
        }

        res.status(200).json({ response: botResponse, state: nextState });

    } catch (err) {
        console.error("Chat Error:", err);
        res.status(500).json({ message: 'Error processing chat message', error: err.message });
    }
};
