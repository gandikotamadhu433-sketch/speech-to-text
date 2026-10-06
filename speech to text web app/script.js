const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");
const clearBtn = document.getElementById("clearBtn");
const speakBtn = document.getElementById("speakBtn");

const textBox = document.getElementById("textBox");
const status = document.getElementById("status");


// Check browser support
const SpeechRecognition =
    window.SpeechRecognition || window.webkitSpeechRecognition;

if (!SpeechRecognition) {

    status.innerText =
        "Speech recognition is not supported in this browser.";

    startBtn.disabled = true;

} else {

    const recognition = new SpeechRecognition();

    // Settings
    recognition.continuous = true;
    recognition.interimResults = true;

    // Language
    recognition.lang = "en-US";


    // Start speaking
    startBtn.addEventListener("click", () => {

        recognition.start();

        status.innerText = "🎤 Listening... Please speak.";

    });


    // Stop speaking
    stopBtn.addEventListener("click", () => {

        recognition.stop();

        status.innerText = "⏹ Speech recognition stopped.";

    });


    // Speech result
    recognition.addEventListener("result", (event) => {

        let finalTranscript = "";

        for (
            let i = event.resultIndex;
            i < event.results.length;
            i++
        ) {

            const transcript =
                event.results[i][0].transcript;

            if (event.results[i].isFinal) {

                finalTranscript += transcript + " ";

            }

        }

        textBox.value += finalTranscript;

    });


    // Recognition ended
    recognition.addEventListener("end", () => {

        status.innerText =
            "Recognition ended. Click Start Speaking to continue.";

    });


    // Error handling
    recognition.addEventListener("error", (event) => {

        status.innerText =
            "Error: " + event.error;

    });

}


// Clear text
clearBtn.addEventListener("click", () => {

    textBox.value = "";

    status.innerText = "Text cleared.";

});


// Read text aloud
speakBtn.addEventListener("click", () => {

    const text = textBox.value.trim();

    if (text === "") {

        alert("Please enter or speak some text first.");

        return;

    }

    const speech = new SpeechSynthesisUtterance(text);

    speech.lang = "en-US";

    speech.rate = 1;

    speech.pitch = 1;

    window.speechSynthesis.speak(speech);

});