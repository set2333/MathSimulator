// Математические функции

// Получение случайного целого числа в даипазоне от minб до max.
const getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

// Получение случайного целого числа от 1 до num.
const getRandomNaturalInt = (num) => getRandomInt(1, num);

// Получение правильного ответа
const getAnswer = (op1, op2, operator) => {
  if (operator === 1) return op1 + op2;
  if (operator === 2) return op1 - op2;
  if (operator === 3) return op1 * op2;
  return op1 / op2;
};

export { getRandomInt, getRandomNaturalInt, getAnswer };
