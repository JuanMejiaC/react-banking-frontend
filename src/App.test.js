import React from 'react';
// import { render, screen } from '@testing-library/react';
import {render, fireEvent, wait, getByDisplayValue, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import * as ReactDOM from 'react-dom'
import App from './App';

test('renders learn react link', () => {
  const {getByText} = render(<App />);
  const linkElement = getByText(/welcome to the bank/i);
  expect(linkElement).toBeInTheDocument();
});

//userEvent expresses intent better
test('go to create account', () => {
  const {getByText} = render(<App/>);
  
  const button = getByText("New");

  userEvent.click(button);
});
