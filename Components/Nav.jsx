// Навигационное меню.
import { useState } from 'react';
import PropTypes from 'prop-types';
import {
  AppBar,
  Toolbar,
  IconButton,
  Button,
  Typography,
  Drawer,
  List,
  ListItem,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import pages from '../Func/pages';

const Nav = ({ title }) => {
  const [menuIsOpen, setMenuOpen] = useState(false);
  return (
    <>
      <AppBar position="sticky" style={{ flexGrow: 1, margin: 10, width: 'auto' }}>
        <Toolbar>
          <IconButton color="inherit">
            <MenuIcon onClick={() => setMenuOpen(true)} />
          </IconButton>
          <Typography variant="h6" align="center" style={{ color: 'white', flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit" href="/">
            На главную
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer ancor="Left" open={menuIsOpen} onClose={() => setMenuOpen(false)}>
        <List>
          {pages.map(({ titlePage, path, index }) => (
            <ListItem key={index}>
              <Button href={path}>{titlePage}</Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
};

Nav.propTypes = {
  title: PropTypes.string,
};

Nav.defaultProps = {
  title: '',
};

export default Nav;
