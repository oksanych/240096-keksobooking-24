// Link to source https://careerkarma.com/blog/javascript-random-number/

function getRandomNumber(min, max){
  if (min > max) {
    [min, max] = [max, min];
    return Math.floor(Math.random() * (max - min) + min);
  } else if (min < 0 || max < 0){
    return new Error('Min and max value must be more than 0');
  }

  return Math.floor(Math.random() * (max - min) + min);
}

getRandomNumber(1, 100);

function getRandomNumberFloatPoint(min, max, number){
  if (min > max) {
    [min, max] = [max, min];
    return parseFloat((Math.random() * (max - min) + min).toFixed(number));
  } else if (min < 0 || max < 0){
    return new Error('Min and max value must be more than 0');
  }

  return parseFloat((Math.random() * (max - min) + min).toFixed(number));
}

getRandomNumberFloatPoint(1, 100, 3);

