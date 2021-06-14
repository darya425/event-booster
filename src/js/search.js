import ApiService from './apiService';
import getEvents from './get-events';

const _ = require('lodash');
const apiService = new ApiService;
const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
  countryInput: document.querySelector('.js-form-country'),
}

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));
refs.countryInput.addEventListener('input', _.debounce(onCountryInput, 500));

function onKeywordInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  if (refs.countryInput.dataset.value === '') {
    console.log('change country');
  }
  apiService.keyword = inputValue;
  getEvents();
}
function onCountryInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  refs.countryInput.dataset.value = inputValue;
  apiService.country = inputValue;
  getEvents();
}

async function getDefaultCountry() {
  const defCountry = await apiService.getCountryByLocation();
  refs.countryInput.dataset.value = defCountry;
  refs.countryInput.firstElementChild.setAttribute('value', refs.countryInput.dataset.value);
  apiService.fetchEvents();
  // getEvents();
}

