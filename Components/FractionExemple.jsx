// Пример с обыкновенными дробями.

import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import {
  Paper,
  Typography,
  TextField,
  Grid,
  NoSsr,
  Button,
  Container,
  Divider,
} from '@material-ui/core';
import { getSymbolOperator } from '../Func/otherFunc';

// Стиль для кнопок
const buttonStyle = { margin: '10px 5px' };
// Стиль контейнеров
const containerStyle = { paddingLeft: 0, paddingRight: 0 };
// Стиль гридов для текста с дробями
const gridStyle = { paddingLeft: 5, paddingRight: 5 };

const FractioExemple = React.memo(
  ({
    operator, op1, op2, userIntPart, userDivident, userDivider, dispatch,
  }) => {
    const refIntPart = useRef(null);
    const refDivident = useRef(null);
    const refDivider = useRef(null);
    const buttonAnswer = useRef(null);
    return (
      <NoSsr>
        <Paper elevation={10} style={{ margin: 10 }}>
          <Grid container justify="center" alignItems="center">
            <Grid container justify="center" alignItems="center" style={{ width: 'auto' }}>
              <Grid style={gridStyle}>
                <Typography variant="h5" align="center">
                  {op1.intPart}
                </Typography>
              </Grid>
              <Grid style={gridStyle}>
                <Container style={containerStyle}>
                  <Typography variant="h5" align="center">
                    {op1.divident}
                  </Typography>
                </Container>
                <Divider />
                <Container style={containerStyle}>
                  <Typography variant="h5" align="center">
                    {op1.divider}
                  </Typography>
                </Container>
              </Grid>
              <Grid style={gridStyle}>
                <Typography variant="h5" align="center">
                  {getSymbolOperator(operator)}
                </Typography>
              </Grid>
              <Grid style={gridStyle}>
                <Typography variant="h5" align="center">
                  {op2.intPart}
                </Typography>
              </Grid>
              <Grid style={gridStyle}>
                <Container style={containerStyle}>
                  <Typography variant="h5" align="center">
                    {op2.divident}
                  </Typography>
                </Container>
                <Divider />
                <Container style={containerStyle}>
                  <Typography variant="h5" align="center">
                    {op2.divider}
                  </Typography>
                </Container>
              </Grid>
              <Grid style={gridStyle}>
                <Typography variant="h5" align="center">
                  =
                </Typography>
              </Grid>
            </Grid>
            <Grid>
              <TextField
                inputRef={refIntPart}
                size="small"
                style={{ width: 60, margin: 10 }}
                variant="outlined"
                value={userIntPart === null ? '' : userIntPart.toString()}
                onChange={({ target: { value } }) => dispatch({ type: 'SET_INTPART', value })}
                onKeyDown={({ key }) => {
                  if (key === 'Enter') refDivident.current.focus();
                }}
              />
            </Grid>
            <Grid>
              <Container style={containerStyle}>
                <TextField
                  inputRef={refDivident}
                  size="small"
                  style={{ width: 60, margin: 10 }}
                  variant="outlined"
                  value={userDivident === null ? '' : userDivident.toString()}
                  onChange={({ target: { value } }) => dispatch({ type: 'SET_DIVIDENT', value })}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') refDivider.current.focus();
                  }}
                />
              </Container>
              <Divider />
              <Container style={containerStyle}>
                <TextField
                  inputRef={refDivider}
                  size="small"
                  style={{ width: 60, margin: 10 }}
                  variant="outlined"
                  value={userDivider === null ? '' : userDivider.toString()}
                  onChange={({ target: { value } }) => dispatch({ type: 'SET_DIVIDER', value })}
                  onKeyDown={({ key }) => {
                    if (key === 'Enter') buttonAnswer.current.focus();
                  }}
                />
              </Container>
            </Grid>
            <Grid>
              <Button
                ref={buttonAnswer}
                variant="contained"
                color="primary"
                onClick={() => {
                  refIntPart.current.focus();
                  dispatch({ type: 'ANSWER' });
                }}
                style={buttonStyle}
              >
                Ответ
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </NoSsr>
    );
  },
);

FractioExemple.propTypes = {
  operator: PropTypes.number,
  op1: PropTypes.objectOf(PropTypes.number),
  op2: PropTypes.objectOf(PropTypes.number),
  userIntPart: PropTypes.number,
  userDivident: PropTypes.number,
  userDivider: PropTypes.number,
  dispatch: PropTypes.func,
};

FractioExemple.defaultProps = {
  operator: 1,
  op1: {},
  op2: {},
  userIntPart: null,
  userDivident: null,
  userDivider: null,
  dispatch: () => {},
};

export default FractioExemple;
