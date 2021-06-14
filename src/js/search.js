import ApiService from './apiService';
import countries from './countriesList.json'
const _ = require('lodash');
const apiService = new ApiService;
const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
  countryInput: document.querySelector('.js-form-country'),
}

getDefaultCountry();

async function getDefaultCountry() {
  const defCountry = await apiService.getCountryByLocation();

  //initialization select2 list of country
  $(document).ready(function () {
    $("#selectCountry").select2({
      placeholder: 'Select country',
      data: countries,
    }).val(defCountry).trigger('change');
})
  apiService.fetchEvents();
}
// listener for select list
$('#selectCountry').on('select2:select', function (e) {
  apiService.country = e.params.data.id;
  apiService.fetchEvents();
});

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));

function onKeywordInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  apiService.keyword = inputValue;
  apiService.fetchEvents()
}
