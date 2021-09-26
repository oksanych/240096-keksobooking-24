// Link to source https://careerkarma.com/blog/javascript-random-number/

function getRandomInRange (min, max){
  if (min < 0 || max < 0 ) {
    return new Error('Min and max value must be more than 0');
  } else if (min > max){
    [min, max] = [max, min];
  }

  return Math.random() * (max - min) + min;
}

function getRandomNumber(min, max){
  return Math.floor(getRandomInRange(min, max));
}

getRandomNumber(1, 100);

function getRandomNumberFloatPoint(min, max, number = 1){
  return parseFloat(getRandomInRange(min, max).toFixed(number));
}

getRandomNumberFloatPoint(1, 100, 3);
