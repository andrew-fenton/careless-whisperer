import { useEffect, useState, useRef } from "react";
import VoiceController from "../controllers/VoiceController";
import MicIcon from '@mui/icons-material/Mic';

export default function VoiceButton() {
    // Web Speech API Config
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = (event: any) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`You said: ${speechResult}`);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
    };

    const handleClick = async () => {
        try {
            // Get microphone permissions
            if (SpeechRecognition) console.log("Browser supports speech recognition.");            
            recognition.start();
            console.log("Speech recognition started.");
        } catch (err) {
            console.error("Microphone permissions denied.", err);
        }
    };

    return (
        <MicIcon onClick={handleClick} />
    );
}