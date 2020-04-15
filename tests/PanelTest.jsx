import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import Panel from '../Components/Panel';

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

const PanelTest = () => {
  let testObj = null;
  const testDispatch = (obj) => {
    testObj = { ...obj };
  };
  const testActionType = {
    setNumber: 'TYPE_SET_NUMBER',
    answer: 'TYPE_ANSWER',
    setAnswer: 'TYPE_SET_ANSWER',
  };
  // Проверим заголовое панели
  act(() => {
    render(<Panel dispatch={testDispatch} actionTypes={testActionType} />, container);
  });
  const panelTitle = document.querySelector('.MuiTypography-h5');
  expect(panelTitle.textContent).toBe('Панель управления');

  // Нажмем на кнопку "Ответ"
  const btnAnswer = document.querySelector('.MuiButton-containedPrimary');
  expect(btnAnswer.textContent).toBe('Ответ');
  act(() => {
    btnAnswer.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(testObj.type).toBe('TYPE_ANSWER');

  // Нажмем на кнопки с номерами
  const numberButtons = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  const buttons = document.querySelectorAll('.MuiButton-outlined');
  numberButtons.map((btnNum, index) => {
    act(() => {
      buttons[index].dispatchEvent(new MouseEvent('click', { bubbles: true }));
    });
    expect(testObj.type).toBe('TYPE_SET_NUMBER');
    expect(testObj.value).toBe(btnNum);
  });

  // Нажмем на кнопку "Сброс"
  const btnReset = document.querySelector('.MuiButton-contained');
  expect(btnReset.textContent).toBe('Сброс');
  act(() => {
    btnReset.dispatchEvent(new MouseEvent('click', { bubbles: true }));
  });
  expect(testObj.type).toBe('TYPE_SET_ANSWER');
  expect(testObj.value).toBe(0);
};

export default PanelTest;
