import { useEffect, useState, useRef } from "react";
import VoiceController from "../controllers/VoiceController";
import MicIcon from '@mui/icons-material/Mic';

export default function VoiceButton() {
    const [isVoiceActive, setIsVoiceActive] = useState(false);
    const voiceControllerRef = useRef(new VoiceController());

    const handleClick = () => {
        const voiceController = voiceControllerRef.current;
        if (!isVoiceActive) {
            setIsVoiceActive(true);
            voiceController.startVoiceRecording();
        } else {
            voiceController.stopVoiceRecording();
            setIsVoiceActive(false);
        }
    };

    useEffect(() => {
        if (isVoiceActive) {
            const handleResult = (result: any) => {
                console.log(result)
            };
            voiceControllerRef.current.onResult(handleResult);
        }
    }, [isVoiceActive]);

    return (
        <MicIcon onClick={handleClick} />
    );
}