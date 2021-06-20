import modalWindowTpl from '../templates/modal-window.hbs';
import ApiService from './apiService';

const apiService = new ApiService;
const galleryContainerRef = document.querySelector('.gallery');
const backdropRef = document.querySelector('.backdrop');
const templateContainerRef = document.querySelector('.modal-template');

galleryContainerRef.addEventListener('click', onItemEventClick);         // delegation

async function onItemEventClick(event) {
    console.log(event.target);
    
    if (!event.target.classList.contains('item-event')) {
        return;
    }

    backdropRef.classList.remove('is-hidden');                           // opening modal
    const closeModalBtn = document.querySelector('.close-icon');
    closeModalBtn.addEventListener('click', onCloseModal);               // closing modal

    const eventId = event.target.dataset.id;                             // getting event id
    console.log(eventId);

    const eventInfo = await apiService.fetchEventById(eventId);
    console.log(eventInfo);                                              // getting event by id
    eventInfo.images = [eventInfo.images.find(image => !image.fallback)]
    eventInfo.dates.start.localTime = eventInfo.dates.start.localTime.substring(0,5);
    // event.description = event.description.substring(0, 100) + "...";
    renderModalWindow(eventInfo);                                        // rendering modal window
}

function onCloseModal() {
    backdropRef.classList.add('is-hidden')
}

function renderModalWindow(event) {
    const markup = modalWindowTpl(event);
    templateContainerRef.innerHTML = markup;
}
