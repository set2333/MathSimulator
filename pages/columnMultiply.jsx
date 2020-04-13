// Тренажер устного счета. Примеры на умножение  и деление чисел от 10 до 100. Все числа ценые и не
// отрицательные. В случае с делением результат всегда целое число.

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, NoSsr, Container, Typography, Grid, Paper,
} from '@material-ui/core';
import { getRandomInt, getRandomNaturalInt } from '../Func/mathFunc';
import { getNumberValue, SM_DIV, SM_MULT } from '../Func/otherFunc';
import Nav from '../Components/Nav';
import Panel from '../Components/Panel';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное и минимальное значение операндов
const MIN_OPERAND = 10;
const MAX_OPERAND = 100;

// Получение правильного ответа
const getAnswer = (op1, op2, operator) => {
  if (operator === 1) return op1 * op2;
  return op1 / op2;
};

// Получение нового примера
function GetInitialState() {
  this.operator = getRandomNaturalInt(2);
  this.op1 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  this.op2 = getRandomInt(MIN_OPERAND, MAX_OPERAND);
  if (this.operator === 2) [this.op1, this.op2] = [this.op2 * this.op1, this.op1];
  this.answer = getAnswer(this.op1, this.op2, this.operator);
  this.userAnswer = null;
}

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
const reducer = (reducerState, action) => {
  switch (action.type) {
    case 'ANSWER': {
      reducerState.addHistory({
        date: new Date(),
        example: `${reducerState.op1} ${reducerState.operator === 1 ? SM_MULT : SM_DIV} ${
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
      <Nav title={`Тренажер счета столбиком(${SM_MULT},${SM_DIV})`} />
      <NoSsr>
        <Paper elevation={10} style={{ margin: 10 }}>
          <Grid container justify="center" alignItems="center">
            <Typography variant="h5" align="center">
              {`${state.op1} ${state.operator === 1 ? SM_MULT : SM_DIV} ${state.op2} = `}
            </Typography>
            <TextField
              size="small"
              style={{ width: 60, margin: 10 }}
              variant="outlined"
              value={state.userAnswer === null ? '' : state.userAnswer.toString()}
              onChange={({ target: { value } }) => dispatch({ type: 'SET_ANSWER', value })}
              onKeyUp={({ key }) => {
                if (key === 'Enter') dispatch({ type: 'ANSWER' });
              }}
            />
          </Grid>
        </Paper>
      </NoSsr>
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
