// Математические функции

// Получение случайного целого числа в даипазоне от minб до max.
const getRandomInt = (min, max) => Math.round(min - 0.5 + Math.random() * (max - min + 1));

// Получение случайного целого числа от 1 до num.
const getRandomNaturalInt = (num) => getRandomInt(1, num);

export { getRandomInt, getRandomNaturalInt };
