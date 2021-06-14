import ApiService from './apiService';
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
  apiService.fetchEvents()
}

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));