const typesDictionary = {
  palace: 'Дворец',
  flat: 'Квартира',
  house: 'Дом',
  bungalow: 'Бунгало',
  hotel: 'Отель',
};

const similarMapItemTemplate = document.querySelector('#card').content.querySelector('.popup');

const createMapItems = (data) => {
  const similarMapItem = similarMapItemTemplate.cloneNode(true);
  const featureClassArray = data.offer.features.map((item) => `popup__feature--${item}`);
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

  if(data.offer.features){
    features.forEach((item) => {
      const modifier = item.classList[1];
      if(!featureClassArray.includes(modifier)){
        item.remove();
      }
    });
  } else{
    features.classList.add('hidden');
  }

  if (data.offer.title) {
    title.textContent = data.offer.title;
  } else {
    title.classList.add('hidden');
  }

  if (data.offer.address) {
    address.textContent = data.offer.address;
  } else {
    address.classList.add('hidden');
  }

  if (data.offer.price) {
    price.textContent = `${data.offer.price} ₽/ночь`;
  } else {
    price.classList.add('hidden');
  }

  if (data.offer.type) {
    type.textContent = typesDictionary[data.offer.type];
  } else {
    type.classList.add('hidden');
  }

  if (data.offer.rooms && data.offer.persons) {
    capacity.textContent = `${data.offer.rooms} комнаты для ${data.offer.persons} гостей`;
  } else {
    capacity.classList.add('hidden');
  }

  if (data.offer.checkin && data.offer.checkout) {
    time.textContent = `Заезд после ${data.offer.checkin}, выезд до ${data.offer.checkout}`;
  } else {
    time.classList.add('hidden');
  }

  if (data.offer.description) {
    description.textContent = data.offer.description;
  } else {
    description.classList.add('hidden');
  }

  if (data.author.avatar) {
    avatar.src = data.author.avatar;
  } else {
    avatar.classList.add('hidden');
  }

  if (data.offer.photos) {
    photos.innerHTML = '';
    data.offer.photos.forEach((photo) => {
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

  return similarMapItem;
};

export {
  createMapItems
};

