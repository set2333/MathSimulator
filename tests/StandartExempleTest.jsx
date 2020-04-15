import React from 'react';
import { render, unmountComponentAtNode } from 'react-dom';
import { act } from 'react-dom/test-utils';
import StandartExemple from '../Components/StandartExemple';

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

const StandartExempleTest = () => {
  let testState = {};
  const testDispatch = (obj) => {
    testState = { ...obj };
  };
  const testAnswer = null;
  // Проверим текст примера
  const testExample = '5 + 9 = ';
  act(() => {
    render(
      <StandartExemple example={testExample} userAnswer={testAnswer} dispatch={testDispatch} />,
      container,
    );
  });
  const title = document.querySelector('.MuiTypography-h5');
  expect(title.textContent).toBe(testExample);

  // проверим поле ввода
  const testInput = document.querySelector('.MuiOutlinedInput-input');
  act(() => {
    testInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: 'Enter' }));
  });
  expect(testState.type).toBe('ANSWER');
  // TODO: имитация onChange
  // act(() => {
  // testInput.dispatchEvent(new KeyboardEvent('keydown', { bubbles: true, key: '1' }));
  // testInput.dispatchEvent(new KeyboardEvent('keypress', { bubbles: true, key: '1' }));
  // testInput.dispatchEvent(new KeyboardEvent('keyup', { bubbles: true, key: '1' }));
  //   testInput.dispatchEvent(new InputEvent('insertText', { bubbles: true, text: '1' }));
  // });
  // expect(testState.type).toBe('SET_ANSWER');
  // expect(testState.value).toBe(1);
};

export default StandartExempleTest;
