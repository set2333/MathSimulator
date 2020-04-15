// Главная страница.
import React, { useState } from 'react';
import {
  Button, Container, Paper, Grid, Typography,
} from '@material-ui/core';
import Link from 'next/link';
import { pages } from '../Func/otherFunc';
import SelectClass from '../Components/SelectClass';

const Home = () => {
  const [numberClass, setNumbeClass] = useState(0);
  return (
    <Container maxWidth="md">
      <Paper elevation={10} style={{ margin: 10 }}>
        <Grid container justify="center" alignItems="center">
          <Grid md={12} item align="center">
            <Typography variant="h5">Добро пожаловать в математический тренажер!</Typography>
            <Typography>
              Здесь Вы можете попрактиковаться в решении математических примеров. Для удобства
              примеры можно отфильтровать по классу.
            </Typography>
          </Grid>
          <SelectClass numberClass={numberClass} changeClass={(value) => setNumbeClass(value)} />
          <Grid item md={12}>
            {pages.map(({
              titlePage, path, index, classes,
            }) => {
              if (classes.indexOf(numberClass) !== -1) {
                return (
                  <Link key={index} href={path}>
                    <Button variant="outlined" color="primary" style={{ margin: 10 }}>
                      <a>{titlePage}</a>
                    </Button>
                  </Link>
                );
              }
              return null;
            })}
          </Grid>
        </Grid>
      </Paper>
    </Container>
  );
};

export default Home;
