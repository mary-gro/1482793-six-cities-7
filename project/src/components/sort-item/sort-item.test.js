import React from 'react';
import { Router } from 'react-router-dom';
import {render, screen} from '@testing-library/react';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import userEvent from '@testing-library/user-event';
import {SortType} from '../../const';
import SortItem from './sort-item';

describe('Component: SortItem', () => {

  it('should render correctly', () => {
    const mockStore = configureStore({});
    const store = mockStore({
      OFFERS: {
        sortType: SortType.DEFAULT,
      },
    });

    const {getByText} = render(
      <Provider store={store}>
        <SortItem type={'DEFAULT'} onClick={() => {}} isActive/>
      </Provider>,
    );

    expect(getByText(/Popular/i)).toBeInTheDocument();
  });

  it('should call handleClick when click', () => {
    const history = createMemoryHistory();
    const onClick = jest.fn();
    render(
      <Router history={history}>
        <SortItem
          type={'DEFAULT'}
          isActive
          onClick={onClick}
        />
      </Router>,
    );

    userEvent.click(screen.getByRole('listitem'));
    expect(onClick).toBeCalled();
  });
});
