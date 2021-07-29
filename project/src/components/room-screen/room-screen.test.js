import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router } from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';
import {AuthorizationStatus} from '../../const';
import RoomScreen from './room-screen';

const nearbyOffers = [
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
      name: 'Amsterdam',
    },
    description: 'Room in new modern apartment in the center of Amsterdam.',
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

const offer = {
  bedrooms: 1,
  city: {
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 12,
    },
    name: 'Amsterdam',
  },
  description: 'Small room in new modern apartment in the center of Amsterdam.',
  goods: ['Heating', 'Kitchen', 'Coffee machine', 'Dishwasher'],
  host: {
    avatarUrl: 'img/avatar-max.jpg',
    id: 2,
    isPro: false,
    name: 'Robert',
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
  title: 'Small room in modern apartment',
  type: 'room',
};

const reviews = [
  {
    comment:
      'Good location, friendly owners, quiet place.',
    date: '2020-04-04T14:14:56.569Z',
    id: 1,
    rating: 5,
    user: {
      avatarUrl: 'img/avatar-max.jpg',
      id: 1,
      isPro: true,
      name: 'Tom',
    },
  },
  {
    comment:
      'Not very clean, loud street, small bathroom.',
    date: '2021-02-02T12:12:56.569Z',
    id: 2,
    rating: 2,
    user: {
      avatarUrl: 'img/avatar-angelina.jpg',
      id: 2,
      isPro: false,
      name: 'Ann',
    },
  },
];

let mockStore = null;
let store = null;
let history = null;

describe('Component: RoomScreen', () => {
  beforeAll(() => {
    const api = createAPI(() => {});
    mockStore = configureStore([thunk.withExtraArgument(api)]);
    history = createMemoryHistory();
  });

  it('should render correctly when user is not authorized', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {},
      },
      DATA: {
        offer,
        reviews,
        nearbyOffers,
        isOfferDataLoaded: true,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <RoomScreen id={String(offer.id)} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Small room in new modern apartment in the center of Amsterdam./i)).toBeInTheDocument();
    expect(screen.getByText(/Beautiful & luxurious studio at great location/i)).toBeInTheDocument();
    expect(screen.getByText(/Robert/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.queryByText(/Your review/i)).not.toBeInTheDocument();
  });

  it('should render correctly when user is authorized', () => {
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: {},
      },
      DATA: {
        offer,
        reviews,
        nearbyOffers,
        isOfferDataLoaded: true,
      },
    });
    render(
      <Provider store={store}>
        <Router history={history}>
          <RoomScreen id={String(offer.id)} />
        </Router>
      </Provider>);

    expect(screen.getByText(/Small room in new modern apartment in the center of Amsterdam./i)).toBeInTheDocument();
    expect(screen.getByText(/Beautiful & luxurious studio at great location/i)).toBeInTheDocument();
    expect(screen.getByText(/Robert/i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Your review/i)).toBeInTheDocument();
    expect(screen.getByText(/Not very clean, loud street, small bathroom./i)).toBeInTheDocument();
  });
});
