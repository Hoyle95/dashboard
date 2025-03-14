const version = 0.1;
const quotes = ["The journey of a thousand clicks begins with a single search.","Seeking the answers to the universe... or just lunch.","Curiosity didn’t just kill the cat. It powered the internet.","Adventure begins with a search.","Search, explore, discover...","Great minds search alike.","What knowledge do you seek today?","Let the search begin...","Unveiling the mysteries, one search at a time.","What’s out there waiting to be discovered?","In the search for knowledge, every click counts.","Dare to wonder, then search to discover."];
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
let searchInput, clockValue, dateValue, engine, settings, searchSelect, searchdd, settingsButton, settingsPanel, settingsForm;

if ("settings" in localStorage) {
    settings = JSON.parse(localStorage.getItem("settings"));
	if (settings.version != version) {
		localStorage.removeItem("settings");
		location.reload();
	}
	console.log(settings);
} else {
    settings = {
		"version": version,
        "bg": "https://cdn.pixabay.com/photo/2022/04/09/22/29/art-7122353_1280.jpg",
        "h24": false,
        "lastEngine": "ddg"
    };
    save();
}

function update() {
    const td = new Date();
    const month = months[td.getMonth()];
    const day = days[td.getDay()];
    dateValue.innerText = `${day} ${String(td.getDate()).padStart(2, "0")} ${month}`;
    const hours = td.getHours();
    const mins = td.getMinutes();
    const seconds = td.getSeconds();
    const am = hours > 12 ? "PM" : "AM";
	clockValue.innerText = settings.h24 ? `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(seconds).padStart(2, "0")}` : `${String(hours > 12 ? hours-12 : hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}:${String(seconds).padStart(2, "0")} ${am}`;
}

addEventListener("DOMContentLoaded", (e) => {
	settingsPanel = document.querySelector("#settingsPanel");
	settingsButton = document.querySelector("#settingsButton");
	settingsButton.addEventListener('click', () => {toggleDisplay(settingsPanel);});
    searchInput = document.querySelector("#searchInput");
    searchInput.addEventListener('keydown', (e) => {if (e.key === 'Enter') {search();}});
    searchSelect = document.querySelector("#search-selector");
    searchdd = document.querySelector("#search-dropdown");
    searchSelect.addEventListener('click', () => {toggleDisplay(searchdd);});
    clockValue = document.querySelector("#clockValue");
    dateValue = document.querySelector("#dateValue");
	settingsForm = document.querySelector("#settingsForm");
    document.querySelector("body").style.backgroundImage = `url(${settings.bg})`;
    searchInput.placeholder = quotes[Math.floor(Math.random() * quotes.length)];
    update();
    setInterval(update, 1000);
	selectSE(settings.lastEngine);

	settingsForm.addEventListener('submit', (e) => {
		e.preventDefault()
		let data = new FormData(e.target)

		const formObject = {};
		data.forEach((value, key) => {
	        formObject[key] = value;
	    });
		console.log(formObject);

		settings.h24 = formObject.clockType == "24" ? true : false;

		if (formObject.bg != "") {
			settings.bg = formObject.bg;
		}

		save();
		location.reload();
	});
});

addEventListener("load", (e) => {
    document.querySelector("#loading").style.display = "none";
});

function selectSE(e) {
    engine = e;
    let img = document.getElementById("selected");
    switch(engine) {
        case "google":
            img.src = "./images/google.ico";
            break;
        case "youtube":
            img.src = "./images/youtube.ico";
            break;
        case "reddit":
            img.src = "./images/reddit.ico";
            break;
        case "ddg":
            img.src = "./images/ddg.ico";
            break;
		case "github":
            img.src = "./images/github.ico";
            break;
		case "pixabay":
			img.src = "./images/pixabay.ico";
			break;
    }
    settings.lastEngine = engine;
    save();
    searchInput.focus();
}

function search() {
    if (searchInput.value != "") {
        switch(engine) {
            case "google":
                window.location.href = `https://www.google.com/search?q=${searchInput.value}`;
                break;
            case "youtube":
                window.location.href = `https://www.youtube.com/results?search_query=${searchInput.value}`;
                break;
            case "reddit":
                window.location.href = `https://www.reddit.com/search/?q=${searchInput.value}`;
                break;
            case "ddg":
                window.location.href = `https://duckduckgo.com/?q=${searchInput.value}`;
                break;
			case "github":
                window.location.href = `https://github.com/search?q=${searchInput.value}`;
                break;
			case "pixabay":
				window.location.href = `https://pixabay.com/images/search/${searchInput.value}`;
				break;
        }
    }
}

function save() {
    localStorage.setItem("settings", JSON.stringify(settings));
}

function toggleDisplay(e) {
    e.style.display = e.style.display == "flex" ? "none" : "flex"
}
