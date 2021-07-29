import React from 'react';
import {render} from '@testing-library/react';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import Map from './map';
import {Cities} from '../../const';

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

let store = null;

describe('Component: Map', () => {
  beforeAll(() => {
    const mockStore = configureStore({});
    store = mockStore({
      DATA: {offers, isDataLoaded: true},
      OFFERS: {city: Cities.AMSTERDAM.name, activeOfferId: offers[0].id},
    });
  });

  it('should render correctly', () => {
    const {container} = render(
      <Provider store={store}>
        <Map offers={offers} city={Cities.AMSTERDAM} activeOfferId={offers[0].id } />
      </Provider>,
    );

    expect(container.querySelector('.leaflet-container')).toBeInTheDocument();
  });
});
