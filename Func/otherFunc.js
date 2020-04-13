// Общие функции

// Если значение value можно перевести в число - возвращаем число, иначе null.
const getNumberValue = (value) => (Number.isNaN(+value) ? null : +value);

// Функция получения оценки. allCount - всего ответов, rigthCount - правильных ответов,
// minCount - минимальное количество ответов для получения оценки
const getRating = (allCount, rigthCount, minCount = 10) => {
  if (allCount < minCount) return 'Решено мало заданий';
  const result = Math.round((rigthCount / allCount) * 5);
  return result < 1 ? 1 : result;
};

// Показывает скольхо правильных ответов до повышения оценки. allCount - всего ответов,
// rigthCount - правильных ответов, minCount - минимальное количество ответов для получения оценки
const nextRating = (allCount, rigthCount, minCount = 10) => {
  const currentRating = getRating(allCount, rigthCount);
  if (currentRating === 5 || allCount < minCount) return '';
  for (let i = 1; i < 11; i += 1) {
    if (getRating(allCount + i, rigthCount + i) > currentRating) {
      return ` (до ${currentRating + 1} ещё ${i} правильных ответов.)`;
    }
  }
  return ` (до ${currentRating + 1} больше 10 правильных ответов.)`;
};

export { getNumberValue, getRating, nextRating };
