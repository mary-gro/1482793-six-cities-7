import {offers} from './offers';
import {ActionType} from '../action';
import {Cities, SortType} from '../../const';

describe('Reducer: offers', () => {
  it('without additional parameters should return initial state', () => {
    const initialState = {
      city: Cities.PARIS.name,
      sortType: SortType.DEFAULT,
      activeOfferId: null,
    };
    expect(offers(undefined, {})).toEqual(initialState);
  });

  it('should change city name and change sort type to default by city change', () => {
    const state = {
      city: Cities.PARIS.name,
      sortType: SortType.LOW_TO_HIGH,
    };

    const city = Cities.COLOGNE.name;

    const changeCityAction = {
      type: ActionType.CHANGE_CITY,
      payload: city,
    };

    expect(offers(state, changeCityAction)).toEqual({city, sortType: SortType.DEFAULT});
  });

  it('should change sort type', () => {
    const state = {
      sortType: SortType.DEFAULT,
    };
    const sortType = SortType.LOW_TO_HIGH;

    const sortOffersAction = {
      type: ActionType.SORT_OFFERS,
      payload: sortType,
    };

    expect(offers(state, sortOffersAction)).toEqual({sortType});
  });

  it('should change active offer id', () => {
    const state = {
      activeOfferId: null,
    };
    const activeOfferId = 1;

    const changeActiveOfferAction = {
      type: ActionType.CHANGE_ACTIVE_OFFER,
      payload: activeOfferId ,
    };

    expect(offers(state, changeActiveOfferAction)).toEqual({activeOfferId});
  });
});
