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
  const isIdOnList = countries.find(r => r.id === defaultCountry);
  //selected defaul country in list
  if (isIdOnList) {
    $("#selectCountry").select2().val(defaultCountry).trigger('change');
    const result = await apiService.fetchEvents();
    await getEvents(result);
    return;
  }
    $("#selectCountry").select2().val("GB").trigger('change');
    const result = await apiService.fetchEvents();
    await getEvents(result);
  
}
// listener for select list
$('#selectCountry').on('select2:select', function (e) {
  onSelectCountry(e)
});

async function onSelectCountry(e) {
  apiService.country = e.params.data.id;
  const result = await apiService.fetchEvents();
  await getEvents(result);
}

async function onKeywordInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  apiService.keyword = inputValue;
  apiService.page = 5;
  console.log(apiService.page);
  const result = await apiService.fetchEvents();
  await getEvents(result);
}

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));

// console.log( countries.find(r => console.log(r.id)))