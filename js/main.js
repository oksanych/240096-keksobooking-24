// Link to source https://careerkarma.com/blog/javascript-random-number/

function getRendomNumber(min, max){
  if (min >= max) {
    return 'The max value can not be equal or less than the min value';
  } else if (min < 0 || max < 0){
    return 'Min and max value must be more than 0';
  }

  return Math.floor(Math.random() * (max - min) + min);
}

getRendomNumber(1, 100);

function getRendomNumberFloatPoint(min, max, number){
  if (min >= max) {
    return 'The max value can not be equal or less than the min value';
  } else if (min < 0 || max < 0){
    return 'Min and max value must be more than 0';
  }

  return (Math.random() * (max - min) + min).toFixed(number);
}

getRendomNumberFloatPoint(1, 100, 3);

