import {createAction} from '@reduxjs/toolkit';

export const ActionType = {
  CHANGE_CITY: 'offers/changeCity',
  GET_OFFERS: 'data/getOffers',
  CHANGE_ACTIVE_OFFER: 'offers/changeActiveOffer',
  SORT_OFFERS: 'offers/sortOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'redirect',
  LOAD_USER_DATA: 'user/loadUserData',
  LOAD_OFFER: 'data/loadOffer',
  LOAD_NEARBY_OFFERS: 'data/loadNearbyOffers',
  LOAD_REVIEWS: 'data/loadReviews',
  LOAD_FAVORITES: 'data/loadFavorites',
  UPDATE_FAVORITES: 'data/updateFavorites',
};

export const changeCity = createAction(ActionType.CHANGE_CITY, (payload) => ({
  payload,
}));

export const getOffers = createAction(ActionType.GET_OFFERS, (payload) => ({
  payload,
}));

export const changeActiveOffer = createAction(ActionType.CHANGE_ACTIVE_OFFER, (payload) => ({
  payload,
}));

export const sortOffers = createAction(ActionType.SORT_OFFERS, (payload) => ({
  payload,
}));

export const requireAuthorization = createAction(ActionType.REQUIRED_AUTHORIZATION, (payload) => ({
  payload,
}));

export const logout = createAction(ActionType.LOGOUT);

export const redirectToRoute = createAction(ActionType.REDIRECT_TO_ROUTE, (payload) => ({
  payload,
}));

export const loadUserData = createAction(ActionType.LOAD_USER_DATA, (payload) => ({
  payload,
}));

export const loadOffer = createAction(ActionType.LOAD_OFFER, (payload) => ({
  payload,
}));

export const loadNearbyOffers = createAction(ActionType.LOAD_NEARBY_OFFERS, (payload) => ({
  payload,
}));

export const loadReviews = createAction(ActionType.LOAD_REVIEWS, (payload) => ({
  payload,
}));

export const loadFavorites = createAction(ActionType.LOAD_FAVORITES, (payload) => ({
  payload,
}));

export const updateFavorites = createAction(ActionType.UPDATE_FAVORITES, (payload) => ({
  payload,
}));
