import {data} from './data';
import {ActionType} from '../action';

const initialState = {
  offers: [],
  offer: {},
  reviews: [],
  nearbyOffers: [],
  favorites: [],
  isDataLoaded: false,
  isOfferDataLoaded: false,
};

const offers = [
  {
    id: 1,
    isFavorite: true,
    city: 'Paris',
  },
  {
    id: 2,
    isFavorite: false,
    city: 'Paris',
  },
];

describe('Reducer: data', () => {
  it('without additional parameters should return initial state', () => {
    expect(data(undefined, {})).toEqual(initialState);
  });

  it('should load offers', () => {
    const getOffersAction = {
      type: ActionType.GET_OFFERS,
      payload: offers,
    };

    expect(data(initialState, getOffersAction)).toEqual({...initialState, offers, isDataLoaded: true});
  });

  it('should load offer by id', () => {
    const offer = {
      id: 3,
      isFavorite: true,
      city: 'Paris',
    };

    const loadOfferAction = {
      type: ActionType.LOAD_OFFER,
      payload: offer,
    };

    expect(data(initialState, loadOfferAction)).toEqual({...initialState, offer, isOfferDataLoaded: true});
  });

  it('should load reviews', () => {
    const reviews = [
      {
        comment: '',
        id: 1,
        rating: 5,
      },
      {
        comment: '',
        id: 2,
        rating: 4,
      },
    ];

    const loadReviewsAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };

    expect(data(initialState, loadReviewsAction)).toEqual({...initialState, reviews});
  });

  it('should load nearby offers', () => {
    const loadNearbyAction = {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: offers,
    };

    expect(data(initialState, loadNearbyAction)).toEqual({...initialState, nearbyOffers: offers});
  });

  it('should set favorites offers by load favorites', () => {
    const loadFavoritesAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: offers,
    };

    expect(data(initialState, loadFavoritesAction)).toEqual({...initialState, favorites: offers});
  });

  it('should update isFavorite data in offers, nearbyOffers, favorites, offers', () => {
    const state = {
      offers: [
        {id: 1, isFavorite: false},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: true},
      ],
      nearbyOffers: [
        {id: 1, isFavorite: false},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: true},
      ],
      offer: {id: 1, isFavorite: false},
      favorites: [
        {id: 3, isFavorite: true},
      ],
    };
    const updatedData = {id: 1, isFavorite: true};

    const updateFavoritesAction = {
      type: ActionType.UPDATE_FAVORITES,
      payload: updatedData,
    };

    expect(data(state, updateFavoritesAction)).toEqual({
      offers: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: true},
      ],
      nearbyOffers: [
        {id: 1, isFavorite: true},
        {id: 2, isFavorite: false},
        {id: 3, isFavorite: true},
      ],
      offer: {id: 1, isFavorite: true},
      favorites: [
        {id: 1, isFavorite: true},
        {id: 3, isFavorite: true},
      ],
    });
  });
});
