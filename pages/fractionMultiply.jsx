// Примеры на умножение и деление обыкновенных дробей. Все числа не отрицательные.

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import { Container } from '@material-ui/core';
import { getRandomNaturalInt, getAnswerFraction, getRandomInt } from '../Func/mathFunc';
import { SM_DIV, SM_MULT } from '../Func/otherFunc';
import Reducer from '../Func/fractionReducer';
import Nav from '../Components/Nav';
import FractionExemple from '../Components/FractionExemple';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное значение операндов
const MAX_OPERAND = 10;

// Получение нового примера
function GetInitialState() {
  this.operator = getRandomInt(3, 4);
  this.intPart1 = getRandomNaturalInt(MAX_OPERAND);
  this.divident1 = getRandomNaturalInt(MAX_OPERAND);
  this.divider1 = getRandomNaturalInt(MAX_OPERAND);
  this.intPart2 = getRandomNaturalInt(MAX_OPERAND);
  this.divident2 = getRandomNaturalInt(MAX_OPERAND);
  this.divider2 = getRandomNaturalInt(MAX_OPERAND);
  this.answer = getAnswerFraction(
    { intPart: this.intPart1, divident: this.divident1, divider: this.divider1 },
    { intPart: this.intPart2, divident: this.divident2, divider: this.divider2 },
    this.operator,
  );
  this.userAnswer = { intPart: null, divident: null, divider: null };
}

const reducer = Reducer(GetInitialState);

const FractionMultiply = ({ initialState }) => {
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
      <Nav title={`Обыкновенные дроби(${SM_MULT},${SM_DIV})`} />
      <FractionExemple
        operator={state.operator}
        op1={{ intPart: state.intPart1, divident: state.divident1, divider: state.divider1 }}
        op2={{ intPart: state.intPart2, divident: state.divident2, divider: state.divider2 }}
        userIntPart={state.userAnswer.intPart}
        userDivident={state.userAnswer.divident}
        userDivider={state.userAnswer.divider}
        dispatch={dispatch}
      />
      <Statistic />
      <History />
    </Container>
  );
};

FractionMultiply.propTypes = {
  initialState: PropTypes.shape({
    intPart1: PropTypes.number,
    divident1: PropTypes.number,
    divider1: PropTypes.number,
    intPart2: PropTypes.number,
    divident2: PropTypes.number,
    divider2: PropTypes.number,
    answer: PropTypes.objectOf(PropTypes.number),
    userAnswer: PropTypes.objectOf(PropTypes.number),
  }),
};

FractionMultiply.defaultProps = {
  initialState: {
    intPart1: 1,
    divident1: 1,
    divider1: 1,
    intPart2: 1,
    divident2: 1,
    divider2: 1,
    answer: null,
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

export default FractionMultiply;
