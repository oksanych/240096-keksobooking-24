import { doFormActive, form, filters } from './form.js';
import { offers } from './data/create-offers.js';
import { createMapItems } from './create-map-items.js';

const addressField = document.querySelector('#address');
const tokioCenterCoordinate = {
  lat: 35.652832,
  lng: 139.839478,
};

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
    setCoordinate(tokioCenterCoordinate);
  })
  .setView(tokioCenterCoordinate, 11);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const markerDefault = L.marker(
  tokioCenterCoordinate,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

markerDefault.addTo(map);

markerDefault.on('moveend', (evt) => {
  setCoordinate(evt.target.getLatLng());
});

// Setup offers from data
const createMarker = (array) => {
  const lat = array.location.lat;
  const lng = array.location.lng;

  const icon = L.icon({
    iconUrl: '../img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
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
    .bindPopup(createMapItems(array));
};

offers.forEach((point) => {
  createMarker(point);
});
