// Список всех страниц {title: Название страницы, path: Путь к странице, index: уникальный номер,
// classes: классы для которых доступенн тренажер}
import { SM_MULT, SM_DIV } from './otherFunc';

export default [
  {
    titlePage: 'Сравнение простых чисел',
    path: '/compareLow',
    index: 0,
    classes: [0, 1],
  },
  {
    titlePage: 'Простой устный счет(+,-)',
    path: '/columnCountingLow',
    index: 1,
    classes: [0, 1],
  },
  {
    titlePage: 'Устный счет(+,-)',
    path: '/verbalCounting',
    index: 2,
    classes: [0, 2, 3],
  },
  {
    titlePage: `Устный счет(${SM_MULT},${SM_DIV})`,
    path: '/verbalMultiply',
    index: 3,
    classes: [0, 2, 3],
  },
  {
    titlePage: `Устный счет(+, -, ${SM_MULT},${SM_DIV})`,
    path: '/verbalAll',
    index: 4,
    classes: [0, 2, 3],
  },
  {
    titlePage: 'Столбиком(+,-)',
    path: '/columnCounting',
    index: 5,
    classes: [0, 2, 3, 4],
  },
  {
    titlePage: `Столбиком(${SM_MULT},${SM_DIV})`,
    path: '/columnMultiply',
    index: 6,
    classes: [0, 3, 4, 5],
  },
  {
    titlePage: `Столбиком(+, -, ${SM_MULT},${SM_DIV})`,
    path: '/columnAll',
    index: 7,
    classes: [0, 3, 4, 5],
  },
  {
    titlePage: 'Обыкновенные дроби(+, -,)',
    path: '/fractionCounting',
    index: 8,
    classes: [0, 4, 5, 6],
  },
  {
    titlePage: `Обыкновенные дроби(${SM_MULT},${SM_DIV})`,
    path: '/fractionMultiply',
    index: 9,
    classes: [0, 5, 6, 7],
  },
  {
    titlePage: `Обыкновенные дроби(+, -, ${SM_MULT},${SM_DIV})`,
    path: '/fractionAll',
    index: 10,
    classes: [0, 5, 6, 7],
  },
  {
    titlePage: 'Наибольший общий делитель',
    path: '/nod',
    index: 11,
    classes: [0, 6, 7],
  },
  {
    titlePage: 'Наименьшее общее кратное',
    path: '/nok',
    index: 12,
    classes: [0, 6, 7],
  },
];
