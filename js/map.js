import { changeStateForm, form, filters, setPricePlaceholder} from './form.js';
import { createMapItemInfo } from './create-map-item.js';
import { getData } from './api.js';
import { showAlert } from './utils.js';
import { getFilteredOffers } from './filter.js';

const addressField = document.querySelector('#address');
const START_COORDINATE = {
  lat: 35.652832,
  lng: 139.839478,
};
const MAP_TILE = 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
const MAP_COPYRIGHT = '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors';
const ZOOM = 11;
const MAP_MARKER_MAIN = {
  iconUrl: 'img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
};
const MAP_MARKER_DEFAULT = {
  iconUrl: 'img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
};
const map = L.map('map-canvas');
const markerGroup = L.layerGroup();

const MARKER_NUMBER = 10;

// Function for setting coordinate
const setCoordinate = ({lat, lng}) => {
  const latItem = parseFloat(lat).toFixed(5);
  const lngItem = parseFloat(lng).toFixed(5);

  addressField.value = `${latItem}, ${lngItem}`;
};

// Setup main marker
const mainMarkerIcon = L.icon(MAP_MARKER_MAIN);

const markerMain = L.marker(
  START_COORDINATE,
  {
    draggable: true,
    icon: mainMarkerIcon,
  },
);

markerMain.on('move', (evt) => {
  setCoordinate(evt.target.getLatLng());
});

// Setup offers from data
const createMarker = (data) => {
  const {lat, lng} = data.location;

  const icon = L.icon(MAP_MARKER_DEFAULT);

  L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  ).addTo(markerGroup).bindPopup(createMapItemInfo(data));
};

const clearMarkerGroup = () => markerGroup.clearLayers();

const renderMarkers = (data) => {
  data.forEach((item) => createMarker(item));
};

const onMapLoad = (data) => {
  renderMarkers(data.slice(0, MARKER_NUMBER));
  getFilteredOffers(data);
};

const onDefaultMap = () => {
  getData(onMapLoad, showAlert);
  setCoordinate(START_COORDINATE);
  changeStateForm(true);
};

// Create map
map.on('load', () => {
  addressField.readOnly = true;
  onDefaultMap();
}).setView(START_COORDINATE, 11);

markerGroup.addTo(map);

L.tileLayer(
  MAP_TILE,
  {
    attribution: MAP_COPYRIGHT,
  },
).addTo(map);

markerMain.addTo(map);

// Reset map and form
const clearAll = () => {
  markerMain.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, ZOOM);
  form.reset();
  filters.reset();
  clearMarkerGroup();
  onDefaultMap();
  setPricePlaceholder();
  map.closePopup();
  addressField.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;
};

export{
  renderMarkers,
  clearAll,
  createMarker,
  clearMarkerGroup
};
