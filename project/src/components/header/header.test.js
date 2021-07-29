import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import * as Redux from 'react-redux';
import {AppRoute, AuthorizationStatus} from '../../const';
import Header from './header';

let history = null;
let store = null;
let fakeApp = null;

const storeData = {
  USER: {
    authorizationStatus: AuthorizationStatus.AUTH,
    userData: {
      id: 1,
      email:'test@mail.ru',
      name:'Robert',
      avatarUrl:'img.jpg',
      isPro: false,
      token: '',
    },
  },
};

describe('Component: Header', () => {

  beforeAll(() => {
    history = createMemoryHistory();

    const mockStore = configureStore({});
    store = mockStore(storeData);
  });

  it('should render correctly', () => {
    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>
    );
    render(fakeApp);

    expect(screen.getByRole('img')).toHaveAttribute('src', 'img/logo.svg');
    expect(screen.getByText('Sign out')).toBeInTheDocument();
  });

  it('should redirect to main when user clicks to logo link', () => {
    history.push('/fake');
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path="/" exact>
              <h1>This is main page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByTestId('header'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });

  it('should redirect to favorites when authorized user clicks to mail link', () => {
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.FAVORITES} exact>
              <h1>This is favorites page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );
    userEvent.click(screen.getByTestId('favorites'));
    expect(screen.queryByText(/This is favorites page/i)).toBeInTheDocument();
  });

  it('should redirect to login when non-authorized user clicks to sign in link', () => {
    storeData.USER.authorizationStatus = AuthorizationStatus.NO_AUTH;
    render(
      <Provider store={store}>
        <Router history={history}>
          <Switch>
            <Route path={AppRoute.SIGN_IN} exact>
              <h1>This is login page</h1>
            </Route>
            <Route>
              <Header />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is login page/i)).toBeInTheDocument();
  });

  it('should redirect to main when authorized user clicks to sign out link', () => {
    storeData.USER.authorizationStatus = AuthorizationStatus.AUTH;
    const dispatch = jest.fn();
    const useDispatch = jest.spyOn(Redux, 'useDispatch');
    useDispatch.mockReturnValue(dispatch);
    render(
      <Provider store={store}>
        <Router history={history}>
          <Header />
        </Router>
      </Provider>,
    );
    expect(screen.getByText('Sign out')).toBeInTheDocument();
    userEvent.click(screen.getByTestId('logout'));
    expect(dispatch).toBeCalled();
  });
});
