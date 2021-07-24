import {createReducer} from '@reduxjs/toolkit';
import {getOffers, loadOffer, loadNearbyOffers, loadReviews, loadFavorites, updateFavorites} from '../action';

const initialState = {
  offers: [],
  offer: {},
  reviews: [],
  nearbyOffers: [],
  favorites: [],
  isDataLoaded: false,
  isOfferDataLoaded: false,
};

const data = createReducer(initialState, (builder) => {
  builder
    .addCase(getOffers, (state, action) => {
      state.offers = action.payload;
      state.isDataLoaded = true;
    })
    .addCase(loadOffer, (state, action) => {
      state.offer = action.payload;
      state.isOfferDataLoaded = true;
    })
    .addCase(loadReviews, (state, action) => {
      state.reviews = action.payload;
    })
    .addCase(loadNearbyOffers, (state, action) => {
      state.nearbyOffers = action.payload;
    })
    .addCase(loadFavorites, (state, action) => {
      state.favorites = action.payload;
    })
    .addCase(updateFavorites, (state, {payload}) => {
      state.offers = state.offers.map((offer) => offer.id === payload.id ? payload : offer);
      state.offer = payload;
      state.favorites = state.offers.filter((offer) => offer.isFavorite);
      state.nearbyOffers = state.nearbyOffers.map((offer) => offer.id === payload.id ? payload : offer);
    });
});

export {data};
