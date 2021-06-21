
import ApiService from './apiService';
import cardTemplate from '../templates/cards.hbs';


const gallery = document.querySelector('.card-set');
const galleryText = document.querySelector('.default-info');
const paginationRef = document.querySelector('.tui-pagination');
const apiService = new ApiService;

export default async function getEventsByPage(page) {

  try {
    // if (!obj._embedded) {

    //   galleryText.insertAdjacentHTML('afterbegin', '<span class="text">Sorry, no events on your request...:(</span>');
      
      // } else { 
      
      const eventsArray = await apiService.fetchEventByPage(page);
      // const eventsArray = await events._embedded.events;
    // eventInfo.images = [eventInfo.images.find(image => !image.fallback)]
    //   const eventsArray = obj._embedded.events;
      console.log(eventsArray);

      eventsArray.forEach(event => {
        event.images = [event.images.find(image => !image.fallback)]
      });
    clearMarkup();
      createCardsMarkup(eventsArray);

    // }

  } catch (error) {
    paginationRef.innerHTML = '';
    galleryText.insertAdjacentHTML('afterbegin', '<span class="text">Sorry, no events on your request &#129318(</span>');
    console.log(error);
    
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTemplate(events));
}

function clearMarkup() {
  gallery.innerHTML = '';
}
