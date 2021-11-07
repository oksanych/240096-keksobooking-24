import { showAlert } from './utils.js';
import { renderMap, clearAll } from './map.js';
import { getData } from './api.js';
import{setFormSubmit, setReset} from './form.js';
import{errorPopup, successPopup} from './pop-ups.js';

getData(renderMap, showAlert);

setReset(clearAll);

setFormSubmit(successPopup, errorPopup, clearAll);
