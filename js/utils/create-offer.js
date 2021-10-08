import { SIMILAR_OFFERS } from '../data/data.js';
import { createOfferData } from './cleate-offer-data.js';

const createOffer = () => Array.from({length: SIMILAR_OFFERS }, createOfferData);

export {
  createOffer
};
