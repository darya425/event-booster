import cardTamplate from '../templates/cards.hbs';
const gallery = document.querySelector('.card-set');

export default async function getEvents(obj) {

  try {
    // if (obj._embedded)
    const eventsArray = obj._embedded.events;
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