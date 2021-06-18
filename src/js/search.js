import ApiService from './apiService';
import getEvents from './get-events';
import countries from './countriesList.json'
const _ = require('lodash');
const apiService = new ApiService;
const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
  gallery: document.querySelector('.card-set'),
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
  const isIdOnList = countries.find(r => r.id === defaultCountry);
  //selected defaul country in list
  if (isIdOnList) {
    $("#selectCountry").select2().val(defaultCountry).trigger('change');
    getEvents();
    return;
  }
    $("#selectCountry").select2().val("GB").trigger('change'); 
    getEvents(); 
}
// listener for select list
$('#selectCountry').on('select2:select', function (e) {
  apiService.country = e.params.data.id;
  clearMarkup();
  getEvents();
});

function onKeywordInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  apiService.keyword = inputValue;
  clearMarkup();
  getEvents();
}

function onCountryInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  refs.countryInput.dataset.value = inputValue;
  apiService.country = inputValue;
  getEvents();
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
}

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));

// console.log( countries.find(r => console.log(r.id)))