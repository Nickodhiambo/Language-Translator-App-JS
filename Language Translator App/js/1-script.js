const selectTag = document.querySelectorAll("select");
const translateBtn = document.querySelector("button");
const fromText = document.querySelector(".from-text");
const toText = document.querySelector(".to-text");
const exchangeIcon = document.querySelector(".exchange");
const icons = document.querySelectorAll(".icons i");

selectTag.forEach((tag, id) => {
    for (country_code in countries){
        let selected;
        if (id === 0 && country_code === "en-US"){
            selected = "selected";
        } else if (id === 1 && country_code === "hi-IN"){
            selected = "selected";
        }
        let option = `<option value="${country_code}" ${selected}>${countries[country_code]}</option>`
        tag.insertAdjacentHTML("beforeend", option);
    }
});

exchangeIcon.addEventListener("click", () => {
    let tempText = fromText.value;
    let tempLang = selectTag[0].value;
    fromText.value = toText.value;
    selectTag[0].value = selectTag[1].value;
    toText.value = tempText;
    selectTag[1].value = tempLang;
})

// Translate text to language of choice
translateBtn.addEventListener("click", async () => {
    let text = fromText.value
    if (!text) return;
    toText.setAttribute("placeholder", "Translating...");
    translateFrom = selectTag[0].value;
    translateTo = selectTag[1].value;
    const apiURL = ""
    try{
        const response = await (await fetch(apiURL)).json();
        if (response.status !== "ok"){
            console.log("Couldn't find resource");
        }
        toText.value = response.responseData.translatedText;
        toText.setAttribute("placeholder", "Translation");
    } catch(error) {
        console.log("Failed to fetch!");
    }
})

icons.forEach(icon => {
    icon.addEventListener("click", (e) => {
        if (icon.classList.contains("fa-copy")){
            if (e.target.id == "from"){
                navigator.clipboard.writeText(fromText.value); // Copy translate to clipboard
            } else{
                navigator.clipboard.writeText(toText.value); // Copy translated text to clipboard
            }
        } else {
            let utterance;
            if (e.target.id === "from"){
                utterance = new SpeechSynthesisUtterance(fromText.value); // Send speech request to web speech API
                utterance.lang = (selectTag[0]); // Set speech language to selected value
            } else {
                utterance = new SpeechSynthesisUtterance(toText.value);
                utterance.lang = (selectTag[1]);
            }
            speechSynthesis.speak(utterance); // Utter text values from textareas
        }
    });
});