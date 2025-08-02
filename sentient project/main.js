let speech = new SpeechSynthesisUtterance();

let voices = [];

let voiceSelect = document.querySelector("select");
function warmUpSpeechEngine() {
    const silentUtterance = new SpeechSynthesisUtterance(" ");
    silentUtterance.volume = 0;
    window.speechSynthesis.speak(silentUtterance);
}


// Load voices and populate dropdown
function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    if (voices.length === 0) return;

    speech.voice = voices[0];

    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        voiceSelect.options[i] = new Option(`${voice.name} (${voice.lang})`, i);
    });
}
populateVoices();

window.speechSynthesis.onvoiceschanged = populateVoices;

voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});
document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(speech);
});
document.getElementById("pauseBtn").addEventListener("click", () => {
    if (window.speechSynthesis.speaking && !window.speechSynthesis.paused) {
        window.speechSynthesis.pause();
    }
});

document.getElementById("resumeBtn").addEventListener("click", () => {
    if (window.speechSynthesis.paused) {
        window.speechSynthesis.resume();
    }
});

document.getElementById("cancelBtn").addEventListener("click", () => {
    window.speechSynthesis.cancel();
});
window.addEventListener("load", () => {
  const primeUtterance = new SpeechSynthesisUtterance(" ");
  primeUtterance.volume = 0;          // Silent
  primeUtterance.rate = 1;
  primeUtterance.pitch = 1;
  primeUtterance.voice = speechSynthesis.getVoices()[0] || null; // fallback safe
  speechSynthesis.speak(primeUtterance);
});
document.getElementById("resumeBtn").addEventListener("click", () => {
  if (window.speechSynthesis.paused) {
    window.speechSynthesis.resume();
    console.log("Speech resumed");
  } else {
    console.log("Cannot resume: speech not paused");
  }
});

