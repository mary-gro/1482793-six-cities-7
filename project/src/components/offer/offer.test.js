import React from 'react';
import {render, screen} from '@testing-library/react';
import {Router, Switch, Route} from 'react-router-dom';
import userEvent from '@testing-library/user-event';
import configureStore from 'redux-mock-store';
import {Provider} from 'react-redux';
import {createMemoryHistory} from 'history';
import Offer from './offer';
import {AppRoute, OffersType} from '../../const';

const offer = {
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
  price: 1201,
  rating: 4.8,
  title: 'Beautiful & luxurious studio at great location',
  type: 'apartment',
};

const mockStore = configureStore({});
let history = null;
const offersType = OffersType.MAIN;
const onOfferHover = jest.fn();

describe('Component: Offer', () => {
  beforeAll(() => {
    history = createMemoryHistory();
  });
  it('should render correctly', () => {
    const {getByText}=render(
      <Provider store={mockStore()}>
        <Router history={history}>
          <Offer offer={offer} offersType={offersType} onOfferHover={onOfferHover} />
        </Router>
      </Provider>,
    );

    expect(getByText(/Beautiful & luxurious studio at great location/i)).toBeInTheDocument();
    expect(getByText(/apartment/i)).toBeInTheDocument();
  });

  it('should redirect to room screen when user clicks to image', () => {
    history.push('/fake');
    render(
      <Provider store = {mockStore()}>
        <Router history={history}>
          <Switch>
            <Route path = {`${AppRoute.ROOM}/${offer.id}`} exact>
              <h1>This is room screen</h1>
            </Route>
            <Route>
              <Offer offer={offer} offersType={offersType} onOfferHover={onOfferHover} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is room screen/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByAltText('Place'));
    expect(screen.queryByText(/This is room screen/i)).toBeInTheDocument();
  });

  it('should redirect to room screen when user clicks to title', () => {
    history.push('/fake');
    render(
      <Provider store = {mockStore()}>
        <Router history={history}>
          <Switch>
            <Route path = {`${AppRoute.ROOM}/${offer.id}`} exact>
              <h1>This is room screene</h1>
            </Route>
            <Route>
              <Offer offer={offer} offersType={offersType} onOfferHover={onOfferHover} />
            </Route>
          </Switch>
        </Router>
      </Provider>,
    );

    expect(screen.queryByText(/This is room screen/i)).not.toBeInTheDocument();
    userEvent.click(screen.getByText(offer.title));
    expect(screen.queryByText(/This is room screen/i)).toBeInTheDocument();
  });
});
