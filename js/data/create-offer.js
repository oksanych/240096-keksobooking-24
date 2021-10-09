import { SIMILAR_OFFERS } from './constants.js';
import { createOfferData } from './create-offer-data.js';

const createOffer = () => Array.from({length: SIMILAR_OFFERS }, createOfferData);

export {
  createOffer
};
