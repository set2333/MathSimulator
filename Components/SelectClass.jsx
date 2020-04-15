// Компонент выбора класса для фильтрации тренажеров
import React from 'react';
import PropTypes from 'prop-types';
import { Select, MenuItem, Grid } from '@material-ui/core';

const classesNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];

const SelectClass = React.memo(({ numberClass, changeClass }) => (
  <Grid align="center">
    <Select value={numberClass} onChange={({ target: { value } }) => changeClass(value)}>
      <MenuItem value={0}>Все классы</MenuItem>
      {classesNumbers.map((cl) => (
        <MenuItem key={cl} value={cl}>{`${cl} класс`}</MenuItem>
      ))}
    </Select>
  </Grid>
));

SelectClass.propTypes = {
  numberClass: PropTypes.number,
  changeClass: PropTypes.func,
};

SelectClass.defaultProps = {
  numberClass: 0,
  changeClass: () => {},
};

export default SelectClass;
