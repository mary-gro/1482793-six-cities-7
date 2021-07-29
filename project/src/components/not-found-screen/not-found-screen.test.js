import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import {AuthorizationStatus} from '../../const';
import NotFoundScreen from './not-found-screen';

let store = null;
let history = null;

describe('Component: NotFoundScreen', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    const mockStore = configureStore({});
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {},
      },
    });
  });

  it('should render correctly', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <NotFoundScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
    expect(screen.getByText('Go back to homepage')).toBeInTheDocument();
  });
});
