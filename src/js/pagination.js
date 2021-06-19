// import { get } from 'lodash';
import ApiService from './apiService';
// import getEvents from './get-events';
const Pagination = require('tui-pagination');
const apiService = new ApiService;

const currentPage = apiService.page +1;

export default async function getPage(array) {
    try {
        // const result = await apiService.fetchEvents();
        const totalElements = array.page.totalElements;
        console.log(totalElements);
        
        pagination.setTotalItems(totalElements);
       
        pagination.movePageTo(currentPage);
        // getEvents(array);
        
    } catch (error) {
        console.error(error);
    }
}

const options = { 
     totalItems: 100,
     itemsPerPage: 20,
     visiblePages: 7,
     page: currentPage,
     centerAlign: false,
     firstItemClassName: 'tui-first-child',
     lastItemClassName: 'tui-last-child',
     template: {
         page: '<a href="#" class="tui-page-btn">{{page}}</a>',
         currentPage: '<strong class="tui-page-btn tui-is-selected">{{page}}</strong>',
         moveButton:
             '<a href="#" class="tui-page-btn tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</a>',
         disabledMoveButton:
             '<span class="tui-page-btn tui-is-disabled tui-{{type}}">' +
                 '<span class="tui-ico-{{type}}">{{type}}</span>' +
             '</span>',
         moreButton:
             '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip">' +
                 '<span class="tui-ico-ellip">...</span>' +
             '</a>'
     }
};

const pagination = new Pagination('pagination', options);


// function renderGallery(array) {
//     if (currentPage) {
//         getEvents(array);
//     }

// }


console.log(pagination);


