import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {createMemoryHistory} from 'history';
import MainScreen from './main-screen';
import {SortType, Cities} from '../../const';

jest.mock('../header/header', () => ({
  __esModule: true,
  default() {
    return <div>This is mock Header</div>;
  },
}));

jest.mock('../cities-list/cities-list', () => ({
  __esModule: true,
  default() {
    return <div>This is mock CitiesList</div>;
  },
}));

jest.mock('../offers-list/offers-list', () => ({
  __esModule: true,
  default() {
    return <div>This is mock OffersList</div>;
  },
}));

jest.mock('../sort-list/sort-list', () => ({
  __esModule: true,
  default() {
    return <div>This is mock SortList</div>;
  },
}));

jest.mock('../map/map', () => ({
  __esModule: true,
  default() {
    return <div>This is mock Map</div>;
  },
}));

jest.mock('../empty-offers-list/empty-offers-list', () => ({
  __esModule: true,
  default() {
    return <div>This is mock EmptyOffersList</div>;
  },
}));

const history = createMemoryHistory();
const mockStore = configureStore();

const offers = [
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

describe('Component: MainScreen', () => {
  it('should render correctly', () => {
    const storeData = {
      DATA: {
        offers: offers,
        isDataLoaded: true,
      },
      OFFERS: {
        city: Cities.AMSTERDAM.name,
        sortType: SortType.DEFAULT,
        activeOffer: offers[0].id,
      },
    };

    render(
      <Provider store={mockStore(storeData)}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is mock Header')).toBeInTheDocument();
    expect(screen.getByText('This is mock CitiesList')).toBeInTheDocument();
    expect(screen.getByText('This is mock SortList')).toBeInTheDocument();
    expect(screen.getByText('This is mock OffersList')).toBeInTheDocument();
    expect(screen.getByText('This is mock Map')).toBeInTheDocument();
  });

  it('should render correctly without offers', () => {
    const storeData = {
      DATA: {
        offers: [],
        isDataLoaded: true,
      },
      OFFERS: {
        city: Cities.PARIS.name,
        sortType: SortType.DEFAULT,
        activeOffer: null,
      },
    };

    render(
      <Provider store={mockStore(storeData)}>
        <Router history={history}>
          <MainScreen />
        </Router>
      </Provider>,
    );

    expect(screen.getByText('This is mock Header')).toBeInTheDocument();
    expect(screen.getByText('This is mock CitiesList')).toBeInTheDocument();
    expect(screen.getByText('This is mock EmptyOffersList')).toBeInTheDocument();
  });
});
