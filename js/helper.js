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

  const boxOffice =
    movieDetail.BoxOffice &&
    !isNaN(parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, '')))
      ? parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''))
      : 0;

  const metaScore = !isNaN(parseInt(movieDetail.Metascore))
    ? parseInt(movieDetail.Metascore)
    : 0;

  const imdbRating = !isNaN(parseInt(movieDetail.imdbRating))
    ? parseInt(movieDetail.imdbRating)
    : 0;

  const imdbVotes = !isNaN(parseInt(movieDetail.imdbVotes))
    ? parseInt(movieDetail.imdbVotes)
    : 0;

  const awards = movieDetail.Awards
    ? movieDetail.Awards.split(' ').reduce((accumulator, word) => {
        const value = parseInt(word);

        if (isNaN(value)) {
          return accumulator;
        } else {
          accumulator += value;
          return accumulator;
        }
      }, 0)
    : 0;

  console.log(
    { awards },
    { boxOffice },
    { metaScore },
    { imdbRating },
    { imdbVotes }
  );

  return `
    <div class="box">
      <article class="media" style="height: 250px">
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

      <div data-value=${awards} class="notification is-primary">
        <h4 class="title">Awards</h4>
        <p class="subtitle">${movieDetail.Awards}</p>
      </div>

      <div data-value="${boxOffice}" class="notification is-primary">
        <h4 class="title">Box Office</h4>
        <p class="subtitle">${movieDetail.BoxOffice}</p>
      </div>

      <div data-value="${metaScore}" class="notification is-primary">
        <h4 class="title">Metascore</h4>
        <p class="subtitle">${movieDetail.Metascore}</p>
      </div>

      <div data-value="${imdbRating}" class="notification is-primary">
        <h4 class="title">IMDB Rating</h4>
        <p class="subtitle">${movieDetail.imdbRating}</p>
      </div>

      <div data-value="${imdbVotes}" class="notification is-primary">
        <h4 class="title">IMDB Votes</h4>
        <p class="subtitle">${movieDetail.imdbVotes}</p>
      </div>
    </div>
  `;
};
