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
import { getNumberValue } from '../otherFunc';

const Reducer = (GetInitialState) => (state, action) => {
  switch (action.type) {
    case 'ANSWER': {
      let answer = '>';
      if (state.answer === -1) answer = '<';
      else if (state.answer === 0) answer = '=';
      let userAnswer = '>';
      if (state.userAnswer === -1) userAnswer = '<';
      else if (state.userAnswer === 0) userAnswer = '=';
      state.addHistory({
        date: new Date(),
        example: `${state.op1} ? ${state.op2}`,
        answer,
        userAnswer,
      });
      if (state.userAnswer === state.answer) state.addTrueAnswer();
      else state.addFalseAnswer();
      return { ...state, ...new GetInitialState() };
    }
    case 'SET_ANSWER': {
      const userAnswer = getNumberValue(action.value);
      if (userAnswer !== null) return { ...state, userAnswer };
      return { ...state };
    }

    case 'ADD_ANSWER':
      return {
        ...state,
        userAnswer: +`${state.userAnswer === null ? '' : state.userAnswer}${action.value}`,
      };
    default:
      return { ...state };
  }
};

export default Reducer;
