import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import CitiesList from './cities-list';


let history = null;
let store = null;
const mockStore = configureStore({});

describe('Component: CitiesList', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly cities list', () => {
    store = mockStore({
      OFFERS: {
        city: 'Amsterdam',
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <CitiesList />
        </Router>
      </Provider>);

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText(/Paris/i)).toBeInTheDocument();
  });
});
