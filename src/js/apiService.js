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
      // добавить условие проверки деф страны!!!!!!!
      return result.country;
    } catch (error) {
        const DEFAULT_COUNTRY = 'GB';
        this.country = DEFAULT_COUNTRY;
        return DEFAULT_COUNTRY;
      }
  }
  changeSearchOptions() {
    this.params.apikey = 'YtCjidrbY3XtU1FoAyynQpKvw26PaQjK';
    // if (this.country !== '') {
      this.params.countryCode = this.searchCountry;
      this.params.sort = 'date,asc';
      this.params.size = '20';
      this.params.page = this.currentPage;
    // }
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
  get keyword() {
    return this.searchKeyword;
  }
  get country() {
    return this.searchCountry;
  }
  get page() {
    return this.currentPage;
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