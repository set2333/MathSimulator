// Панель управления. Содержит кнопки ввода цифр, кнопку отправки ответа и кнопку сброса которая
// очищает поле ввода.
import React from 'react';
import {
  NoSsr,
  Button,
  Grid,
  Paper,
  Typography,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from '@material-ui/core';
import PropTypes from 'prop-types';

// Стиль для кнопок
const buttonStyle = { margin: '10px 5px' };

const Panel = React.memo(
  ({ dispatch, actionTypes }) => {
    const numberClick = (number) => {
      dispatch({ type: actionTypes.setNumber, value: number });
    };
    return (
      <NoSsr>
        <Paper elevation={10} style={{ margin: 10, padding: 10 }}>
          <ExpansionPanel>
            <ExpansionPanelSummary>
              <Grid item md={12} align="center">
                <Typography variant="h5">Панель управления</Typography>
              </Grid>
            </ExpansionPanelSummary>
            <ExpansionPanelDetails>
              <Grid item md={12} align="center">
                <Paper elevation={10} style={{ margin: 10, padding: 10 }}>
                  <Grid container justify="center" alignItems="center">
                    <Button variant="outlined" onClick={() => numberClick(7)} style={buttonStyle}>
                      7
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(8)} style={buttonStyle}>
                      8
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(9)} style={buttonStyle}>
                      9
                    </Button>
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    <Button variant="outlined" onClick={() => numberClick(4)} style={buttonStyle}>
                      4
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(5)} style={buttonStyle}>
                      5
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(6)} style={buttonStyle}>
                      6
                    </Button>
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    <Button variant="outlined" onClick={() => numberClick(1)} style={buttonStyle}>
                      1
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(2)} style={buttonStyle}>
                      2
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(3)} style={buttonStyle}>
                      3
                    </Button>
                  </Grid>
                  <Grid container justify="center" alignItems="center">
                    <Button
                      variant="contained"
                      onClick={() => dispatch({ type: actionTypes.setAnswer, value: 0 })}
                      style={buttonStyle}
                    >
                      Сброс
                    </Button>
                    <Button variant="outlined" onClick={() => numberClick(0)} style={buttonStyle}>
                      0
                    </Button>
                    <Button
                      variant="contained"
                      color="primary"
                      onClick={() => dispatch({ type: actionTypes.answer })}
                      style={buttonStyle}
                    >
                      Ответ
                    </Button>
                  </Grid>
                </Paper>
              </Grid>
            </ExpansionPanelDetails>
          </ExpansionPanel>
        </Paper>
      </NoSsr>
    );
  },
  () => true,
);

Panel.propTypes = {
  dispatch: PropTypes.func,
  actionTypes: PropTypes.objectOf(PropTypes.string),
};

Panel.defaultProps = {
  dispatch: () => {},
  actionTypes: {},
};

export default Panel;
