import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {AuthorizationStatus} from '../../const';
import FavoritesScreen from './favorites-screen';

let store = null;
let history = null;
let mockStore = null;

describe('Component: FavoritesScreen', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    mockStore = configureStore([thunk.withExtraArgument(createAPI(() => {}))]);
  });

  it('should render correctly with no favorites', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: {},
      },
      DATA: {
        favorites: [],
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('Nothing yet saved.')).toBeInTheDocument();
    expect(screen.getByText('Save properties to narrow down search or plan your future trips.')).toBeInTheDocument();
  });

  it('should render correctly if saved favourite offer', () => {
    const mockFavoritesOffers = [
      {
        bedrooms: 3,
        city: {
          location: {
            latitude: 52.38333,
            longitude: 4.9,
            zoom: 12,
          },
          name: 'Amsterdam',
        },
        description: 'A quiet cozy and picturesque that hides behind a a river by the unique lightness of Amsterdam.',
        goods: ['Heating', 'Kitchen', 'Cable TV', 'Washing machine', 'Coffee machine', 'Dishwasher'],
        host: {
          avatarUrl: 'img/avatar-angelina.jpg',
          id: 1,
          isPro: true,
          name: 'Angelina',
        },
        id: 0,
        images: ['img/apartment-01.jpg', 'img/apartment-03.jpg', 'img/apartment-02.jpg'],
        isFavorite: true,
        isPremium: false,
        location: {
          latitude: 52.3909553943508,
          longitude: 4.85309666406198,
          zoom: 8,
        },
        maxAdults: 4,
        previewImage: 'img/apartment-01.jpg',
        price: 120,
        rating: 4.8,
        title: 'Beautiful & luxurious studio at great location',
        type: 'apartment',
      },
      {
        bedrooms: 1,
        city: {
          location: {
            latitude: 52.38333,
            longitude: 4.9,
            zoom: 12,
          },
          name: 'Paris',
        },
        description: 'Room in new modern apartment in the center of Paris.',
        goods: ['Heating', 'Kitchen', 'Coffee machine', 'Dishwasher'],
        host: {
          avatarUrl: 'img/avatar-max.jpg',
          id: 2,
          isPro: false,
          name: 'Max',
        },
        id: 1,
        images: ['img/room.jpg'],
        isFavorite: true,
        isPremium: false,
        location: {
          latitude: 52.369553943508,
          longitude: 4.85309666406198,
          zoom: 8,
        },
        maxAdults: 2,
        previewImage: 'img/room.jpg',
        price: 50,
        rating: 4.5,
        title: 'Room in modern apartment',
        type: 'room',
      },
    ];

    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {},
      },
      DATA: {
        favorites: mockFavoritesOffers,
      },
    });

    render(
      <Provider store={store}>
        <Router history={history}>
          <FavoritesScreen
            favoritesOffers={mockFavoritesOffers}
          />
        </Router>
      </Provider>,
    );


    expect(screen.getByText('Saved listing')).toBeInTheDocument();
    expect(screen.getByText('Beautiful & luxurious studio at great location')).toBeInTheDocument();
    expect(screen.getByText('Room in modern apartment')).toBeInTheDocument();
  });
});
