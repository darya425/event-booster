import cardTamplate from '../templates/cards.hbs';
const gallery = document.querySelector('.card-set');
const galleryText = document.querySelector('.default-info');

export default async function getEvents(obj) {
  try {
      const eventsArray = obj._embedded.events;
      console.log(eventsArray);
      eventsArray.forEach(event => {
        event.images = [event.images.find(image => !image.fallback)]
      });
      createCardsMarkup(eventsArray);
  } catch (error) {
    gallery.innerHTML = ''; 
    galleryText.insertAdjacentHTML('beforeend', '<p class="text">Sorry, no events on your request. Please enter another request.</p>');
    galleryText.insertAdjacentHTML('beforeend', '<div id="walk-container"><div id="walk"></div></div>'); 
  }
}

function createCardsMarkup(events) {
  gallery.insertAdjacentHTML('beforeend', cardTamplate(events));
}