// Навигационное меню.
import React, { useState } from 'react';
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
import Link from 'next/link';
import { pages } from '../Func/otherFunc';

const Nav = React.memo(({ title }) => {
  const [menuIsOpen, setMenuOpen] = useState(false);
  return (
    <>
      <AppBar position="sticky" style={{ flexGrow: 1, margin: 10, width: 'auto' }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setMenuOpen(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" align="center" style={{ color: 'white', flexGrow: 1 }}>
            {title}
          </Typography>
          <Button color="inherit">
            <Link href="/">
              <a>На главную</a>
            </Link>
          </Button>
        </Toolbar>
      </AppBar>
      <Drawer ancor="Left" open={menuIsOpen} onClose={() => setMenuOpen(false)}>
        <List>
          <Typography variant="h6" align="center">
            Тренажеры
          </Typography>
          {pages.map(({ titlePage, path, index }) => (
            <ListItem key={index}>
              <Button variant="contained" style={{ width: '100%' }}>
                <Link href={path}>
                  <a>{titlePage}</a>
                </Link>
              </Button>
            </ListItem>
          ))}
        </List>
      </Drawer>
    </>
  );
});

Nav.propTypes = {
  title: PropTypes.string,
};

Nav.defaultProps = {
  title: '',
};

export default Nav;
