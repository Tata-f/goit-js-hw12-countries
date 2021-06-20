import { error } from '@pnotify/core';

import countryCard from '../templates/countryCard';
import countryList from '../templates/countryList';

import API from './fetchCountries';
import getRefs from './refs';

const debounce = require('lodash.debounce');

const refs = getRefs();

refs.$searchInput.addEventListener('input', onSearch);

function onSearch(e) {
  const searchQuery = e.currentTarget.value;

  API(searchQuery).then(data => {
    if (data.length >= 2 && data.length <= 10) {
      renderCountryList(data);
      return;
    }
    if (data.length === 1) {
      renderCountryCard(data);
      return;
    }
    if (data.length > 10) {
      error({
        title: false,
        text: 'Too many maches',
        sticker: false,
        maxTextHeight: null,
        closerHover: false,
        animation: 'fade',
        mouseReset: false,
        delay: 2000,
      });
    }
  });
}

function renderCountryCard(country) {
  const markup = countryCard(country);
  refs.$cardContainer.innerHTML = markup;
}

function renderCountryList(country) {
  const markup = countryList(country);
  refs.$cardContainer.innerHTML = markup;
}
