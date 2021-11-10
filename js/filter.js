import { debounce } from './utils/debounce.js';
import { filters } from './form.js';
import { clearMarkerGroup, renderMarkers } from './map.js';

const DEFAULT_TYPE = 'any';
const filterTypeControl = document.querySelector('#housing-type');
const filterPriceControl = document.querySelector('#housing-price');
const filterRoomsControl = document.querySelector('#housing-rooms');
const filterGuestsControl = document.querySelector('#housing-guests');
const filterFeaturesControl = document.querySelector('#housing-features');
const PriceRange = {
  LOW: 10000,
  MIDDLE: 50000,
};
const DELAY = 500;

const getFilteredOffers = (data) => {

  const filterType = (item) => filterTypeControl.value === item.offer.type || filterTypeControl.value === DEFAULT_TYPE;

  const filterPrice = (item) => {
    switch (filterPriceControl.value) {
      case DEFAULT_TYPE:
        return true;
      case 'low':
        return item.offer.price < PriceRange.LOW;
      case 'middle':
        return item.offer.price >= PriceRange.LOW && item.offer.price < PriceRange.MIDDLE;
      case 'high':
        return item.offer.price >= PriceRange.MIDDLE;
      default:
        return false;
    }
  };

  const filterRooms = (item) => filterRoomsControl.value === DEFAULT_TYPE || Number(item.offer.rooms) === Number(filterRoomsControl.value);

  const filterGuests = (item) => filterGuestsControl.value === DEFAULT_TYPE || Number(item.offer.guests) === Number(filterGuestsControl.value);

  const filterFeatures = (item) => {
    const checkedHousingFeatures = filterFeaturesControl.querySelectorAll('.map__checkbox:checked');

    return Array.from(checkedHousingFeatures).every((checkedFeature) => {
      if (item.offer.features) {
        return item.offer.features.includes(checkedFeature.value);
      }
    });
  };

  const updateFilter = () => {
    clearMarkerGroup();
    const filteredData = data.filter(
      (item) =>
        filterType(item) && filterPrice(item) && filterRooms(item) && filterGuests(item) && filterFeatures(item))
      .slice(0, 10);
    renderMarkers(filteredData);

    filters.removeEventListener('change', () => debounce(updateFilter(), DELAY));
  };

  filters.addEventListener('change', () => debounce(updateFilter(), DELAY));
};

export {
  getFilteredOffers
};
