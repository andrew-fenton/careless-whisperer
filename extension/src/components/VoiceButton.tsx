import MicIcon from '@mui/icons-material/Mic';
import { useEffect, useState } from 'react';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface VoiceButtonProps {
    handleSendMessage: (message: string) => Promise<void>;
  }

export default function VoiceButton({ handleSendMessage }: VoiceButtonProps) {
    const [isMicActive, setIsMicActive] = useState(false);

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = 'en-US';
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onresult = async (event: any) => {
        const speechResult = event.results[0][0].transcript;
        console.log(`You said: ${speechResult}`);
        await handleSendMessage(speechResult);
        setIsMicActive(isMicActive);
    };

    recognition.onerror = (event: any) => {
        console.error("Speech recognition error:", event.error);
    };

    const handleClick = async () => {
        try {
            if (!isMicActive) {
                setIsMicActive(true);
                recognition.start();
                console.log("Speech recognition started.");
            } else {
                recognition.stop();
                setIsMicActive(false);
            }
        } catch (err) {
            console.error("Microphone permissions denied.", err);
        }
    };

    return (
        <MicIcon
            onClick={handleClick}
            sx={{
                cursor: 'pointer',
                color: isMicActive ? 'red' : 'inherit',
            }}
        />
    );
}