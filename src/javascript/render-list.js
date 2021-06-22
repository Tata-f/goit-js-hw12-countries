import { error } from '@pnotify/core';

import countryCard from '../templates/countryCard';
import countryList from '../templates/countryList';

import API from './fetchCountries';
import getRefs from './refs';

import debounce from 'lodash.debounce';

const refs = getRefs();

refs.$searchInput.addEventListener('input', debounce(onSearch, 500));

function onSearch(e) {
  const searchQuery = e.target.value.trim();

  refs.$searchInput.innerHTML = '';

  if (searchQuery.length < 1) {
    
    return;
  }

  API(searchQuery).then(createMarkup);
}

function createMarkup(data) {
let markup = "";
    if (!data) {
      return;
    }

    if (data.length > 1 && data.length <= 10) {
      markup = countryList(data);


    }
    if (data.length === 1) {
      markup = countryCard(data);


    }
    if (data.length > 10) {
      error({
        title: false,
        text: 'Too many maches',
        sticker: false,
        maxTextHeight: null,
        closerHover: false,
        mouseReset: false,
        delay: 2000,
      });
    } 
    refs.$cardContainer.innerHTML = markup;
  }
