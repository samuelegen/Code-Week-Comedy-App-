import { showCardDetails } from "./buttons.js";

const container = document.querySelector(".container");
const listEl = document.createElement("div");
listEl.className = "listContainer";
container.append(listEl);

export function createElement(items) {
	listEl.innerHTML = "";
	items.forEach((item) => {
		if (!item || !item.id) {
			console.error("Elemento non valido:", item);
			return;
		}

		const listItemEl = document.createElement("div");
		listItemEl.className = "listItems";
		// Imposta l'immagine di sfondo
		listItemEl.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`;

		const btnStar = document.createElement("img");
		btnStar.className = "buttonFavorites";
		btnStar.src = "./img/star.svg";
		btnStar.addEventListener("click", (e) => {
			e.stopPropagation();

			if (item && item.id) {
				console.log("Aggiunto ai preferiti:", item);
				aggiungiAiPreferiti(item);
				btnStar.style.display = "flex";
			} else {
				console.error("Elemento non valido al click del bottone:", item);
			}
		});

		const titleEl = document.createElement("h2");
		titleEl.className = "titleTxt";
		titleEl.textContent = item.title;

		const poster = document.createElement("img");
		poster.className = "posterImg";
		poster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

		listItemEl.append(btnStar, titleEl, poster);
		listEl.append(listItemEl);

		listItemEl.addEventListener("click", () => {
			showCardDetails(item);
		});
	});
}

function aggiungiAiPreferiti(item) {
	if (!item || !item.id) {
		console.error("Elemento non valido all'aggiunta ai preferiti:", item);
		return;
	}

	let preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];
	preferiti = preferiti.filter((fav) => fav && fav.id); // Filtra elementi non validi

	if (!preferiti.find((fav) => fav.id === item.id)) {
		preferiti.push(item);
		localStorage.setItem("preferiti", JSON.stringify(preferiti));
		alert("Aggiunto ai preferiti!");
	} else {
		alert("Già nei preferiti!");
	}
}

document.querySelector(".starIcon").addEventListener("click", mostraPreferiti);

function mostraPreferiti() {
	let preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];
	preferiti = preferiti.filter((fav) => fav && fav.id); // Filtra elementi non validi
	listEl.innerHTML = "";
	preferiti.forEach((item) => {
		if (!item || !item.id) {
			console.error("Elemento non valido nei preferiti:", item);
			return;
		}

		const listItemEl = document.createElement("div");
		listItemEl.className = "listItems";
		listItemEl.style.backgroundImage = `url(https://image.tmdb.org/t/p/w500${item.backdrop_path})`;

		const btnStar = document.createElement("img");
		btnStar.className = "buttonFavorites";
		btnStar.src = "./img/star.svg";
		btnStar.addEventListener("click", (event) => {
			event.stopPropagation();
			if (item && item.id) {
				rimuoviDaiPreferiti(item);
			} else {
				console.error(
					"Elemento non valido al click del bottone nei preferiti:",
					item
				);
			}
		});

		const titleEl = document.createElement("h2");
		titleEl.className = "titleTxt";
		titleEl.textContent = item.title;

		const poster = document.createElement("img");
		poster.className = "posterImg";
		poster.src = `https://image.tmdb.org/t/p/w500${item.poster_path}`;

		listItemEl.append(btnStar, titleEl, poster);
		listEl.append(listItemEl);

		listItemEl.addEventListener("click", () => {
			showCardDetails(item);
		});
	});
}

function rimuoviDaiPreferiti(item) {
	if (!item || !item.id) {
		console.error("Elemento non valido alla rimozione dai preferiti:", item);
		return;
	}

	let preferiti = JSON.parse(localStorage.getItem("preferiti")) || [];
	preferiti = preferiti.filter((fav) => fav && fav.id); // Filtra elementi non validi
	preferiti = preferiti.filter((fav) => fav.id !== item.id);
	localStorage.setItem("preferiti", JSON.stringify(preferiti));
	mostraPreferiti();
}
