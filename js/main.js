import { getData } from './api.js';
import { showAlert } from './utils.js';
import { renderMap } from './map.js';
import{setFormSubmit, setReset} from './form.js';

getData(renderMap, showAlert);

setReset();

setFormSubmit();
