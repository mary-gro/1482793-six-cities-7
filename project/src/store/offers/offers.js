import {createReducer} from '@reduxjs/toolkit';
import {changeCity, sortOffers, changeActiveOffer} from '../action';
import {Cities, SortType} from '../../const';

const initialState = {
  city: Cities.PARIS.name,
  sortType: SortType.DEFAULT,
  activeOfferId: null,
};

const offers = createReducer(initialState, (builder) => {
  builder
    .addCase(changeCity, (state, action) => {
      state.city = action.payload;
      state.sortType = SortType.DEFAULT;
    })
    .addCase(sortOffers, (state, action) => {
      state.sortType = action.payload;
    })
    .addCase(changeActiveOffer, (state, action) => {
      state.activeOfferId = action.payload;
    });
});

export {offers};
