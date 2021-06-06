// import { debounce } from './utils.js';
import { movieTemplate, fetchMovie, fetchMovies } from './helper.js';
import { createAutocomplete } from './autocomplete.js';

const movieDetailContainer = document.querySelector('#movie-detail');

createAutocomplete({
  root: document.querySelector('#movies-widget'),
  renderOption(movie) {
    const imgSrc =
      movie.Poster === 'N/A' ? 'assets/img/movie.png' : movie.Poster;
    return `
      <img src="${imgSrc}" loading="lazy" />
      <h3>${movie.Title}</h3>&nbsp(${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  fetchData(searchTerm) {
    return fetchMovies(searchTerm);
  },
});

createAutocomplete({
  root: document.querySelector('#movies-widget-two'),
  renderOption(movie) {
    const imgSrc =
      movie.Poster === 'N/A' ? 'assets/img/movie.png' : movie.Poster;
    return `
      <img src="${imgSrc}" loading="lazy" />
      <h3>${movie.Title}</h3>&nbsp(${movie.Year})
    `;
  },
  onOptionSelect(movie) {
    onMovieSelect(movie);
  },
  inputValue(movie) {
    return movie.Title;
  },
  fetchData(searchTerm) {
    return fetchMovies(searchTerm);
  },
});
const onMovieSelect = async (movie) => {
  try {
    const movieDetail = await fetchMovie(movie.imdbID);

    movieDetailContainer.innerHTML = movieTemplate(movieDetail);
  } catch (error) {
    console.log(error);
  }
};
