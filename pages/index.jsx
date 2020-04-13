// Главная страница.
import { Button, Container } from '@material-ui/core';
import pages from '../Func/pages';

const Home = () => (
  <Container maxWidth="lg">
    <h1>Добро пожаловать в математический тренажер!</h1>
    {pages.map(({ titlePage, path }) => (
      <Button href={path} variant="outlined" color="primary" style={{ margin: 10 }}>
        {titlePage}
      </Button>
    ))}
  </Container>
);

export default Home;
