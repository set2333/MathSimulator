// Пример для сравнения двух чисел

import React from 'react';
import PropTypes from 'prop-types';
import {
  Paper, Typography, Select, Grid, NoSsr, MenuItem, Button,
} from '@material-ui/core';

// Стиль гридов для текста с дробями
const gridStyle = { paddingLeft: 5, paddingRight: 5 };

const CompareExemple = React.memo(({
  op1, op2, userAnswer, dispatch,
}) => (
  <NoSsr>
    <Paper elevation={10} style={{ margin: 10 }}>
      <Grid container justify="center" alignItems="center">
        <Grid style={gridStyle}>
          <Typography variant="h5" align="center">
            {op1}
          </Typography>
        </Grid>
        <Grid style={gridStyle}>
          <Select
            value={userAnswer}
            onChange={({ target: { value } }) => dispatch({ type: 'SET_ANSWER', value })}
            style={{ paddingLeft: 10, paddingRight: 10 }}
          >
            <MenuItem value={-1}>{'<'}</MenuItem>
            <MenuItem value={0}>=</MenuItem>
            <MenuItem value={1}>{'>'}</MenuItem>
          </Select>
        </Grid>
        <Grid style={gridStyle}>
          <Typography variant="h5" align="center">
            {op2}
          </Typography>
        </Grid>
        <Grid style={gridStyle}>
          <Button variant="contained" color="primary" onClick={() => dispatch({ type: 'ANSWER' })}>
            Ответ
          </Button>
        </Grid>
      </Grid>
    </Paper>
  </NoSsr>
));

CompareExemple.propTypes = {
  op1: PropTypes.number,
  op2: PropTypes.number,
  userAnswer: PropTypes.number,
  dispatch: PropTypes.func,
};

CompareExemple.defaultProps = {
  op1: '',
  op2: '',
  userAnswer: null,
  dispatch: () => {},
};

export default CompareExemple;
