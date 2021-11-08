import { doFormActive, form, filters } from './form.js';
import { createMapItem } from './create-map-item.js';

const addressField = document.querySelector('#address');
const START_COORDINATE = {
  lat: 35.652832,
  lng: 139.839478,
};
const ZOOM = 11;
const mainPinImg = '../img/main-pin.svg';
const mainPinIconSize = 52;
const pinImg = '../img/pin.svg';
const pinIconSize = 40;
const PIN_NUMBER = 10;

// Function for setting coordinate
const setCoordinate = ({lat, lng}) => {
  const latItem = parseFloat(lat).toFixed(5);
  const lngItem = parseFloat(lng).toFixed(5);

  addressField.value = `${latItem}, ${lngItem}`;
};

// Create map
const map = L.map('map-canvas')
  .on('load', () => {
    doFormActive(form);
    doFormActive(filters);
    addressField.readOnly = true;
    setCoordinate(START_COORDINATE);
  })
  .setView(START_COORDINATE, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: mainPinImg,
  iconSize: [mainPinIconSize, mainPinIconSize],
  iconAnchor: [mainPinIconSize/2, mainPinIconSize],
});

const markerDefault = L.marker(
  START_COORDINATE,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

markerDefault.addTo(map);

markerDefault.on('move', (evt) => {
  setCoordinate(evt.target.getLatLng());
});

// Setup offers from data
const createMarker = (data) => {
  const {lat, lng} = data.location;

  const icon = L.icon({
    iconUrl: pinImg,
    iconSize: [pinIconSize, pinIconSize],
    iconAnchor: [pinIconSize/2, pinIconSize],
  });

  const markerOffer = L.marker(
    {
      lat,
      lng,
    },
    {
      icon,
    },
  );

  markerOffer
    .addTo(map)
    .bindPopup(createMapItem(data));
};

const renderMap = (data) => {
  data.slice(0, PIN_NUMBER).forEach((mapItem) => {
    createMarker(mapItem);
  });
};

// Reset map and form
const clearAll = () => {
  markerDefault.setLatLng(START_COORDINATE);
  map.setView(START_COORDINATE, ZOOM);
  form.reset();
  map.closePopup();
  addressField.value = `${START_COORDINATE.lat.toFixed(5)}, ${START_COORDINATE.lng.toFixed(5)}`;
};

export{
  renderMap,
  clearAll
};
