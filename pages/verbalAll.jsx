// Тренажер устного счета. Примеры на сложение и вычитание чисел от 1 до 100, и умножение и деление
// чисел от 1 до 10. Все числа ценые и не отрицательные. В случае с вычитанием уменьшаемое всегда
// больше вычитаемого. т.е разность > 0. В случае с делением результат всегда целое число.

import { useReducer } from 'react';
import PropTypes from 'prop-types';
import {
  TextField, NoSsr, Container, Typography, Grid, Paper,
} from '@material-ui/core';
import { getRandomNaturalInt } from '../Func/mathFunc';
import { getNumberValue, SM_DIV, SM_MULT } from '../Func/otherFunc';
import Nav from '../Components/Nav';
import Panel from '../Components/Panel';
import useStatistic from '../Hooks/useStatistic';
import useHistory from '../Hooks/useHistory';

// Максимальное значение операндов
const MAX_OPERAND = 100;
const MAX_OPERAND_MULT = 10;

// Получение правильного ответа
const getAnswer = (op1, op2, operator) => {
  if (operator === 1) return op1 + op2;
  if (operator === 2) return op1 - op2;
  if (operator === 3) return op1 * op2;
  return op1 / op2;
};

// Возвращаем символ оператора в зависимости от его номера
const getSymbolOperator = (operator) => {
  switch (operator) {
    case 1:
      return '+';
    case 2:
      return '-';
    case 3:
      return SM_MULT;
    case 4:
      return SM_DIV;
    default:
      return '';
  }
};

// Получение нового примера
function GetInitialState() {
  this.operator = getRandomNaturalInt(4);
  this.op1 = getRandomNaturalInt(
    this.operator === 1 || this.operator === 2 ? MAX_OPERAND : MAX_OPERAND_MULT,
  );
  this.op2 = getRandomNaturalInt(
    this.operator === 1 || this.operator === 2 ? MAX_OPERAND : MAX_OPERAND_MULT,
  );
  if (this.operator === 2 && this.op1 < this.op2) [this.op1, this.op2] = [this.op2, this.op1];
  if (this.operator === 4) [this.op1, this.op2] = [this.op2 * this.op1, this.op1];
  this.answer = getAnswer(this.op1, this.op2, this.operator);
  this.userAnswer = null;
}

// Reducer. Содержит state = {
// operator(number) - вид операции ( 1 - сложение, 2 - вычитание, 3 -умножение, 4- деление)
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
      <Nav title={`Тренажер устного счета(+,-, ${SM_MULT}, ${SM_DIV})`} />
      <NoSsr>
        <Paper elevation={10} style={{ margin: 10 }}>
          <Grid container justify="center" alignItems="center">
            <Typography variant="h5" align="center">
              {`${state.op1} ${getSymbolOperator(state.operator)} ${state.op2} = `}
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
