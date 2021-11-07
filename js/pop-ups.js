import { isEscapeKey } from './utils.js';

const successPopup = () => {
  const successPopupTemplate = document.querySelector('#success').content.querySelector('.success');

  const successPopupHide = () =>{
    successPopupTemplate.remove();
  };

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      successPopupHide();
    }
  };

  document.addEventListener('keydown', onEscKeydown);

  successPopupTemplate.addEventListener('click', successPopupHide);

  document.body.appendChild(successPopupTemplate);
};

const errorPopup = () => {
  const errorPopupTemplate = document.querySelector('#error').content.querySelector('.error');

  const errorPopupHide = () =>{
    errorPopupTemplate.remove();
  };

  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      errorPopupHide();
    }
  };

  document.addEventListener('keydown', onEscKeydown);

  errorPopupTemplate.addEventListener('click', errorPopupHide);

  document.body.appendChild(errorPopupTemplate);
};

export {
  successPopup,
  errorPopup
};
