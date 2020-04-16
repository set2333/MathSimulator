// Сравнение чисел. Самый простой вариант для первого класса

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { getRandomInt, getNOK } from '../Func/mathFunc';
import Reducer from '../Func/reducers/nodReducer';
import Nav from '../Components/Nav';
import Panel from '../Components/Panel';
import StandartExemple from '../Components/StandartExemple';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное и минимальное значение операндов
const MIN_OPERAND = 1;
const MAX_OPERAND = 20;

// Получение нового примера
function GetInitialState() {
  this.op1 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  this.op2 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  this.answer = getNOK(this.op1, this.op2);
  this.userAnswer = null;
}

const reducer = Reducer(GetInitialState);

const NOK = ({ initialState }) => {
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
      <Nav title="Наименьшее общее кратное" />
      <StandartExemple
        example={`${state.op1} и ${state.op2} = `}
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

NOK.propTypes = {
  initialState: PropTypes.objectOf(PropTypes.number),
};

NOK.defaultProps = {
  initialState: {
    op1: 1,
    op2: 2,
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

export default NOK;
