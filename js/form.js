const form = document.querySelector('.ad-form');
const filters = document.querySelector('.map__filters');

const doFormDisable = (element) => {
  element.classList.add(`${element.classList[0]}--disabled`);

  [...element.children].forEach((item)=> item.setAttribute('disabled', 'disabled'));
};

const doFormActive = (element) => {
  element.classList.remove(`${element.classList[0]}--disabled`);

  [...element.children].forEach((item)=> item.removeAttribute('disabled'));
};

doFormDisable(form);
doFormDisable(filters);
doFormActive(form);
doFormActive(filters);

export{
  doFormDisable,
  doFormActive
};
