const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".row i");

selectTag.forEach((tag, id) => {
    for (const country_code in countries){
        // Set English as the default FROM language and Hindi as the default TO language
        let selected;
        if (id === 0 && country_code === "en-GB"){
            selected = "selected";
        } else if (id === 1 && country_code === "ne-NP"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option) // Adding options inside select tag
    }
});

// Swap translate and translated texts with the exchange icon
exchangeIcon.addEventListener("click", () => {
    let tempText = fromText;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
});

translateBtn.addEventListener("click", async () => {
    let text = fromText.value;
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...")
    const apiURL = "";
    const response = await (await fetch(apiURL)).json();
    toText.value = response.responseData.translatedText;
    toText.setAttribute("placeholder", "Translation");
});

icons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        if (e.target.classList.contains("fa-copy")){
            if (e.target.id === "from"){
                navigator.clipboard.writeText(fromText.value);
            } else {
                navigator.clipboard.writeText(toText.value);
            }
        } else {
            let utterance;
            if (e.target.id === "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value); // Send a speech request to web speech API
                utterance.lang = selectTag[0].value; // Set the language of the translate speech
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value); // Send a speech request to web speech API
                utterance.lang = selectTag[1].value; // Set the languate of the translated speech
            }
            speechSynthesis.speak(utterance); // Voice the speech
        }
    });
});