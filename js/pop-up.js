import { isEscapeKey } from './utils.js';

const renderPopup = (node) => {
  const onEscKeydown = (evt) => {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      node.remove();
      document.removeEventListener('keydown', onEscKeydown);
    }
  };

  const onPopupClick = () => {
    node.remove();
    document.removeEventListener('keydown', onEscKeydown);
  };

  document.body.appendChild(node);

  document.addEventListener('keydown', onEscKeydown);
  node.addEventListener('click', onPopupClick);
};

export {
  renderPopup
};
