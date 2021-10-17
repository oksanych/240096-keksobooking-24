import { SIMILAR_OFFERS } from './constants.js';
import { createOfferData } from './create-offer-data.js';

const offers = Array.from({length: SIMILAR_OFFERS }, createOfferData);
// const object =  Array.from({length: SIMILAR_OFFERS }, createOfferData);

export {
  offers
};
