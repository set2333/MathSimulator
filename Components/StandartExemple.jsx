// Стандартный пример. Подходит для большинства примеров (сложение, вычитание, умножение и т.д.)

import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, TextField, Grid, NoSsr,
} from '@material-ui/core';

const StandartExemple = React.memo(({ example, userAnswer, dispatch }) => (
  <NoSsr>
    <Paper elevation={10} style={{ margin: 10 }}>
      <Grid container justify="center" alignItems="center">
        <Typography variant="h5" align="center">
          {example}
        </Typography>
        <TextField
          size="small"
          style={{ width: 60, margin: 10 }}
          variant="outlined"
          value={userAnswer === null ? '' : userAnswer.toString()}
          onChange={({ target: { value } }) => dispatch({ type: 'SET_ANSWER', value })}
          onKeyUp={({ key }) => {
            if (key === 'Enter') dispatch({ type: 'ANSWER' });
          }}
        />
      </Grid>
    </Paper>
  </NoSsr>
));

StandartExemple.propTypes = {
  example: PropTypes.string,
  userAnswer: PropTypes.number,
  dispatch: PropTypes.func,
};

StandartExemple.defaultProps = {
  example: '',
  userAnswer: null,
  dispatch: () => {},
};

export default StandartExemple;
