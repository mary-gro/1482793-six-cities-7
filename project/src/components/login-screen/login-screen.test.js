import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import userEvent from '@testing-library/user-event';
import LoginScreen from './login-screen';

let store = null;

describe('Component: LoginScreen', () => {
  beforeAll(() => {
    const mockStore = configureStore();
    store = mockStore({
      OFFERS: {city: 'Paris'},
      USER: {
        authorizationStatus: 'NO_AUTH',
        userData: {},
      },
    });
  });

  it('should render correctly', () => {
    const history = createMemoryHistory();
    history.push('/login');

    render(
      <Provider store={store}>
        <Router history={history}>
          <LoginScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByRole('button')).toBeInTheDocument();

    expect(screen.getByText('Paris')).toBeInTheDocument();

    expect(screen.getByLabelText('E-mail')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();

    userEvent.type(screen.getByTestId('email'), 'test@mail.ru');
    userEvent.type(screen.getByTestId('password'), '1111');

    expect(screen.getByDisplayValue('test@mail.ru')).toBeInTheDocument();
    expect(screen.getByDisplayValue('1111')).toBeInTheDocument();
  });
});
