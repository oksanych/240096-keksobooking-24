const FILE_TYPE = ['gif', 'jpeg', 'jpg', 'png'];
const avatarChooser = document.querySelector('#avatar');
const avatarPreview = document.querySelector('.ad-form-header__preview-img');
const roomChooser = document.querySelector('#images');
const roomPreview = document.querySelector('.ad-form__photo');

const checkPictureType = (fileName) => FILE_TYPE.some((fileType) => fileName.endsWith(fileType));

const createNodeImg = (container) => {
  const img = document.createElement('img');
  container.append(img);

  return img;
};

const addAvatarPreview = (fileChooser, filePreview) => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();

  if (checkPictureType(fileName)) {
    filePreview.src = URL.createObjectURL(file);
  }
};

const addImagesPreview = (fileChooser, filePreview) => {
  const files = fileChooser.files;

  for (const file of files){
    const fileName = file.name.toLowerCase();
    const img = createNodeImg(filePreview);

    if (checkPictureType(fileName)) {
      img.src = URL.createObjectURL(file);
      img.width = '70';
      img.height = '70';
    }
  }
};

avatarChooser.addEventListener('change', () => addAvatarPreview(avatarChooser, avatarPreview));
roomChooser.addEventListener('change', () => addImagesPreview(roomChooser, roomPreview));

export{
  roomPreview
};
