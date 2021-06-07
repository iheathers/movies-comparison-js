// import { debounce } from './utils.js';
import { movieTemplate, fetchMovie, fetchMovies } from './helper.js';
import { createAutocomplete } from './autocomplete.js';

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
    onMovieSelect(movie, document.querySelector('#left-summary'), 'left');
  },
});

createAutocomplete({
  ...autoCompleteConfig,
  root: document.querySelector('#right-movie-widget'),
  onOptionSelect(movie) {
    onMovieSelect(movie, document.querySelector('#right-summary'), 'right');
  },
});

let leftMovie;
let rightMovie;

const onMovieSelect = async (movie, summaryContainer, side) => {
  try {
    const movieDetail = await fetchMovie(movie.imdbID);

    summaryContainer.innerHTML = movieTemplate(movieDetail);

    if (side === 'left') {
      leftMovie = movieDetail;
    } else {
      rightMovie = movieDetail;
    }

    if (leftMovie && rightMovie) {
      runComparison();
    }
  } catch (error) {
    console.log(error);
  }
};

const runComparison = () => {
  console.log("Let's Compare");

  const leftSideStats = document.querySelectorAll(
    '#left-summary .notification'
  );

  const rightSideStats = document.querySelectorAll(
    '#right-summary .notification'
  );

  leftSideStats.forEach((leftStat, index) => {
    const rightStat = rightSideStats[index];

    const leftStatValue = parseFloat(leftStat.dataset.value);
    const rightStatValue = parseFloat(rightStat.dataset.value);

    if (leftStatValue > rightStatValue) {
      console.log({ leftStat });
      rightStat.classList.remove('is-primary');
      rightStat.classList.add('is-warning');
    } else {
      leftStat.classList.remove('is-primary');
      leftStat.classList.add('is-warning');
    }
  });
};
