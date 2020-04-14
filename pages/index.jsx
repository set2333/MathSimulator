// Главная страница.
import { Button, Container } from '@material-ui/core';
import Link from 'next/link';
import { pages } from '../Func/otherFunc';

const Home = () => (
  <Container maxWidth="lg">
    <h1>Добро пожаловать в математический тренажер!</h1>
    {pages.map(({ titlePage, path, index }) => (
      <Link key={index} href={path}>
        <Button variant="outlined" color="primary" style={{ margin: 10 }}>
          <a>{titlePage}</a>
        </Button>
      </Link>
    ))}
  </Container>
);

export default Home;
