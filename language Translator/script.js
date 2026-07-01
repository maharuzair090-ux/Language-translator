const sourceText = document.getElementById("source-text");
const targetText = document.getElementById("target-text");
const sourceLang = document.getElementById("source-lang");
const targetLang = document.getElementById("target-lang");
const translateBtn = document.getElementById("translate-btn");
const copyBtn = document.getElementById("copy-btn");
const speakBtn = document.getElementById("speak-btn");

// 1. Translation Logic
translateBtn.addEventListener("click", () => {
    let text = sourceText.value.trim();
    let translateFrom = sourceLang.value;
    let translateTo = targetLang.value;

    if (!text) {
        targetText.value = "Please enter some text to translate.";
        return;
    }

    targetText.placeholder = "Translating...";
    
    // API URL formulation
    let apiUrl = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=${translateFrom}|${translateTo}`;

    // Fetching the API data
    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            targetText.value = data.responseData.translatedText;
        })
        .catch(error => {
            console.error("Error with translation:", error);
            targetText.value = "Translation error. Please try again.";
        });
});

// 2. Optional Feature: Copy Button
copyBtn.addEventListener("click", () => {
    if (targetText.value && targetText.value !== "Translating...") {
        navigator.clipboard.writeText(targetText.value);
        
        // Quick visual feedback
        let originalText = copyBtn.innerHTML;
        copyBtn.innerHTML = `<i class="fa-solid fa-check"></i> Copied!`;
        setTimeout(() => {
            copyBtn.innerHTML = originalText;
        }, 1500);
    }
});

// 3. Optional Feature: Text-To-Speech (Listen) Button
speakBtn.addEventListener("click", () => {
    if (targetText.value && targetText.value !== "Translating...") {
        let utterance = new SpeechSynthesisUtterance(targetText.value);
        utterance.lang = targetLang.value; // Tells the browser which language accent to use
        window.speechSynthesis.speak(utterance);
    }
});