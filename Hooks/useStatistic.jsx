// Хук для отображения статистики. Показывает:
// 1) Показывает текущую оценку, и если оценка на 5, то сколько нужно правильных ответов до
// следующей оценки.
// 2) Общее количество ответов
// 3) Количество верных ответов
// 4) Количество не верных ответов
// Хук экспортирует компонент для отображения и функции с добавлением верного ответа и добавлением
// не верного ответа

import { useReducer, useCallback } from 'react';
import {
  Typography,
  Grid,
  Paper,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import { getRating, nextRating } from '../Func/otherFunc';

// Reducer. Содержит state = {
// allAnswer(number) - общее количество ответов
// trueAnswer(number) - количество верных ответов
// falseAnswer(number) - количество не верных ответов
// expanded(boolean) - состояние панели (открыта / закрыта)
// }
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TRUE_ANSWER':
      return { ...state, allAnswer: state.allAnswer + 1, trueAnswer: state.trueAnswer + 1 };
    case 'ADD_FALSE_ANSWER':
      return { ...state, allAnswer: state.allAnswer + 1, falseAnswer: state.falseAnswer + 1 };
    case 'OPEN_CLOSE':
      return { ...state, expanded: !state.expanded };
    default:
      return { ...state };
  }
};

const useStatistic = () => {
  const [state, dispatch] = useReducer(reducer, {
    allAnswer: 0,
    trueAnswer: 0,
    falseAnswer: 0,
    expanded: false,
  });
  const Statistic = () => (
    <Paper elevation={10} style={{ margin: 10, padding: 10 }}>
      <ExpansionPanel expanded={state.expanded} onClick={() => dispatch({ type: 'OPEN_CLOSE' })}>
        <ExpansionPanelSummary>
          <Grid item md={12} align="center">
            <Typography variant="h5">
              {`Оценка: ${getRating(state.allAnswer, state.trueAnswer)} ${nextRating(
                state.allAnswer,
                state.trueAnswer,
              )}`}
            </Typography>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <Grid item md={4} align="center">
            <Typography>{`Всего ответов: ${state.allAnswer}`}</Typography>
          </Grid>
          <Grid item md={4} align="center">
            <Typography>{`Верно: ${state.trueAnswer}`}</Typography>
          </Grid>
          <Grid item md={4} align="center">
            <Typography>{`Не верно: ${state.falseAnswer}`}</Typography>
          </Grid>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
  return [
    Statistic,
    () => {
      dispatch({ type: 'ADD_TRUE_ANSWER' });
    },
    () => {
      dispatch({ type: 'ADD_FALSE_ANSWER' });
    },
  ];
};

export default useStatistic;
