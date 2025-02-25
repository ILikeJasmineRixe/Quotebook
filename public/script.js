// DARK MODE TOGGLING
    let darkMode = localStorage.getItem("darkMode");

    if (darkMode === "True") {
        document.body.classList.add("dark");
        document.getElementById("checkbox").checked = true;
    }
    function develoeperToolsHehe() {
        localStorage.removeItem("darkMode");
    }



function adjustFontSize() {
    let quoteSpace = document.getElementById("quote");
    let fontSize = 36; // Starting font size
    quoteSpace.style.fontSize = fontSize + "px";

    // Decrease font size until it fits
    while (quoteSpace.scrollHeight > quoteSpace.clientHeight || quoteSpace.scrollWidth > quoteSpace.clientWidth) {
        fontSize--;
        quoteSpace.style.fontSize = fontSize + "px";
        if (fontSize <= 12) break; // Prevents text from getting too small
    }
}

// THE QUOTENATORQ!!!
async function fetchQuote() {
    let isGerman = document.getElementById("german").checked;
    let isNsfw = document.getElementById("nsfw").checked;
    let isEmil = document.getElementById("emil").checked;

    const response = await fetch(`/quote?german=${isGerman}&nsfw=${isNsfw}&emil=${isEmil}`);
    const data = await response.json();
    document.getElementById('quote').textContent = data.quote;
    adjustFontSize();
}

document.addEventListener("DOMContentLoaded", adjustFontSize);

const checkbox = document.getElementById("checkbox");
checkbox.addEventListener("change", () => {

    if (checkbox.checked) {
        document.body.classList.add("dark");
        localStorage.setItem("darkMode", "True");
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "False");
    }
});