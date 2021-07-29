import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import SortList from './sort-list';
import {SortType} from '../../const';

describe('Component: SortList', () => {

  it('should render correctly', () => {
    const mockStore = configureStore();
    const history = createMemoryHistory();
    const store = mockStore({
      OFFERS: {
        sortType: SortType.DEFAULT,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <SortList />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Sort by')).toBeInTheDocument();
    expect(screen.getByText('Price: low to high')).toBeInTheDocument();
  });
});
