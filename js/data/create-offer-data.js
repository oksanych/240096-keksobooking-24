import {
  LAT_FROM,
  LAT_TO,
  LNG_FROM,
  LNG_TO,
  ID_PHOTOS,
  TITLES,
  DESCRIPTIONS,
  TYPES,
  CHECK_IN,
  CHECK_OUT,
  FEATURES,
  PHOTOS
} from '../data/constants.js';
import {
  getRandomNumber,
  getRandomNumberFloatPoint,
  getRandomElement,
  getRandomArray
} from './utils.js';

const createOfferData = () => {
  const locationLat = getRandomNumberFloatPoint(LAT_FROM, LAT_TO, 5);
  const locationLgn = getRandomNumberFloatPoint(LNG_FROM, LNG_TO, 5);

  return {
    author: {
      avatar: `img/avatars/user${ID_PHOTOS.shift()}.png`,
    },
    offer: {
      title: getRandomElement(TITLES),
      address: `${locationLat}, ${locationLgn}`,
      price: getRandomNumber(0, 1000),
      type: getRandomElement(TYPES),
      rooms: getRandomNumber(0, 100),
      persons: getRandomNumber(0, 100),
      checkin: getRandomElement(CHECK_IN),
      checkout: getRandomElement(CHECK_OUT),
      features: getRandomArray(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photos: getRandomArray(PHOTOS),
    },
    location: {
      lat: locationLat,
      lng: locationLgn,
    },
  };
};

export {
  createOfferData
};
