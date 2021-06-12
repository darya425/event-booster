import ApiService from './apiService';
const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
  countryInput: document.querySelector('.js-form-country'),
}
const _ = require('lodash');
const apiService = new ApiService;
async function getDefaultCountry() {
  await apiService.getCountryByLocation();
  apiService.fetchEvents();
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
  apiService.fetchEvents()
}
function onCountryInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  refs.countryInput.dataset.value = inputValue;
  apiService.country = inputValue;
  apiService.fetchEvents()
}