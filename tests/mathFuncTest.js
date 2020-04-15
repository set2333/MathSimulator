// Тестирование математических функции
import {
  getAnswer,
  getNOD,
  getNiceFraction,
  getFraction,
  additionFraction,
  subtractionFraction,
  multiplicationFraction,
  divisionFraction,
} from '../Func/mathFunc';

const mathFuncTest = () => {
  // Тест функции getAnswer
  expect(getAnswer(20, 4, 1)).toBe(24);
  expect(getAnswer(20, 4, 2)).toBe(16);
  expect(getAnswer(20, 4, 3)).toBe(80);
  expect(getAnswer(20, 4, 4)).toBe(5);

  // Тест функции getNOD
  expect(getNOD(20, 0)).toBe(20);
  expect(getNOD(0, 20)).toBe(20);
  expect(getNOD(3, 4)).toBe(1);
  expect(getNOD(20, 4)).toBe(4);
  expect(getNOD(20, 12)).toBe(4);

  // Тест функции getNiceFraction
  expect(getNiceFraction(6, 2)).toEqual({
    intPart: 3,
    divident: 0,
    divider: 0,
  });
  expect(getNiceFraction(7, 3)).toEqual({
    intPart: 2,
    divident: 1,
    divider: 3,
  });
  expect(getNiceFraction(12, 10)).toEqual({
    intPart: 1,
    divident: 1,
    divider: 5,
  });
  expect(getNiceFraction(-16, 10)).toEqual({
    intPart: -1,
    divident: 3,
    divider: 5,
  });
  expect(getNiceFraction(-24, 30)).toEqual({
    intPart: 0,
    divident: -4,
    divider: 5,
  });

  // Тест функции getFraction
  expect(
    getFraction({
      intPart: 2,
      divident: 1,
      divider: 4,
    }),
  ).toEqual({
    divident: 9,
    divider: 4,
  });
  expect(
    getFraction({
      intPart: -3,
      divident: 5,
      divider: 10,
    }),
  ).toEqual({
    divident: -35,
    divider: 10,
  });

  // Тест функции additionFraction
  expect(
    additionFraction(
      { intPart: 2, divident: 6, divider: 7 },
      { intPart: 3, divident: 5, divider: 14 },
    ),
  ).toEqual({ intPart: 6, divident: 3, divider: 14 });
  expect(
    additionFraction(
      { intPart: 0, divident: 1, divider: 3 },
      { intPart: 0, divident: 1, divider: 3 },
    ),
  ).toEqual({ intPart: 0, divident: 2, divider: 3 });
  expect(
    additionFraction(
      { intPart: 0, divident: 0, divider: 0 },
      { intPart: 3, divident: 7, divider: 14 },
    ),
  ).toEqual({ intPart: 3, divident: 1, divider: 2 });
  expect(
    additionFraction(
      { intPart: 5, divident: 17, divider: 8 },
      { intPart: 0, divident: 0, divider: 0 },
    ),
  ).toEqual({ intPart: 7, divident: 1, divider: 8 });
  expect(
    additionFraction(
      { intPart: 2, divident: 2, divider: 3 },
      { intPart: 4, divident: 6, divider: 7 },
    ),
  ).toEqual({ intPart: 7, divident: 11, divider: 21 });
  expect(
    additionFraction(
      { intPart: 2, divident: 3, divider: 5 },
      { intPart: -1, divident: 2, divider: 4 },
    ),
  ).toEqual({ intPart: 1, divident: 1, divider: 10 });
  expect(
    additionFraction(
      { intPart: 2, divident: 3, divider: 5 },
      { intPart: -1, divident: 2, divider: 4 },
    ),
  ).toEqual({ intPart: 1, divident: 1, divider: 10 });
  expect(
    additionFraction(
      { intPart: 2, divident: 1, divider: 3 },
      { intPart: 3, divident: 2, divider: 3 },
    ),
  ).toEqual({ intPart: 6, divident: 0, divider: 0 });

  // Тест функции subtractionFraction
  expect(
    subtractionFraction(
      { intPart: 5, divident: 6, divider: 7 },
      { intPart: 3, divident: 4, divider: 5 },
    ),
  ).toEqual({ intPart: 2, divident: 2, divider: 35 });
  expect(
    subtractionFraction(
      { intPart: -5, divident: 6, divider: 7 },
      { intPart: 2, divident: 4, divider: 5 },
    ),
  ).toEqual({ intPart: -8, divident: 23, divider: 35 });
  expect(
    subtractionFraction(
      { intPart: 0, divident: 0, divider: 0 },
      { intPart: 2, divident: 4, divider: 6 },
    ),
  ).toEqual({ intPart: -2, divident: 2, divider: 3 });
  expect(
    subtractionFraction(
      { intPart: 0, divident: 2, divider: 3 },
      { intPart: 0, divident: 1, divider: 3 },
    ),
  ).toEqual({ intPart: 0, divident: 1, divider: 3 });
  // Тест функции multiplicationFraction
  expect(
    multiplicationFraction(
      { intPart: 2, divident: 5, divider: 10 },
      { intPart: 3, divident: 4, divider: 5 },
    ),
  ).toEqual({ intPart: 9, divident: 1, divider: 2 });
  expect(
    multiplicationFraction(
      { intPart: 2, divident: 5, divider: 10 },
      { intPart: 0, divident: 0, divider: 0 },
    ),
  ).toEqual({ intPart: 0, divident: 0, divider: 0 });
  expect(
    multiplicationFraction(
      { intPart: 0, divident: 0, divider: 0 },
      { intPart: 0, divident: 2, divider: 3 },
    ),
  ).toEqual({ intPart: 0, divident: 0, divider: 0 });

  // Тест функции divisionFraction
  expect(
    divisionFraction(
      { intPart: 0, divident: 5, divider: 10 },
      { intPart: 0, divident: 1, divider: 4 },
    ),
  ).toEqual({ intPart: 2, divident: 0, divider: 0 });
  expect(
    divisionFraction(
      { intPart: 3, divident: 5, divider: 10 },
      { intPart: 0, divident: 0, divider: 0 },
    ),
  ).toEqual({ intPart: 0, divident: 0, divider: 0 });
};

export default mathFuncTest;
