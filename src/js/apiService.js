export default class ApiService{
  constructor() {
    this.searchKeyword = '';
    this.searchCountry = '';
    this.currentPage = 0;
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
  async fetchEvents() {
    const BASE_URL = `https://app.ticketmaster.com/discovery/v2/events.json?keyword=${this.keyword}&countryCode=${this.country}&page=${this.currentPage}&apikey=YtCjidrbY3XtU1FoAyynQpKvw26PaQjK`;
    try {
      const response = await fetch(BASE_URL);
      const result = await response.json();
      console.log(result)
      return result;
    } catch (error) {
      //
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