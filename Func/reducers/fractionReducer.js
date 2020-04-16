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

const Reducer = (GetInitialState) => (state, action) => {
  switch (action.type) {
    case 'ANSWER': {
      const userAnswer = {
        intPart: state.userAnswer.intPart === null ? 0 : state.userAnswer.intPart,
        divident: state.userAnswer.divident === null ? 0 : state.userAnswer.divident,
        divider: state.userAnswer.divider === null ? 0 : state.userAnswer.divider,
      };
      state.addHistory({
        date: new Date(),
        example: `${state.intPart1} ${state.divident1}/${state.divider1} ${getSymbolOperator(
          state.operator,
        )} ${state.intPart2} ${state.divident2}/${state.divider2} = `,
        answer: `${state.answer.intPart} ${state.answer.divident}/${state.answer.divider}`,
        userAnswer: `${userAnswer.intPart} ${userAnswer.divident}/${userAnswer.divider}`,
      });
      if (
        state.answer.intPart === userAnswer.intPart
        && state.answer.divident === userAnswer.divident
        && state.answer.divider === userAnswer.divider
      ) state.addTrueAnswer();
      else state.addFalseAnswer();
      return { ...state, ...new GetInitialState() };
    }
    case 'SET_INTPART': {
      const intPart = getNumberValue(action.value);
      if (intPart !== null) return { ...state, userAnswer: { ...state.userAnswer, intPart } };
      return { ...state };
    }
    case 'SET_DIVIDENT': {
      const divident = getNumberValue(action.value);
      if (divident !== null) return { ...state, userAnswer: { ...state.userAnswer, divident } };
      return { ...state };
    }
    case 'SET_DIVIDER': {
      const divider = getNumberValue(action.value);
      if (divider !== null) return { ...state, userAnswer: { ...state.userAnswer, divider } };
      return { ...state };
    }

    case 'ADD_ ':
      return {
        ...state,
        userAnswer: +`${state.userAnswer === null ? '' : state.userAnswer}${action.value}`,
      };
    default:
      return { ...state };
  }
};

export default Reducer;
