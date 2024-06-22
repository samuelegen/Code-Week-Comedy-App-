import { callApi } from "./SearchCategory.js";
import { createElement } from "./GeneratorCard.js";

const search = document.querySelector('.searchIcon');
const containerInputSearch = document.querySelector('.searchInput');
const inputSearch = document.querySelector('.inputSearch')
const genreObj = await callApi(1)

containerInputSearch.style.display = 'none';
search.addEventListener('click', () => {
    if(containerInputSearch.style.display === 'none') {
        containerInputSearch.style.display = 'flex';
    } else {
        containerInputSearch.style.display = 'none'
    }
});

inputSearch.addEventListener("input", (event) => {
    const inputValue = event.target.value.toLowerCase();
    filterProducts(inputValue, genreObj.results)
});

function filterProducts(inputValue, items) {
    const product = items.filter((item) =>
    item.title.toLowerCase().includes(inputValue)
)
createElement(product)
}


