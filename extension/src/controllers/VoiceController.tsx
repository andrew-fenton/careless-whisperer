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

    onResult(callback: (event: any) => void) {
        this.speech.onresult = callback;
    }

    onError(callback: (event: any) => void) {
        this.speech.onerror = callback;
    }
}

export default VoiceController;