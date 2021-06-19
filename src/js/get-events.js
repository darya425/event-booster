import { Pagination } from 'tui-pagination';
import cardTamplate from '../templates/cards.hbs';
const gallery = document.querySelector('.card-set');
const galleryText = document.querySelector('.default-info');
const paginationRef = document.querySelector('.tui-pagination');

export default async function getEvents(obj) {

  try {
    // if (!obj._embedded) {

    //   galleryText.insertAdjacentHTML('afterbegin', '<span class="text">Sorry, no events on your request...:(</span>');
      
    // } else {
      const eventsArray = obj._embedded.events;
      console.log(eventsArray);

      eventsArray.forEach(event => {
        event.images = [event.images.find(image => !image.fallback)]
      });

      createCardsMarkup(eventsArray);

    // }

  } catch (error) {
    paginationRef.innerHTML = '';
    galleryText.insertAdjacentHTML('afterbegin', '<span class="text">Sorry, no events on your request...:(</span>');
    // console.log(error);
    
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTamplate(events));
}
