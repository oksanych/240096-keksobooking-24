const typesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarMapList = document.querySelector('#map-canvas');
const similarMapItemTemplate = document.querySelector('#card').content.querySelector('.popup');
const similarListFragment = document.createDocumentFragment();

const createMapItems = (data) => {
  data.forEach((object) => {
    const similarMapItem = similarMapItemTemplate.cloneNode(true);
    const featureClassArray = object.offer.features.map((item) => `popup__feature--${item}`);
    const features = similarMapItem.querySelectorAll('.popup__feature');
    const photos = similarMapItem.querySelector('.popup__photos');
    const title = similarMapItem.querySelector('.popup__title');
    const address = similarMapItem.querySelector('.popup__text--address');
    const price = similarMapItem.querySelector('.popup__text--price');
    const type = similarMapItem.querySelector('.popup__type');
    const capacity = similarMapItem.querySelector('.popup__text--capacity');
    const time = similarMapItem.querySelector('.popup__text--time');
    const description = similarMapItem.querySelector('.popup__description');
    const avatar = similarMapItem.querySelector('.popup__avatar');

    if(object.offer.features){
      features.forEach((item) => {
        const modifier = item.classList[1];
        if(!featureClassArray.includes(modifier)){
          item.remove();
        }
      });
    } else{
      features.classList.add('hidden');
    }

    if (object.offer.title) {
      title.textContent = object.offer.title;
    } else {
      title.classList.add('hidden');
    }

    if (object.offer.address) {
      address.textContent = object.offer.address;
    } else {
      address.classList.add('hidden');
    }

    if (object.offer.price) {
      price.textContent = `${object.offer.price} ₽/ночь`;
    } else {
      price.classList.add('hidden');
    }

    if (object.offer.type) {
      type.textContent = typesDictionary[object.offer.type];
    } else {
      type.classList.add('hidden');
    }

    if (object.offer.rooms && object.offer.persons) {
      capacity.textContent = `${object.offer.rooms} комнаты для ${object.offer.persons} гостей`;
    } else {
      capacity.classList.add('hidden');
    }

    if (object.offer.checkin && object.offer.checkout) {
      time.textContent = `Заезд после ${object.offer.checkin}, выезд до ${object.offer.checkout}`;
    } else {
      time.classList.add('hidden');
    }

    if (object.offer.description) {
      description.textContent = object.offer.description;
    } else {
      description.classList.add('hidden');
    }

    if (object.author.avatar) {
      avatar.src = object.author.avatar;
    } else {
      avatar.classList.add('hidden');
    }

    if (object.offer.photos) {
      photos.innerHTML = '';
      object.offer.photos.forEach((photo) => {
        const img = document.createElement('img');
        img.classList.add('popup__photo');
        img.src = photo;
        img.width = 45;
        img.height = 40;
        if (!img.src) {
          photo.remove();
        }
        photos.appendChild(img);
      });
    } else{
      photos.classList.add('hidden');
    }

    similarListFragment.appendChild(similarMapItem);
  });

  similarMapList.appendChild(similarListFragment);
};

export {
  createMapItems
};

