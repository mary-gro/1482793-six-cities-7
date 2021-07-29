import React from 'react';
import {render} from '@testing-library/react';
import {Router} from 'react-router-dom';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import EmptyFavoritesList from './empty-favorites-list';

const mockStore = configureStore({});

describe('Component: EmptyFavoritesList', () => {
  it('should render correctly', () => {
    const history = createMemoryHistory();
    const {getByText} = render(
      <Provider store = {mockStore()}>
        <Router history = {history}>
          <EmptyFavoritesList />
        </Router>
      </Provider>,
    );

    expect(getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });
});
