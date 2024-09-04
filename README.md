
# Movies Comparison

This project is a web-based application that allows users to compare movies. The comparison is based on various attributes retrieved from a movie database API. Users can search for movies using an autocomplete feature, select movies, and compare them side by side.

**Live Demo**: [Movies Comparison](https://iheathers.github.io/movies-comparison-js/)

## Features
- Autocomplete movie search.
- Fetch movie data using API.
- Display movie information (such as ratings, awards, and box office).
- Compare selected movies based on different metrics.

## Project Structure

```
movies-comparison-js-master/
│
├── assets/              # Static assets like images
├── css/                 # CSS styles for the application
├── js/                  # JavaScript files for functionality
│   ├── autocomplete.js  # Implements autocomplete feature for movie search
│   ├── constants.js     # Defines constants used across the app
│   ├── helper.js        # Utility functions to format movie data
│   ├── index.js         # Main script that handles API requests and data processing
│   ├── utils.js         # Additional utility functions
├── index.html           # Main HTML page
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/iheathers/movies-comparison-js
   ```

2. Open `index.html` in your browser.

## Usage

1. Use the search bar to search for a movie. Suggestions will appear as you type.
2. Select a movie from the autocomplete suggestions.
3. Repeat the process to select a second movie.
4. The movies will be compared based on metrics like box office performance, awards, and ratings.

## JavaScript Files

- `autocomplete.js`: Handles the search input and displays movie suggestions.
- `constants.js`: Stores constants like API keys or base URLs.
- `helper.js`: Formats movie data for display.
- `index.js`: Core script responsible for fetching movie data, processing it, and rendering the comparison.
- `utils.js`: Contains utility functions to handle API responses, comparisons, etc.

## Technologies Used

- **HTML5**
- **CSS3**
- **JavaScript (Vanilla)**

## API

The movie data is fetched from an external API. Ensure that you have an API key to access movie information.

## License

This project is open-source and available under the [MIT License](LICENSE).
