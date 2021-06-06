// import { debounce } from './utils.js';
import { movieTemplate, fetchMovie, fetchMovies } from './helper.js';
import { createAutocomplete } from './autocomplete.js';

const movieDetailContainer = document.querySelector('#movie-detail');

const autoCompleteConfig = {
  renderOption(movie) {
    const imgSrc =
      movie.Poster === 'N/A' ? 'assets/img/movie.png' : movie.Poster;
    return `
      <img src="${imgSrc}" loading="lazy" />
      <h3>${movie.Title}</h3>&nbsp(${movie.Year})
    `;
  },
  inputValue(movie) {
    return movie.Title;
  },
  fetchData(searchTerm) {
    return fetchMovies(searchTerm);
  },
};

createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#left-movie-widget'),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector('#left-summary'));
  },
});

createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-movie-widget'),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector('#right-summary'));
  },
});

const onMovieSelect = async (movie, summaryContainer) => {
  try {
    const movieDetail = await fetchMovie(movie.imdbID);

    summaryContainer.innerHTML = movieTemplate(movieDetail);
  } catch (error) {
    console.log(error);
  }
};
