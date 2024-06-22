import { render } from "./index.js";
import "./GeneratorCard.js";
// Selezioniamo i button che ci fanno scorrere tra le pagine
const containerBtn = document.querySelector(".containerBtnPage");
const Btn_back = document.createElement("button");
Btn_back.className = "buttonback";
Btn_back.textContent = "BACK";
const Btn_next = document.createElement("button");
Btn_next.className = "button_next";
Btn_next.textContent = "NEXT";
containerBtn.append(Btn_back, Btn_next);

// Selezioniamo gli elementi della modale
const btnUser = document.querySelector(".userIcon");
let modal = document.getElementById("myModal");
let closeModal = document.querySelector(".closeBtn");

// Selezioniamo tutti gli elementi necessari per poter utilizzare le funzioni di local storage
const inputUserLog = document.querySelector(".inputUser");
const inputLog = document.querySelector(".inputUserLog");
const inputPassLog = document.querySelector(".inputPassUser");
const Logpass = document.querySelector(".inputPassUserLog");
const textModal = document.querySelector(".textModal");
const btnSign = document.querySelector(".sign");
const contentSign = document.querySelector(".signIn");
const btnLog = document.querySelector(".log");
const contentLogIn = document.querySelector(".logIn");

// Bottoni per accedere al campo di compilazione
const btnSignAccess = document.querySelector(".signAccess");
const btnLogAccess = document.querySelector(".logAccess");

// Selezioniamo gli elementi per aprire la finestra delle categorie
const btnOpenCategory = document.getElementById("categoryBtn");
const pannello = document.querySelector(".panel");

// selezioniamo gli elementi per poter mandare a schermo i film commedia italiana
const comedyIt = document.querySelector(".commediaIT");

// Selezioniamo il titolo principale per ritornare alla home
const titleHome = document.querySelector(".title");

// Funzione standard per chiudere la modale
closeModal.onclick = function () {
	modal.style.display = "none";
};

// Button per lo switch delle pagine
const currentPageEl = document.getElementById("currentPage");
let page = 1;

const updateCurrentPage = () => {
	currentPageEl.textContent = `Pagina ${page}`;
};

Btn_back.addEventListener("click", () => {
	if (page > 1) {
		page--;
		render(page);
		updateCurrentPage();
		console.log(page);
	}
});

Btn_next.addEventListener("click", () => {
	page++;
	render(page);
	updateCurrentPage();
	console.log(page);
});

// Button che apre la modale per l'accesso
btnUser.addEventListener("click", () => {
	modal.style.display = "block";
	contentLogIn.style.display = "none";
	contentSign.style.display = "none";
	btnSign.style.display = "none";
	btnLog.style.display = "none";
	textModal.textContent = "Registrati o Accedi";
	btnLogAccess.style.display = "block";
	btnSignAccess.style.display = "block";
});

btnSignAccess.addEventListener("click", () => {
	contentSign.style.display = "flex";
	btnLog.style.display = "none";
	btnSignAccess.style.display = "none";
	btnSign.style.display = "block";
	btnLogAccess.style.display = "none";
	textModal.textContent = "Registrati";
});

btnSign.addEventListener("click", () => {
	contentSign.style.display = "flex";
	const username = inputUserLog.value;
	const password = inputPassLog.value;
	if (username === "" || username === Number || password === "") {
		textModal.textContent = "Compila i campi richiesti nel modo corretto!";
		return;
	}
	if (localStorage.getItem(username)) {
		textModal.textContent = "Utente già esistente";
	} else {
		localStorage.setItem(username, password);
		textModal.textContent = "Utente registrato con successo!!";
		inputPassLog.style.display = "none";
		inputUserLog.style.display = "none";
	}
	let interval = setInterval(() => {
		modal.style.display = "none";
		clearInterval(interval);
	}, 4000);
});

btnLogAccess.addEventListener("click", () => {
	contentLogIn.style.display = "flex";
	btnSign.style.display = "none";
	btnSignAccess.style.display = "none";
	btnLogAccess.style.display = "none";
	btnLog.style.display = "block";
	textModal.textContent = "Accedi";
});

btnLog.addEventListener("click", () => {
	const usernameLog = inputLog.value.trim();
	const passLog = Logpass.value.trim();

	// Verifica che i campi non siano vuoti
	if (usernameLog === "" || passLog === "") {
		textModal.textContent =
			"Dati inseriti non corretti. Entrambi i campi sono obbligatori.";
	} else {
		// Recupera la password memorizzata per l'username inserito
		const storedPass = localStorage.getItem(usernameLog);

		// Verifica che l'username esista e che la password corrisponda
		if (storedPass && storedPass === passLog) {
			textModal.textContent = `Benvenuto/a ${usernameLog}`;
			Logpass.style.display = "none";
			inputLog.style.display = "none";

			// Chiudi il modal dopo 4 secondi
			let interval = setInterval(() => {
				modal.style.display = "none";
				clearInterval(interval);
			}, 4000);
		} else {
			textModal.textContent = "Username o password errati.";
		}
	}
});

pannello.style.display = "none";
// Evento per far aprire il menu e selezionare la nuova categoria
btnOpenCategory.addEventListener("click", () => {
	if (pannello.style.display === "none") {
		pannello.style.display = "block";
	} else {
		pannello.style.display = "none";
	}
});

// Evento che al click della categoria ci da tutti i film commedia italiana
let lang = "&with_original_language=it";
comedyIt.addEventListener("click", () => {
	render(page, lang);
	pannello.style.display = "none";
	titleHome.textContent = "Commedia Italiana";
});

// Evento che al click del titolo rimanda a schermo la pagina iniziale
titleHome.addEventListener("click", () => {
	render(page);
	titleHome.textContent = "Comedy Film";
});

// Elementi per la creazione dei dettagli
const modal_Desc = document.createElement("div");
modal_Desc.className = "modal_Desc";
const modalContent = document.createElement("div");
modalContent.className = "modal_content_Desc";
const modalCloseBtn = document.createElement("span");
modalCloseBtn.className = "close";
modalCloseBtn.innerHTML = "&times;";
modalContent.appendChild(modalCloseBtn);
modal_Desc.appendChild(modalContent);
document.body.appendChild(modal_Desc);

// Funzione per mostrare i dettagli della card
export function showCardDetails(item) {
	modalContent.innerHTML = `
		<span class="close">&times;</span>
		<h2>${item.title}</h2>
		<img src="https://image.tmdb.org/t/p/w500${item.poster_path}" class="modal-poster">
		<p>${item.overview}</p>
	`;

	modal_Desc.style.display = "block";

	const closeBtn = modalContent.querySelector(".close");
	closeBtn.addEventListener("click", () => {
		modal_Desc.style.display = "none";
	});
}
