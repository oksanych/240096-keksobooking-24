import { sendData } from './api.js';
import{ renderPopup } from './pop-up.js';
import { clearAll } from './map.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MIN_PRICE = 0;
const MAX_PRICE = 1000000;
const form = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');
const resetBtn = document.querySelector('.ad-form__reset');
const inputTitle = document.querySelector('#title');
const inputPrice = document.querySelector('#price');
const inputRoomNumber = document.querySelector('#room_number');
const inputCapacity = document.querySelector('#capacity');
const successPopup = document.querySelector('#success').content.querySelector('.success');
const errorPopup = document.querySelector('#error').content.querySelector('.error');

// Function for disable form
const doFormDisable = (element) => {
  element.classList.add(`${element.classList[0]}--disabled`);

  [...element.children].forEach((item)=> item.setAttribute('disabled', 'disabled'));
};

// Function for enable form
const doFormActive = (element) => {
  element.classList.remove(`${element.classList[0]}--disabled`);

  [...element.children].forEach((item)=> item.removeAttribute('disabled'));
};

// Function for validate room capacity
const onValidateRoomCapacity = () => {
  const roomValue = inputRoomNumber.value;
  const capacityValue = inputCapacity.value;
  if (roomValue === '100' && capacityValue !== '0') {
    inputRoomNumber.setCustomValidity('Такое количество комнат не для приема гостей. Выберите поле "Не для гостей".');
  } else if (roomValue < capacityValue){
    inputRoomNumber.setCustomValidity('Количетво гостей не может превышать количесвтво комнат!');
  } else {
    inputRoomNumber.setCustomValidity('');
  }

  inputRoomNumber.reportValidity();
};

inputRoomNumber.addEventListener('change', onValidateRoomCapacity);
inputCapacity.addEventListener('change', onValidateRoomCapacity);


inputTitle.addEventListener('input', () => {
  const titleValueLength = inputTitle.value.length;
  if(titleValueLength < MIN_TITLE_LENGTH){
    inputTitle.setCustomValidity(`Ещё ${MIN_TITLE_LENGTH - titleValueLength} символов.`);
  } else if (titleValueLength > MAX_TITLE_LENGTH) {
    inputTitle.setCustomValidity(`Удалите лишние ${MAX_TITLE_LENGTH - titleValueLength} символы.`);
  } else {
    inputTitle.setCustomValidity('');
  }

  inputTitle.reportValidity();
});

inputPrice.addEventListener('input', () => {
  const priceValue = inputPrice.value;
  if(priceValue < MIN_PRICE){
    inputPrice.setCustomValidity(`Цена должна быть больше ${MIN_PRICE} `);
  } else if (priceValue > MAX_PRICE) {
    inputPrice.setCustomValidity(`Удалите не может быть больше ${MAX_PRICE}`);
  } else {
    inputPrice.setCustomValidity('');
  }

  inputPrice.reportValidity();
});

const setReset = () => {
  resetBtn.addEventListener('click', (evt) => {
    evt.preventDefault();
    clearAll();
  });
};

const onSuccessPopup = () => {
  clearAll();
  renderPopup(successPopup);
};

const onErrorPopup = () => {
  renderPopup(errorPopup);
};

const setFormSubmit = () => {
  form.addEventListener('submit', (evt) =>{
    evt.preventDefault();

    sendData(
      () => onSuccessPopup(),
      () => onErrorPopup(),
      new FormData(evt.target),
    );
  });
};

const changeStateForm = (isActive) => {
  if (isActive) {
    doFormActive(form);
    doFormActive(filters);
  } else {
    doFormDisable(form);
    doFormDisable(filters);
  }
};

changeStateForm(false);


export{
  form,
  filters,
  setFormSubmit,
  setReset,
  changeStateForm
};
