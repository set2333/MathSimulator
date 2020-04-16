import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Nav from '../Components/Nav';
import { pages } from '../Func/otherFunc';

let container = null;

beforeEach(() => {
  container = document.createElement('div');
  document.body.appendChild(container);
});

afterEach(() => {
  unmountComponentAtNode(container);
  container.remove();
  container = null;
});

const NavTest = () => {
  // Проверка заголовка меню
  act(() => {
    render(<Nav title="Test title" />, container);
  });
  const h1 = document.getElementsByTagName('h6')[0];
  expect(h1.textContent).toBe('Test title');

  // Проверка кнопки "На главную"
  const mainButton = document.querySelector('.MuiButton-root');
  expect(mainButton.textContent).toBe('На главную');
  expect(mainButton.innerHTML).toBe(
    '<span class="MuiButton-label"><a style="color: white;" href="/">На главную</a></span><span class="MuiTouchRipple-root"></span>',
  );

  // Проверка состава бокового меню
  const menuButton = document.querySelector('.MuiIconButton-root');
  act(() => {
    menuButton.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  const menuTitle = document.querySelector('ul h6');
  expect(menuTitle.textContent).toBe('Тренажеры');
  const menu = document.getElementsByTagName('li');
  let index = 0;
  for (const li of menu) {
    expect(li.textContent).toBe(pages[index].titlePage);
    index += 1;
  }
};

export default NavTest;
