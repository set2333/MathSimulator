// Тренажер устного счета. Примеры на умножение  и деление чисел от 1 до 10. Все числа ценые и не
// отрицательные. В случае с делением результат всегда целое число.

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { getRandomNaturalInt, getRandomInt, getAnswer } from '../Func/mathFunc';
import { SM_DIV, SM_MULT, getSymbolOperator } from '../Func/otherFunc';
import Reducer from '../Func/standartReducer';
import Nav from '../Components/Nav';
import Panel from '../Components/Panel';
import StandartExemple from '../Components/StandartExemple';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное значение операндов
const MAX_OPERAND = 10;

// Получение нового примера
function GetInitialState() {
  this.operator = getRandomInt(3, 4);
  this.op1 = getRandomNaturalInt(MAX_OPERAND);
  this.op2 = getRandomNaturalInt(MAX_OPERAND);
  if (this.operator === 4) [this.op1, this.op2] = [this.op2 * this.op1, this.op1];
  this.answer = getAnswer(this.op1, this.op2, this.operator);
  this.userAnswer = null;
}

const reducer = Reducer(GetInitialState);

const verbalMultiply = ({ initialState }) => {
  const [Statistic, addTrueAnswer, addFalseAnswer] = useStatistic();
  const [History, addHistory] = useHistory();
  const [state, dispatch] = useReducer(reducer, {
    ...initialState,
    addTrueAnswer,
    addFalseAnswer,
    addHistory,
  });
  return (
    <Container maxWidth="md">
      <Nav title={`Тренажер устного счета(${SM_MULT},${SM_DIV})`} />
      <StandartExemple
        example={`${state.op1} ${getSymbolOperator(state.operator)} ${state.op2} = `}
        userAnswer={state.userAnswer}
        dispatch={dispatch}
      />
      <Panel
        dispatch={dispatch}
        actionTypes={{ setNumber: 'ADD_ANSWER', setAnswer: 'SET_ANSWER', answer: 'ANSWER' }}
      />
      <Statistic />
      <History />
    </Container>
  );
};

verbalMultiply.propTypes = {
  initialState: PropTypes.objectOf(PropTypes.number),
};

verbalMultiply.defaultProps = {
  initialState: {
    op1: 1,
    op2: 2,
    operator: 1,
    answer: 3,
    userAnswer: null,
  },
};

export function getStaticProps() {
  return {
    props: {
      initialState: { ...new GetInitialState() },
    },
  };
}

export default verbalMultiply;
