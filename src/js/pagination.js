import apiService from './apiService';
// import galleryTpl from './templates/cards.hbs';

const galleryApiService = new apiService();


const currentPage = galleryApiService.page.number;
const numberPerPage = 20;
const totalPages = galleryApiService.page.totalPages;

const pagingBox = document.querySelector('.pagination');
const pageNumber = document.querySelector('.page-number');
const decrementBtn = document.querySelector('[data-action="decrement"]');
const incrementBtn = document.querySelector('[data-action="increment"]');

// эта часть кода отвечает за отображение галереи с картинками

decrementBtn.addEventListener('click', previousPage);

incrementBtn.addEventListener('click', nextPage);

function nextPage() {
    pageNumber = pageNumber.nextElementSibling;
  renderPaginationList();
}

function previousPage() {
    pageNumber = pageNumber.previousElementSibling;
  renderPaginationList();
}

function renderPaginationList() { 
    currentPage.classList.toggle('active-page');
    loadList();
}


function loadList() {
    let pageList = [];
    const begin = (currentPage - 1) * numberPerPage;
    const end = begin + numberPerPage;

    pageList = totalPages.slice(begin, end);
    renderGallery();
    check();
}

// function renderGallery(images) {
//     pagingBox.insertAdjacentHTML('beforeend', galleryTpl(images));
// }

function check() {
    incrementBtn.disabled = currentPage === totalPages ? true : false;
    decrementBtn.disabled = currentPage  === 0 ? true : false;
}


function load() {
    loadList();
}
    
window.onload = load;


// function renderPages(currentPage) {
//     return pagingBox.insertAdjacentHTML('afterbegin', `<li class="page-number"><a href="#">${currentPage + 1}</a></li>`);
// }



// эта часть кода для навигации по страницам


const getRange = (start, end) => {
  return Array(end - start + 1)
    .fill()
    .map((a, i) => i + start)
}

const pagination = (currentPage, totalPages) => {
  let delta = 2;
  if (totalPages <= 7) {
    // delta === 7: [1 2 3 4 5 6 7]
    delta = 7;
  } else {
    // delta === 2: [1 ... 4 5 6 ... 10]
    // delta === 4: [1 2 3 4 5 ... 10]
    delta = currentPage > 4 && currentPage < totalPages - 3 ? 2 : 4
  }

  const range = {
    start: Math.round(currentPage - delta / 2),
    end: Math.round(currentPage + delta / 2),
  }

  if (range.start - 1 === 1 || range.end + 1 === totalPages) {
    range.start += 1;
    range.end += 1;
  }

  let pages = currentPage > delta
      ? getRange(Math.min(range.start, totalPages - delta), Math.min(range.end, totalPages))
      : getRange(1, Math.min(totalPages, delta + 1))

  const withDots = (value, pair) => (pages.length + 1 !== totalPages ? pair : [value])

  if (pages[0] !== 1) {
    pages = withDots(1, [1, '...']).concat(pages)
  }

  if (pages[pages.length - 1] < totalPages) {
    pages = pages.concat(withDots(totalPages, ['...', totalPages]))
  }

  return pages;
}

// потестить можно тут https://playcode.io/new/
console.log(pagination(1,25));
