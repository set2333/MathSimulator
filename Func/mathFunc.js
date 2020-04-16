// Математические функции

// Получение случайного целого числа в даипазоне от minб до max.
const getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

// Получение случайного целого числа от 1 до num.
const getRandomNaturalInt = (num) => getRandomInt(1, num);

// Получение правильного ответа
const getAnswer = (op1, op2, operator) => {
  switch (operator) {
    case 1:
      return op1 + op2;
    case 2:
      return op1 - op2;
    case 3:
      return op1 * op2;
    case 4:
      return op1 / op2;
    case 5: {
      if (op1 > op2) return 1;
      if (op1 < op2) return -1;
      return 0;
    }
    default:
      return null;
  }
};

// Получим наибольший общий делитель
function getNOD(arg1, arg2) {
  if (!arg1 && !arg2) return 0;
  if (arg1 && !arg2) return arg1;
  if (!arg1 && arg2) return arg2;
  let a = arg1;
  let b = arg2;
  if (b > a) [a, b] = [b, a];
  const result = a % b;
  if (result === a) return 1;
  if (result) b = getNOD(b, result);
  return b;
}

// Получим наименьшее общее кратное
function getNOK(arg1, arg2) {
  return (arg1 * arg2) / getNOD(arg1, arg2);
}

// Получим общий знаменатель
function getDivider(divider1, divider2) {
  if (divider1 && divider2) return divider1 * divider2;
  if (divider1 && !divider2) return divider1;
  if (!divider1 && divider2) return divider2;
  return 0;
}

// получим модуль числа
const getModule = (num) => (num < 0 ? -num : num);

// Разобъем дробь на целую и дробную часть. Функция принимает числител и знаменатель.
function getNiceFraction(_divident, _divider) {
  if (!_divider) return { intPart: 0, divident: 0, divider: 0 };
  let [divider, divident] = [_divider, _divident];
  let intPart = Math.trunc(divident / divider);
  if (Object.is(intPart, -0)) intPart = 0;
  divident -= intPart * divider;
  if (intPart !== 0) divident = getModule(divident);
  divider = divider >= 0 ? divider : -divider;
  if (divident) {
    const NOD = getNOD(getModule(divident), divider);
    [divident, divider] = [(divident /= NOD), (divider /= NOD)];
  } else {
    [divident, divider] = [0, 0];
  }
  return { intPart, divident, divider };
}

// Получим дробь без целой части. Перенесем целую часть в числитель.
function getFraction(fr, divider = 1) {
  const sign = Object.is(fr.intPart, -0) || fr.intPart < 0 ? -1 : 1;
  return {
    divident: (fr.divident * sign + fr.divider * fr.intPart) * divider,
    divider: getDivider(fr.divider, divider),
  };
}

// Сложение двух дробей
const additionFraction = (fr1, fr2) => {
  const resFr1 = getFraction({ ...fr1 }, fr2.divider ? fr2.divider : 1);
  const resFr2 = getFraction({ ...fr2 }, fr1.divider ? fr1.divider : 1);
  return getNiceFraction(resFr1.divident + resFr2.divident, resFr1.divider);
};

// Вычитание это сожение с числом с противоположным знаком.
// Поменяем знак у второго числа, сложим их и вернем результат
const subtractionFraction = (fr1, fr2) => additionFraction(fr1, { ...fr2, intPart: -fr2.intPart });

// Умножение двух дробей
const multiplicationFraction = (fr1, fr2) => {
  const resFr1 = getFraction({ ...fr1, divident: fr1.divident });
  const resFr2 = getFraction({ ...fr2, divident: fr2.divident });
  return getNiceFraction(resFr1.divident * resFr2.divident, resFr1.divider * resFr2.divider);
};

// Деление двух дробей. Деление это умножение на перевернутую дробь
const divisionFraction = (fr1, fr2) => multiplicationFraction(fr1, {
  ...fr2,
  divident: fr2.divider,
  divider: fr2.divident,
});

// Сравнение двух обыкновенных дробей. Если первая дробь больше второй вернем 1, если меньше -1.
// Если они равны, вернем 0.
const compareFraction = (fr1, fr2) => {
  const { divident } = getFraction(subtractionFraction(fr1, fr2));
  if (divident > 0) return 1;
  if (divident < 0) return -1;
  return 0;
};

// Получение правильного с дробями
const getAnswerFraction = (op1, op2, operator) => {
  if (operator === 1) return additionFraction(op1, op2);
  if (operator === 2) return subtractionFraction(op1, op2);
  if (operator === 3) return multiplicationFraction(op1, op2);
  return divisionFraction(op1, op2);
};

export {
  getRandomInt,
  getRandomNaturalInt,
  getAnswer,
  additionFraction,
  subtractionFraction,
  multiplicationFraction,
  divisionFraction,
  getAnswerFraction,
  compareFraction,
  getNOD,
  getNiceFraction,
  getFraction,
  getNOK,
};
