export const ActionType = {
  CHANGE_CITY: '/changeCity',
  GET_OFFERS: 'data/getOffers',
  CHANGE_ACTIVE_OFFER: '/changeActiveOffer',
  SORT_OFFERS: '/sortOffers',
  REQUIRED_AUTHORIZATION: 'user/requiredAuthorization',
  LOGOUT: 'user/logout',
  REDIRECT_TO_ROUTE: 'login/redirect',
  ADD_EMAIL: 'login/addEmail',
  LOAD_OFFER: 'data/loadOffer',
  LOAD_NEARBY_OFFERS: 'data/loadNearbyOffers',
  LOAD_REVIEWS: 'data/loadReviews',
};

export const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city,
  }),
  getOffers: (offers) => ({
    type: ActionType.GET_OFFERS,
    payload: offers,
  }),
  changeActiveOffer: (offerId) => ({
    type: ActionType.CHANGE_ACTIVE_OFFER,
    payload: offerId,
  }),
  sortOffers: (sortType) => ({
    type: ActionType.SORT_OFFERS,
    payload: sortType,
  }),
  requireAuthorization: (status) => ({
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: status,
  }),
  logout: () => ({
    type: ActionType.LOGOUT,
  }),
  redirectToRoute: (url) => ({
    type: ActionType.REDIRECT_TO_ROUTE,
    payload: url,
  }),
  addEmail: (email) => ({
    type: ActionType.ADD_EMAIL,
    payload: email,
  }),
  loadOffer: (offer) => ({
    type: ActionType.LOAD_OFFER,
    payload: offer,
  }),
  loadNearbyOffers: (offers) => ({
    type: ActionType.LOAD_NEARBY_OFFERS,
    payload: offers,
  }),
  loadReviews: (reviews) => ({
    type: ActionType.LOAD_REVIEWS,
    payload: reviews,
  }),
};
