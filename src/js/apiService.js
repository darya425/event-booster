export default class ApiService{
  constructor() {
    this.searchKeyword = '';
    this.searchCountry = '';
    this.currentPage = 0;
    this.params = {};
  }
  async getCountryByLocation() {
    try {
      const response = await fetch('https://ipapi.co/json/');
      const result = await response.json();
      this.country = result.country;
      return result.country;
    } catch (error) {
    }
  }
  changeSearchOptions() {
    this.params.apikey = 'YtCjidrbY3XtU1FoAyynQpKvw26PaQjK';
    this.params.size = '20';
    this.params.countryCode = this.searchCountry;
    this.params.page = this.currentPage;
    this.params.sort = 'date,asc';
    if (this.keyword !== '') {
      this.params.keyword = this.searchKeyword;
    }
    const keys = Object.keys(this.params);
    return keys.length
      ?
        "?" + keys
        .map(key => encodeURIComponent(key) + "=" + encodeURIComponent(this.params[key]))
        .join("&")
      : "";
  }

  async fetchEvents() {
    const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json`;
    const options = this.changeSearchOptions();

    try {
      const response = await fetch(BASE_URL+options);
      const result = await response.json();
      console.log(result);
      return result;
    } catch (error) {
      //
    }
  }

  async fetchEventById(id) {
      const url = `https://app.ticketmaster.com/discovery/v2/events/${id}.json`;
      const options = this.changeSearchOptions();
    
      try {
          const response = await fetch(url+options);
          const result = await response.json();
          return result;
      } catch (error) {
          
      }
  }

  get keyword() {
    return this.searchKeyword;
  }
  get country() {
    return this.searchCountry;
  }
  set keyword(newKeyword) {
    this.searchKeyword = newKeyword;
  }
  set country(newCountry) {
    this.searchCountry = newCountry;
  }
  set page(newPage) {
    this.currentPage = newPage - 1;
  }
}