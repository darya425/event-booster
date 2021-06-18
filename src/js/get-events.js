import cardTamplate from '../templates/cards.hbs';
import ApiService from './apiService';

const apiService = new ApiService;
const gallery = document.querySelector('.card-set');

export default async function getEvents(array) {

  try {
    // const result = await apiService.fetchEvents();
    const eventsArray = array._embedded.events;
    console.log(eventsArray);
    eventsArray.forEach(event => {
      event.images = [event.images.find(image => !image.fallback)]
    });
    createCardsMarkup(eventsArray);

  } catch (error) {
    console.log(error)
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTamplate(events));
}