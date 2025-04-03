// DARK MODE TOGGLING
    let darkMode = localStorage.getItem("darkMode");
    const audio = new Audio("lightmode.mp3");
    audio.loop = true;

    if (darkMode === "True") {
        document.body.classList.add("dark");
        document.getElementById("checkbox").checked = true;
    } else {
        audio.play();
    }
    function develoeperToolsHehe() {
        localStorage.removeItem("darkMode");
    }



function adjustFontSize() {
    let quoteSpace = document.getElementById("quote");
    let fontSize = 34;
    quoteSpace.style.fontSize = fontSize + "px";

    //dEcrease font until it fits on screen
    while (quoteSpace.scrollHeight > quoteSpace.clientHeight || quoteSpace.scrollWidth > quoteSpace.clientWidth) {
        fontSize--;
        quoteSpace.style.fontSize = fontSize + "px";
        if (fontSize <= 12) break;
    }
}

// THE QUOTENATORQ!!!
async function fetchQuote() {
    let isBase = document.getElementById("base").checked;
    let isGerman = document.getElementById("german").checked;
    let isNsfw = document.getElementById("nsfw").checked;
    let isEmil = document.getElementById("emil").checked;

    const response = await fetch(`/quote?base=${isBase}&german=${isGerman}&nsfw=${isNsfw}&emil=${isEmil}`);
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
        audio.pause(); // Stop audio when dark mode is enabled and the user becomes a good human
        audio.currentTime = 0;
    } else {
        document.body.classList.remove("dark");
        localStorage.setItem("darkMode", "False");
        audio.play(); // I hate lightmode
    }
});

let beans = "beans.png";