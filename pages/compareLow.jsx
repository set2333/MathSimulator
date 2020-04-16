// Сравнение чисел. Самый простой вариант для первого класса

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { getRandomInt, getAnswer } from '../Func/mathFunc';
import Reducer from '../Func/reducers/compareReducer';
import Nav from '../Components/Nav';
import CompareExemple from '../Components/CompareExemple';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное и минимальное значение операндов
const MIN_OPERAND = 1;
const MAX_OPERAND = 20;

// Получение нового примера
function GetInitialState() {
  this.operator = 5;
  this.op1 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  this.op2 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  this.answer = getAnswer(this.op1, this.op2, this.operator);
  this.userAnswer = 0;
}

const reducer = Reducer(GetInitialState);

const CompareLow = ({ initialState }) => {
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
      <Nav title="Сравнение чисел" />
      <CompareExemple
        op1={state.op1}
        op2={state.op2}
        userAnswer={state.userAnswer}
        dispatch={dispatch}
      />
      <Statistic />
      <History />
    </Container>
  );
};

CompareLow.propTypes = {
  initialState: PropTypes.objectOf(PropTypes.number),
};

CompareLow.defaultProps = {
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

export default CompareLow;
