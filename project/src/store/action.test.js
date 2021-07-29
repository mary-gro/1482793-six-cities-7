import {
  ActionType,
  changeCity,
  getOffers,
  changeActiveOffer,
  sortOffers,
  requireAuthorization,
  logout,
  redirectToRoute,
  loadUserData,
  loadOffer,
  loadNearbyOffers,
  loadReviews,
  loadFavorites,
  updateFavorites
} from './action';

describe('Actions', () => {
  it('action creator for change city returns correct action', () => {
    const city = 'Amsterdam';
    const expectedAction = {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };
    expect(changeCity(city)).toEqual(expectedAction);
  });

  it('action creator for get offers returns correct action', () => {
    const offers = [{}, {}, {}, {}];
    const expectedAction = {
      type: ActionType.GET_OFFERS,
      payload: offers,
    };
    expect(getOffers(offers)).toEqual(expectedAction);
  });

  it('action creator for change active offer returns correct action', () => {
    const id = '235';
    const expectedAction = {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: id,
    };
    expect(changeActiveOffer(id)).toEqual(expectedAction);
  });

  it('action creator for sort offers returns correct action', () => {
    const sortType = {
      name: 'default',
      description: 'Popular',
    };
    const expectedAction = {
      type: ActionType.SORT_OFFERS,
      payload: sortType,
    };
    expect(sortOffers(sortType)).toEqual(expectedAction);
  });

  it('action creator for require authorization returns correct action', () => {
    const status = 'NO_AUTH';
    const expectedAction = {
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: status,
    };
    expect(requireAuthorization(status)).toEqual(expectedAction);
  });

  it('action creator for logout returns correct action', () => {
    const expectedAction = {
      type: ActionType.LOGOUT,
    };
    expect(logout()).toEqual(expectedAction);
  });

  it('action creator for redirect to route returns correct action', () => {
    const route = 'url';
    const expectedAction = {
      type: ActionType.REDIRECT_TO_ROUTE,
      payload: route,
    };
    expect(redirectToRoute(route)).toEqual(expectedAction);
  });

  it('action creator for load user data returns correct action', () => {
    const userData = {};
    const expectedAction = {
      type: ActionType.LOAD_USER_DATA,
      payload: userData,
    };
    expect(loadUserData(userData)).toEqual(expectedAction);
  });

  it('action creator for load offer returns correct action', () => {
    const offer = {};
    const expectedAction = {
      type: ActionType.LOAD_OFFER,
      payload: offer,
    };
    expect(loadOffer(offer)).toEqual(expectedAction);
  });

  it('action creator for load nearby offers returns correct action', () => {
    const nearbyOffers = [{}, {}, {}];
    const expectedAction = {
      type: ActionType.LOAD_NEARBY_OFFERS,
      payload: nearbyOffers,
    };
    expect(loadNearbyOffers(nearbyOffers)).toEqual(expectedAction);
  });

  it('action creator for load reviews returns correct action', () => {
    const reviews = [{}, {}, {}];
    const expectedAction = {
      type: ActionType.LOAD_REVIEWS,
      payload: reviews,
    };
    expect(loadReviews(reviews)).toEqual(expectedAction);
  });

  it('action creator for load favorites offers returns correct action', () => {
    const favorites = [{}, {}, {}];
    const expectedAction = {
      type: ActionType.LOAD_FAVORITES,
      payload: favorites,
    };
    expect(loadFavorites(favorites)).toEqual(expectedAction);
  });

  it('action creator for update favorites returns correct action', () => {
    const data = {};
    const expectedAction = {
      type: ActionType.UPDATE_FAVORITES,
      payload: data,
    };
    expect(updateFavorites(data)).toEqual(expectedAction);
  });
});
