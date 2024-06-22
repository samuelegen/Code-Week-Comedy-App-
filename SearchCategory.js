import { KEY } from "./keys.js";

export const BaseUrl = "https://api.themoviedb.org/3/";
// export const options = {
// 	headers: {
// 		Authorization: `Bearer ${KEY}`,
// 	},
// };

const options = {
	method: "GET",
	headers: {
		accept: "application/json",
		Authorization: `Bearer ${KEY}`,
	},
};

export const callApi = async (pageNumber, language) => {
	const response = await fetch(
		`${BaseUrl}discover/movie?include_adult=false&include_video=false&language=it-IT&page=${pageNumber}&sort_by=popularity.desc&with_genres=35${language}`,
		options
	);
	let data = await response.json();
	return data;
};
