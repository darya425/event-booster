import cardTamplate from '../tamplates/cards.hbs';
import ApiService from './apiService';

const apiService = new ApiService;
const gallery = document.querySelector('.card-set');

export default async function getEvents() {

  try {
    const result = await apiService.fetchEvents();
    const eventsArray = result._embedded.events;
    console.log(eventsArray);
    createCardsMarkup(eventsArray);

  } catch (error) {
    console.log(error)
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTamplate(events));
}