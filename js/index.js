import { debounce } from './utils.js';
import { fetchData } from './requests.js';

const movieWidget = document.querySelector('#movies-widget');

movieWidget.innerHTML = `
  <div class="field">
    <p class="control has-icons-left">
      <input
        id="movie-input"
        class="input"
        type="text"
        placeholder="Search a Movie"
      />
      <span class="icon is-small is-left">
        <i class="fas fa-film"></i>
      </span>
    </p>
  </div>
  <div class="dropdown">
    <div class="dropdown-menu">
      <div class="dropdown-content results"></div>
    </div>
  </div>
`;

const dropdown = document.querySelector('.dropdown');
const resultsWrapper = document.querySelector('.results');

const handleInput = async (event) => {
  const searchTerm = event.target.value;
  const movies = await fetchData(searchTerm);

  resultsWrapper.innerHTML = '';

  if (movies) {
    dropdown.classList.add('is-active');

    for (const movie of movies) {
      const movieItem = document.createElement('a');
      movieItem.classList.add('dropdown-item', 'dropdown-img');

      const imgSrc =
        movie.Poster === 'N/A' ? 'assets/img/movie.png' : movie.Poster;

      movieItem.innerHTML = `      
        <img src="${imgSrc}" loading="lazy" />
        <h3>${movie.Title}</h3>
      `;
      resultsWrapper.appendChild(movieItem);
    }
  } else {
    console.log(`Movie ${searchTerm} not found`);
    dropdown.classList.remove('is-active');
  }
};

const movieInput = document.querySelector('#movie-input');
movieInput.addEventListener('input', debounce(handleInput, 1000));

document.addEventListener('click', (event) => {
  if (!movieWidget.contains(event.target)) {
    dropdown.classList.remove('is-active');
  }
});
