import React from 'react';
import {render, screen} from '@testing-library/react';
import {Route, Router, Switch} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import Footer from './footer';

let history = null;

describe('Component: Footer', () => {

  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    const {getByRole} = render(
      <Router history={history}>
        <Footer />
      </Router>,
    );

    expect(getByRole('img')).toHaveAttribute('src', 'img/logo.svg');
    expect(getByRole('link')).toBeInTheDocument();
  });

  it('should redirect to main on click to link', () => {
    history.push('/fake');
    render(
      <Router history={history}>
        <Switch>
          <Route path="/" exact>
            <h1>This is main page</h1>
          </Route>
          <Route>
            <Footer />
          </Route>
        </Switch>
      </Router>);

    expect(screen.queryByText(/This is main page/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByRole('link'));
    expect(screen.queryByText(/This is main page/i)).toBeInTheDocument();
  });
});
