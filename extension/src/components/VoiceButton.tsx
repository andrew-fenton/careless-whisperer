import React, { useState, useEffect } from 'react';
import { IconButton } from '@mui/material';
import MicIcon from '@mui/icons-material/Mic';
import MicOffIcon from '@mui/icons-material/MicOff';
import { keyframes } from '@emotion/react';

declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

interface VoiceButtonProps {
    setInputValue: (text: string) => void; // Update the inputValue in ChatBox
    setOngoingVoiceInput: (text: string) => void; // Update ongoing voice input
}

const pulse = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 123, 255, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 123, 255, 0);
  }
`;

export default function VoiceButton({ setInputValue, setOngoingVoiceInput }: VoiceButtonProps) {
    const [isMicActive, setIsMicActive] = useState(false);
    const [recognition, setRecognition] = useState<any>(null);
    const [prevValue, setPrevValue] = useState<string>(''); // Track the previous value
    const [stopTimer, setStopTimer] = useState<NodeJS.Timeout | null>(null); // Timer for delaying stop

    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        if (SpeechRecognition) {
            const recognitionInstance = new SpeechRecognition();
            recognitionInstance.lang = 'en-US';
            recognitionInstance.interimResults = true;
            recognitionInstance.maxAlternatives = 1;

            recognitionInstance.onresult = (event: any) => {
                const speechResult = event.results[0][0].transcript;
                const isFinal = event.results[0].isFinal;
                console.log(`You said: ${speechResult}`);

                if (isFinal) {
                    const updatedValue = prevValue + speechResult; // Combine previous input with current speech result
                    setPrevValue(''); // Reset prevValue after sending message
                    setInputValue(updatedValue); // Update the inputValue with combined result
                    setOngoingVoiceInput(''); // Clear ongoing input on final result
                } else {
                    setOngoingVoiceInput(speechResult); // Show ongoing input while speaking
                }
            };

            recognitionInstance.onerror = (event: any) => {
                console.error("Speech recognition error:", event.error);
                setIsMicActive(false);
            };

            recognitionInstance.onend = () => {
                if (stopTimer) {
                    clearTimeout(stopTimer);
                }
                setIsMicActive(false);
            };

            setRecognition(recognitionInstance);
        }
    }, [setInputValue, setOngoingVoiceInput, prevValue, stopTimer]);

    const handleClick = async () => {
        try {
            if (!isMicActive && recognition) {
                setIsMicActive(true);
                recognition.start();
                console.log("Speech recognition started.");
            } else if (recognition) {
                // Start a timer to delay stopping the recording
                if (stopTimer) {
                    clearTimeout(stopTimer);
                }
                setStopTimer(setTimeout(() => {
                    recognition.stop();
                    setIsMicActive(false);
                }, 2000)); // Adjust this delay as needed
            }
        } catch (err) {
            console.error("Microphone permissions denied.", err);
            setIsMicActive(false);
        }
    };

    return (
        <IconButton
            onClick={handleClick}
            sx={{
                position: 'relative',
                color: isMicActive ? 'secondary.main' : 'primary.main',
                backgroundColor: isMicActive ? 'rgba(0, 123, 255, 0.1)' : 'transparent',
                animation: isMicActive ? `${pulse} 0.8s infinite` : 'none',
                '&:hover': {
                    backgroundColor: 'rgba(0, 123, 255, 0.2)',
                },
                borderRadius: '50%',
            }}
        >
            {isMicActive ? <MicOffIcon /> : <MicIcon />}
        </IconButton>
    );
}