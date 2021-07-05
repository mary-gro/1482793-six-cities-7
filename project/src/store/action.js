export const ActionType = {
  CHANGE_CITY: '/changeCity',
  GET_OFFERS: '/getOffers',
  CHANGE_ACTIVE_OFFER: '/changeActiveOffer',
  SORT_OFFERS: '/sortOffers',
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
};