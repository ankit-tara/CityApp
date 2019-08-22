const defaultLocation = {
  city: ""
};

export default class Location {
  constructor(location = defaultLocation) {
    this.city = this.getCityName(location);
  }

  getCityName(data) {
    if (data.status == "OK") {
      var cityName = data.results[0].address_components.filter(
        x => x.types.filter(t => t == "administrative_area_level_2").length > 0
      )[0].short_name;
      return cityName;
    }
    return "";
  }
}
