import React from 'react';
// import { render, screen } from '@testing-library/react';
import {render, fireEvent, wait, getByDisplayValue, screen} from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import * as ReactDOM from 'react-dom'
import App from './App';
import CreateAccount from './createaccount';
import { UserContext, Card } from './context';

test('creating new user', () => {
  render(<CreateAccount/>);
  const name = screen.getByText("Create Account");
  expect(name).toBeInTheDocument();
  userEvent.click(name);
});

test('create a New Account', () => {
  render(<App/>);
  render(<CreateAccount/>);
  const name1 = screen.getByPlaceholderText("Enter name");
  fireEvent.change(name1, {target:{value:"Neil Young"}})
  const email = screen.getByPlaceholderText("Enter email");
  fireEvent.change(email, {target:{value:"NeilYoung@mit.org"}});
  const pass = screen.getByPlaceholderText("Enter password");
  fireEvent.change(pass, {target:{value:"jdfajsdoif"}});
  expect(name1.value).toBe("Neil Young");
  expect(email.value).toBe("NeilYoung@mit.org");
  expect(pass.value).toBe("jdfajsdoif");
  // userEvent.click(name);
});