import countryCard from '../templates/countryCard';
import countryList from '../templates/countryList';

const debounce = require('lodash.debounce');

const $cardContainer = document.querySelector('.js-card-container');
const $searchInput = document.querySelector('[name="query"]')


fetchCountry("Switzerland")
  .then(renderCountryCard)
  .catch(error => console.log(error));

function fetchCountry(name) {
  return fetch(`https://restcountries.eu/rest/v2/name/${name}`).then(response => {
    return response.json();
  });
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  $cardContainer.innerHTML = markup;
}
