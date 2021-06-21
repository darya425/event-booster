import ApiService from './apiService';
import getEvents from './get-events';
import countries from './countriesList.json';
import getPage from './pagination';
import getEventsByPage from './getEventsByPage';

const _ = require('lodash');
const apiService = new ApiService;

const currentPage = apiService.page;



const refs = {
  keywordInput: document.querySelector('.js-form-keyword'),
  gallery: document.querySelector('.card-set'),
  galleryText: document.querySelector('.default-info'),
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
    // const images = await apiService.fetchEventByPage(currentPage, defaultCountry);
    // console.log(images);
    const totalItems = await result.page.totalElements;
    await getEvents(result);
    await getPage(totalItems, defaultCountry);
    
    
  } else {
    $("#selectCountry").select2().val('GB').trigger('change');
    apiService.country = 'GB';
    const result = await apiService.fetchEvents();
    const totalItems = await result.page.totalElements;
    await getEvents(result);
    await getPage(totalItems, apiService.country);
    
  }
}

// listener for select list
$('#selectCountry').on('select2:select', function (e) {
  onSelectCountry(e)
});

async function onSelectCountry(e) {
  clearMarkup();
  apiService.country = e.params.data.id;
  const result = await apiService.fetchEvents();
 const totalItems = await result.page.totalElements;
    await getEvents(result);
    await getPage(totalItems, apiService.country);
  
  
}

async function onKeywordInput(e) {
  e.preventDefault();
  const inputValue = e.target.value;
  apiService.keyword = inputValue;
  clearMarkup();
  const result = await apiService.fetchEvents();
 const totalItems = await result.page.totalElements;
    await getEvents(result);
    // await getPage(totalItems, apiService.country);
 
}

function clearMarkup() {
  refs.gallery.innerHTML = '';
  refs.galleryText.innerHTML = '';
}

getDefaultCountry();

refs.keywordInput.addEventListener('input', _.debounce(onKeywordInput, 500));
