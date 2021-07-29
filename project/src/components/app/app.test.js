import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router} from 'react-router-dom';
import {createMemoryHistory} from 'history';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';
import {AuthorizationStatus, AppRoute, SortType, Cities} from '../../const';
import App from './app';
import thunk from 'redux-thunk';
import {createAPI} from '../../services/api';


let history = null;
let store = null;
let fakeApp = null;
let api = null;

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

const comments = [
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

describe('Application Routing', () => {
  beforeAll(() => {
    history = createMemoryHistory();
    api = createAPI(() => {});
    const mockStore = configureStore([thunk.withExtraArgument(api)]);
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.NO_AUTH,
        userData: {},
      },
      DATA: {
        offers: offers,
        offer: offer,
        reviews: comments,
        nearbyOffers: offers,
        favorites: offers,
        isDataLoaded: true,
        isOfferDataLoaded: true,
      },
      OFFERS: {
        city: Cities.AMSTERDAM.name,
        sortType: SortType.DEFAULT,
        activeOfferId: null,
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );
  });

  it('should render MainScreen when navigate to /', () => {
    history.push(AppRoute.MAIN);
    render(fakeApp);

    expect(screen.getByText(/Cities/i)).toBeInTheDocument();
    expect(screen.getByText(/places to stay/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign in/i)).toBeInTheDocument();
  });

  it('should render LoginScreen when navigate to /login', () => {
    history.push(AppRoute.LOGIN);
    render(fakeApp);

    expect(screen.getByRole('button')).toBeInTheDocument();
    expect(screen.getByRole('button')).toHaveTextContent(/Sign in/i);
    expect(screen.getByLabelText(/E-mail/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Password/i)).toBeInTheDocument();
  });

  it('should render RoomScreen when navigate to /offer/:id', () => {
    const fakeId = 1;

    history.push(`${AppRoute.ROOM}/${fakeId}`);
    render(fakeApp);

    expect(screen.getByText(/Amsterdam/i)).toBeInTheDocument();
    expect(screen.getByText(/Small room in modern apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/Robert/i)).toBeInTheDocument();
    expect(screen.getByText(/Small room in new modern apartment in the center of Amsterdam./i)).toBeInTheDocument();
    expect(screen.getByText(/Reviews/i)).toBeInTheDocument();
    expect(screen.getByText(/Good location, friendly owners, quiet place./i)).toBeInTheDocument();
    expect(screen.getByText(/Not very clean, loud street, small bathroom./i)).toBeInTheDocument();
    expect(screen.getByText(/Beautiful & luxurious studio at great location/i)).toBeInTheDocument();
  });

  it('should render FavoritesScreen when navigate to /favorites', () => {
    history = createMemoryHistory();
    const mockStore = configureStore([thunk.withExtraArgument(api)]);
    store = mockStore({
      USER: {
        authorizationStatus: AuthorizationStatus.AUTH,
        userData: {
          name: 'Test',
          email: 'test@mail.com',
          avatar: 'img.png',
          isPro: false,
          id: 1,
        },
      },
      DATA: {
        favorites: offers,
        isDataLoaded: true,
      },
      OFFERS: {
        city: Cities.AMSTERDAM.name,
        sortType: SortType.POPULAR,
        activeOfferId: null,
      },
    });

    fakeApp = (
      <Provider store={store}>
        <Router history={history}>
          <App />
        </Router>
      </Provider>
    );

    history.push(AppRoute.FAVORITES);
    render(fakeApp);

    expect(screen.getByText(/Saved listing/i)).toBeInTheDocument();
    expect(screen.getByText(/Beautiful & luxurious studio at great location/i)).toBeInTheDocument();
    expect(screen.getByText(/Room in modern apartment/i)).toBeInTheDocument();
    expect(screen.getByText(/test@mail.com/i)).toBeInTheDocument();
    expect(screen.getByText(/Sign out/i)).toBeInTheDocument();
  });

  it('should render NotFoundScreen when user navigate to non-existing route', () => {
    history.push(AppRoute.NOT_FOUND);
    render(fakeApp);

    expect(screen.getByText('404. Page not found')).toBeInTheDocument();
  });
});
