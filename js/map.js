import { doFormActive, form, filters } from './form.js';
import { offers } from './data/create-offers.js';
import { createMapItem } from './create-map-item.js';

const addressField = document.querySelector('#address');
const startCoordinate = {
  lat: 35.652832,
  lng: 139.839478,
};
const mainPinImg = '../img/main-pin.svg';
const mainPinIconSize = 52;
const pinImg = '../img/pin.svg';
const pinIconSize = 40;

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
    setCoordinate(startCoordinate);
  })
  .setView(startCoordinate, 11);

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
  startCoordinate,
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
  const lat = data.location.lat;
  const lng = data.location.lng;

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

offers.forEach((point) => {
  createMarker(point);
});
