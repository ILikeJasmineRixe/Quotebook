let darkMode = localStorage.getItem("darkMode");

if (darkMode === "True") {
    document.body.classList.add("dark");
    document.getElementById("checkbox").checked = true;
}
function develoeperToolsHehe() {
    localStorage.removeItem("darkMode");
}

// THE QUOTENATORQ!!!
async function fetchQuote() {
    let isGerman = document.getElementById("german").checked;
    let isNsfw = document.getElementById("nsfw").checked;
    let isEmil = document.getElementById("emil").checked;

    const response = await fetch(`/quote?german=${isGerman}&nsfw=${isNsfw}&emil=${isEmil}`);
    const data = await response.json();
    document.getElementById('quote').textContent = data.quote;
}
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