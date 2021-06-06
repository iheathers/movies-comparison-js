import { debounce } from './utils.js';

export const createAutocomplete = ({
  root,
  renderOption,
  onOptionSelect,
  inputValue,
  fetchData,
}) => {
  root.innerHTML = `
  <div class="field">
    <p class="control has-icons-left">
      <input       
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

  const dropdown = root.querySelector('.dropdown');
  const resultsWrapper = root.querySelector('.results');
  const movieInput = root.querySelector('.input');

  const handleInput = async (event) => {
    const searchTerm = event.target.value;
    const items = await fetchData(searchTerm);

    resultsWrapper.innerHTML = '';

    if (items) {
      dropdown.classList.add('is-active');

      for (const item of items) {
        const option = document.createElement('a');
        option.classList.add('dropdown-item', 'dropdown-img');
        option.innerHTML = renderOption(item);

        option.addEventListener('click', () => {
          dropdown.classList.remove('is-active');

          movieInput.value = inputValue(item);
          onOptionSelect(item);
        });
        resultsWrapper.appendChild(option);
      }
    } else {
      console.log(`Movie ${searchTerm} not found`);
      dropdown.classList.remove('is-active');
    }
  };

  movieInput.addEventListener('input', debounce(handleInput, 1000));

  document.addEventListener('click', (event) => {
    if (!root.contains(event.target)) {
      dropdown.classList.remove('is-active');
    }
  });
};
