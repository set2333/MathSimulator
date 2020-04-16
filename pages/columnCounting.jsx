// Тренажер устного счета. Примеры на сложение и вычитание чисел от 100 до 10000. Все числа ценые и
// не отрицательные. В случае с вычитанием уменьшаемое всегда больше вычитаемого. т.е разность > 0.

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { getRandomInt, getRandomNaturalInt, getAnswer } from '../Func/mathFunc';
import { getSymbolOperator } from '../Func/otherFunc';
import Reducer from '../Func/reducers/standartReducer';
import Nav from '../Components/Nav';
import Panel from '../Components/Panel';
import StandartExemple from '../Components/StandartExemple';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное и минимальное значение операндов
const MIN_OPERAND = 100;
const MAX_OPERAND = 10000;

// Получение нового примера
function GetInitialState() {
  this.operator = getRandomNaturalInt(2);
  this.op1 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  this.op2 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  if (this.operator === 2 && this.op1 < this.op2) [this.op1, this.op2] = [this.op2, this.op1];
  this.answer = getAnswer(this.op1, this.op2, this.operator);
  this.userAnswer = null;
}

const reducer = Reducer(GetInitialState);

const VerbalCounting = ({ initialState }) => {
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
      <Nav title="Тренажер счета столбиком(+,-)" />
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

VerbalCounting.propTypes = {
  initialState: PropTypes.objectOf(PropTypes.number),
};

VerbalCounting.defaultProps = {
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

export default VerbalCounting;
