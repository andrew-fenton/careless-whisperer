import { useEffect, useState, useRef } from "react";
import VoiceController from "../controllers/VoiceController";
import MicIcon from '@mui/icons-material/Mic';

export default function VoiceButton() {
    const [isVoiceActive, setIsVoiceActive] = useState(false);

    // Web Speech API Config
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = true;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`You said: ${speechResult}`);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
    };

    const handleClick = async () => {
        if (!isVoiceActive) {
            try {
                if (SpeechRecognition) console.log("Browser supports speech recognition.");

                // navigator.permissions.query({ name: "microphone" as PermissionName }).then((result) => {
                //     if (result.state === 'denied' || result.state === 'prompt') {
                //         console.log("Requesting microphone permission...");
                //     } else if (result.state === 'granted') {
                //         console.log("Microphone permission already granted.");
                //     }
                // });                

                // await navigator.mediaDevices.getUserMedia({ audio: true });

                setIsVoiceActive(true);
                recognition.start();
                console.log("Speech recognition started.");
            } catch (err) {
                console.error("Microphone permissions denied.", err);
            }
        } else {
            recognition.stop();
            console.log("Speech recognition stopped.");
            setIsVoiceActive(false);
        }
    };

    return (
        <MicIcon onClick={handleClick} />
    );
}