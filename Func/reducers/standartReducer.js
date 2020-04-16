// Reducer. Содержит state = {
// operator(number) - вид операции ( 1 - умножение, 2 - диление)
// op1(number) - первый операнд
// op1(number) - второй операнд
// answer(number) - правильный ответ
// userAnswer(number) - пользовательский ответ
// addTrueAnswer(function) - добавить в статистику верный ответ
// addFalseAnswer(function) - добавить в статистику не верный ответ
// addHistory(function) - сохранить пример в истории
// }
import { getNumberValue, getSymbolOperator } from '../otherFunc';

const Reducer = (GetInitialState) => (reducerState, action) => {
  switch (action.type) {
    case 'ANSWER': {
      reducerState.addHistory({
        date: new Date(),
        example: `${reducerState.op1} ${getSymbolOperator(reducerState.operator)} ${
          reducerState.op2
        } = `,
        answer: reducerState.answer,
        userAnswer: reducerState.userAnswer,
      });
      if (reducerState.userAnswer === reducerState.answer) reducerState.addTrueAnswer();
      else reducerState.addFalseAnswer();
      return { ...reducerState, ...new GetInitialState() };
    }
    case 'SET_ANSWER': {
      const userAnswer = getNumberValue(action.value);
      if (userAnswer !== null) return { ...reducerState, userAnswer };
      return { ...reducerState };
    }

    case 'ADD_ANSWER':
      return {
        ...reducerState,
        userAnswer: +`${reducerState.userAnswer === null ? '' : reducerState.userAnswer}${
          action.value
        }`,
      };
    default:
      return { ...reducerState };
  }
};

export default Reducer;
