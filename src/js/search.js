import ApiService from './apiService';
import getEvents from './get-events';
import countries from './countriesList.json'
const _ = require('lodash');
const apiService = new ApiService;
const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
}

//initialization select2 list of country
$(document).ready(function () {
  $("#selectCountry").select2({
    placeholder: 'Select country',
    data: countries,
  });
})
async function getDefaultCountry() {
  const defaultCountry = await apiService.getCountryByLocation();
  //selected defaul country in list
  $("#selectCountry").select2().val(defaultCountry).trigger('change');
  apiService.fetchEvents();
}
// listener for select list
$('#selectCountry').on('select2:select', function (e) {
  apiService.country = e.params.data.id;
  apiService.fetchEvents();
});

function onKeywordInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
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

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));
