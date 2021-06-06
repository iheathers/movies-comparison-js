import { baseUrl, apiKey } from './constants.js';

export const fetchMovies = async (searchTerm) => {
  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        apikey: apiKey,
        s: searchTerm,
      },
    });
    if (!response.data.Response) {
      return [];
    }
    return response.data.Search;
  } catch (error) {
    console.log(error);
  }
};

export const fetchMovie = async (imdbID) => {
  try {
    const response = await axios.get(`${baseUrl}`, {
      params: {
        apikey: apiKey,
        i: imdbID,
      },
    });
    return response.data;
  } catch (error) {
    console.log(error);
  }
};

export const movieTemplate = (movieDetail) => {
  const imgSrc =
    movieDetail.Poster === 'N/A' ? 'assets/img/movie.png' : movieDetail.Poster;

  return `
    <div class="box">
      <article class="media">
        <figure class="media-left">
          <p class="image">
            <img src="${imgSrc}" loading="lazy" />
          </p>
        </figure>
        <div class="media-content">
          <div class="content">
            <h2>${movieDetail.Title}</h2>
            <h4>${movieDetail.Genre}</h4>
            <p>${movieDetail.Plot}</p>
          </div>
        </div>
      </article>

      <div class="notification is-primary">
        <h4 class="title">Awards</h4>
        <p class="subtitle">${movieDetail.Awards}</p>
      </div>

      <div class="notification is-primary">
        <h4 class="title">BoxOffice</h4>
        <p class="subtitle">${movieDetail.BoxOffice}</p>
      </div>

      <div class="notification is-primary">
        <h4 class="title">Metascore</h4>
        <p class="subtitle">${movieDetail.Metascore}</p>
      </div>

      <div class="notification is-primary">
        <h4 class="title">imdbRating</h4>
        <p class="subtitle">${movieDetail.imdbRating}</p>
      </div>

      <div class="notification is-primary">
        <h4 class="title">imdbVotes</h4>
        <p class="subtitle">${movieDetail.imdbVotes}</p>
      </div>
    </div>
  `;
};
