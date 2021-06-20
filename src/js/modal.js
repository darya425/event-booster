import modalWindowTpl from '../templates/modal-window.hbs';
import ApiService from './apiService';
import * as basicLightbox from '../../node_modules/basiclightbox/dist/basicLightbox.min';
import '../../node_modules/basiclightbox/dist/basicLightbox.min.css';


const apiService = new ApiService;
const galleryContainerRef = document.querySelector('.gallery');

galleryContainerRef.addEventListener('click', onItemEventClick);           // delegation

async function onItemEventClick(event) {
    console.log(event.target);
    
    if (!event.target.classList.contains('item-event')) {
        return;
    }

    const eventId = event.target.dataset.id;                                // getting event id
    console.log(eventId);

    const eventInfo = await apiService.fetchEventById(eventId);             // getting event info by id
    console.log(eventInfo);                                                 
    eventInfo.images = [eventInfo.images.find(image => !image.fallback)]
    eventInfo.dates.start.localTime = eventInfo.dates.start.localTime ? eventInfo.dates.start.localTime.substring(0, 5):'';

    const markup = modalWindowTpl(eventInfo);
    const instance = basicLightbox.create(markup,                           // creating lightbox
        {
            onShow: () => document.body.style.overflow = 'hidden',          // disabling body scroll
            onClose: () => document.body.style.overflow = 'scroll'          // enabling body scroll
        });
    instance.show();                               
    
    const closeModalBtn = document.querySelector('.close-window');          // closing modal on cross-icon click
    closeModalBtn.addEventListener('click', instance.close);

    window.addEventListener('keydown', (evt) => {                           // closing modal on escape key press
        if (evt.code === "Escape") {
            instance.close()
        }
    });
}
