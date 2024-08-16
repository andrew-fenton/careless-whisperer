declare global {
    interface Window {
        SpeechRecognition: any;
        webkitSpeechRecognition: any;
    }
}

class VoiceController {
    speech: any

    constructor() {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        this.speech = new SpeechRecognition();
        this.speech.lang = 'en-US';
        this.speech.interimResults = false;
        this.speech.maxAlternatives = 1;
    }

    startVoiceRecording() {
        console.log("voice recording started")
        this.speech.start();
    }

    stopVoiceRecording() {
        console.log("voice recording stopped")
        this.speech.stop();
    }

    getTranscript(callback: (transcript: string) => void) {
        this.speech.onresult = (event: any) => {
            let transcript = '';
            for (let i = event.resultIndex; i < event.results.length; i++) {
                transcript += event.results[i][0].transcript;
            }
            callback(transcript);
        };
    }

    onError(callback: (event: any) => void) {
        this.speech.onerror = callback;
    }
}

export default VoiceController;