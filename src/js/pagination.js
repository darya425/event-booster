import ApiService from './apiService';
const Pagination = require('tui-pagination');

import getEvents from './get-events';
import getEventsByPage from './getEventsByPage';

const apiService = new ApiService;

// const currentPage = apiService.page + 1;
export default function getPage(totalItems, country) {
  // const totalElements = apiService.page.totalElements;
  // console.log(totalElements);
  // pagination.setTotalItems(totalElements);
  // pagination.setTotalItems(totalItems);
  if (totalItems > 1000) {
    totalItems = 1000;
  }


  const pagination = new Pagination('pagination', {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    usageStatistics: false,
    // ЭТО ШАБЛОН РАЗМЕТКИ  
    template: {
      page: '<a href="#" class="tui-page-btn btn-page btn">{{page}}</a>',
      currentPage:
        '<a href="#" class="tui-page-btn btn-page active btn">{{page}}</a>',
      moveButton:  '<a href="#" class="tui-page-btn tui-{{type}}"></a>',
      disabledMoveButton:
        '<a href ="#" class="{{type}} custom-class-{{type}}"></a>',
      moreButton:
        '<a href="#" class="tui-page-btn tui-{{type}}-is-ellip custom-class-{{type}}">' +
        '<span class="tui-ico-ellip">...</span>' +
        '</a>',
    },
  });

  
  pagination.on('afterMove', function (eventData) {
    window.scrollTo({
      top: 150,
      behavior: 'smooth',
    });
   
   apiService.fetchEventByPage(eventData.page - 1, country);
  });
 
}


    
 
  