import React from 'react';
import { render, screen } from '@testing-library/react';
import { Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import ReviewForm from './review-form';

let history = null;
let store = null;
const mockStore = configureStore({});

describe('Component: ReviewForm', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });

  it('should render correctly', () => {
    store = mockStore({});
    render(
      <Provider store={store}>
        <Router history={history}>
          <ReviewForm id={0} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toBeDisabled();
    expect(screen.getByText(/To submit review please make sure to set/i)).toBeInTheDocument();
    expect(screen.getAllByRole('radio')).toHaveLength(5);
  });
});
