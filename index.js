import { callApi } from "./SearchCategory.js";
import { createElement } from "./GeneratorCard.js";
import "./buttons.js";
import "./SearchBarEl.js";
// Cerchiamo la lista di tutte le categorie affidandoci alla variabile genre
let lang = '&with_original_language=it'
let page = 1;
export const render = async (pageNumber, language) => {
	const genreObj = await callApi(pageNumber, language);
	createElement(genreObj.results);
};
render(page);

