import ApiService from './apiService';
const Pagination = require('tui-pagination');

const apiService = new ApiService;

export default function getPage(totalItems, country) {
  const pagination = new Pagination('pagination', {
    totalItems,
    itemsPerPage: 20,
    visiblePages: 5,
    // ЭТО ШАБЛОН РАЗМЕТКИ  
    template: {
      page: '<a href="#" class="tui-page-btn btn-page1 btn">{{page}}</a>',
      currentPage:
        '<a href="#" class="tui-page-btn btn-page1 active btn">{{page}}</a>',
      moveButton: '<a href ="#" class=" {{type}} custom-class-{{type}}"></a>',
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