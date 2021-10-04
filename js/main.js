const SIMILAR_OFFERS = 10;
const LAT_FROM = 35.65000;
const LAT_TO = 35.70000;
const LNG_FROM = 139.70000;
const LNG_TO = 139.80000;
const TITLES = [
  'Title 1',
  'Title 2',
  'Title 3',
  'Title 4',
  'Title 5',
  'Title 6',
  'Title 7',
  'Title 8',
  'Title 9',
  'Title 10',
];
const DESCRIPTIONS = [
  'Description 1',
  'Description 2',
  'Description 3',
  'Description 4',
  'Description 5',
  'Description 6',
  'Description 7',
  'Description 8',
  'Description 9',
  'Description 10',
];
const TYPE = [
  'palace',
  'flat',
  'house',
  'bungalow',
  'hotel',
];
const CHECK_IN = [
  '12:00',
  '13:00',
  '14:00',
];
const CHECK_OUT = [
  '12:00',
  '13:00',
  '14:00',
];
const FEATURES = [
  'wifi',
  'dishwasher',
  'parking',
  'washer',
  'elevator',
  'conditioner',
];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];

let counter = 0;

const getRandomInRange = (min, max)=> {
  if (min < 0 || max < 0 ) {
    return new Error('Min and max value must be more than 0');
  }

  if (min > max){
    [min, max] = [max, min];
  }

  return Math.random() * (max - min) + min;
};

const getRandomNumber = (min, max)=> Math.floor(getRandomInRange(min, max));
const getRandomNumberFloatPoint = (min, max, number = 1) =>parseFloat(getRandomInRange(min, max).toFixed(number));
const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length -1)];

const createOffer = () => {
  const locationLat = getRandomNumberFloatPoint(LAT_FROM, LAT_TO, 5);
  const locationLgn = getRandomNumberFloatPoint(LNG_FROM, LNG_TO, 5);
  let index = 0;

  if (counter < 9){
    counter += 1;
    index = `0${ counter.toString()}`;
  } else {
    counter += 1;
    index = counter.toString();
  }

  return {
    author: {
      avatar: `img/avatars/user${index}.png`,
    },
    offer: {
      title: getRandomElement(TITLES),
      address: String(`${locationLat}, ${locationLgn}`),
      price: getRandomNumber(0, 1000),
      type: getRandomElement(TYPE),
      rooms: getRandomNumber(0, 100),
      persons: getRandomNumber(0, 100),
      chechin: getRandomElement(CHECK_IN),
      chechout: getRandomElement(CHECK_OUT),
      feature: getRandomElement(FEATURES),
      description: getRandomElement(DESCRIPTIONS),
      photo: getRandomElement(PHOTOS),
    },
    locations: {
      lat: locationLat,
      lgn: locationLgn,
    },
  };
};

Array.from({length: SIMILAR_OFFERS }, createOffer);
