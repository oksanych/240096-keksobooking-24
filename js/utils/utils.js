const getRandomInRange = (min, max)=> {
  if (min < 0 || max < 0 ) {
    return new Error('Min and max value must be more than 0');
  }

  if (min > max){
    [min, max] = [max, min];
  }

  return Math.random() * (max - min) + min;
};

const getRandomNumber = (min, max)=> Math.floor(getRandomInRange(min, max));
const getRandomNumberFloatPoint = (min, max, number = 1) =>parseFloat(getRandomInRange(min, max).toFixed(number));
const getRandomElement = (elements) => elements[getRandomNumber(0, elements.length)];
const getShuffledArray = (elements) => {
  for (let i = elements.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [elements[i], elements[j]] = [elements[j], elements[i]];
  }
  return elements;
};
const getRandomArray = (elements) => getShuffledArray(elements).slice(0, getRandomNumber(0, elements.length));

export{
  getRandomNumber,
  getRandomNumberFloatPoint,
  getRandomElement,
  getRandomArray
};
