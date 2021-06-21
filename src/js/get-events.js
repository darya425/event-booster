import { Pagination } from 'tui-pagination';
import cardTamplate from '../templates/cards.hbs';
const gallery = document.querySelector('.card-set');
const galleryText = document.querySelector('.default-info');
const paginationRef = document.getElementById('pagination');

export default async function getEvents(obj) {

  try {
      const eventsArray = obj._embedded.events;
      console.log(eventsArray);

      eventsArray.forEach(event => {
        event.images = [event.images.find(image => !image.fallback)]
      });

      createCardsMarkup(eventsArray);

  } catch (error) {
    
   
    galleryText.insertAdjacentHTML('afterbegin', '<span class="text">Sorry, no events on your request &#129335</span>');
    // paginationRef.classList.add('visually-hidden');
    // console.log(error);
    
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTamplate(events));
}