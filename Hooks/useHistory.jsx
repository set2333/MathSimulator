import {
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  Typography,
  Paper,
  Grid,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
} from '@material-ui/core';
import { DoneOutline, CloseOutlined } from '@material-ui/icons';
import { useReducer } from 'react';

const initialState = {
  history: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_HISTORY':
      return { ...state, history: [...state.history, action.value] };
    case 'OPEN_CLOSE':
      return { ...state, expanded: !state.expanded };
    default:
      return { ...state };
  }
};

const useHistory = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const History = () => (
    <Paper elevation={10} style={{ margin: 10, padding: 10 }}>
      <ExpansionPanel expanded={state.expanded} onClick={() => dispatch({ type: 'OPEN_CLOSE' })}>
        <ExpansionPanelSummary>
          <Grid item md={12} align="center">
            <Typography variant="h5">История</Typography>
          </Grid>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Дата</TableCell>
                  <TableCell>Пример</TableCell>
                  <TableCell>Правильный ответ</TableCell>
                  <TableCell>Ваш ответ</TableCell>
                  <TableCell />
                </TableRow>
              </TableHead>
              <TableBody>
                {state.history.map((item, ind) => (
                  <TableRow key={ind}>
                    <TableCell>{item.date.toLocaleString()}</TableCell>
                    <TableCell>{item.example}</TableCell>
                    <TableCell>{item.answer}</TableCell>
                    <TableCell>{item.userAnswer}</TableCell>
                    <TableCell>
                      {item.answer === item.userAnswer ? (
                        <DoneOutline style={{ color: 'green' }} />
                      ) : (
                        <CloseOutlined style={{ color: 'red' }} />
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </Paper>
  );
  return [History, (value) => dispatch({ type: 'ADD_HISTORY', value })];
};

export default useHistory;
