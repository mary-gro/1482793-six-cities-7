import {ActionType} from './action';
import {Cities, SortType} from '../const';
import {adaptOfferToClient} from '../utils';
import offers from '../mocks/offers';

const initialState = {
  city: Cities.PARIS.name,
  offers: offers.map((offer) => adaptOfferToClient(offer)),
  sortType: SortType.DEFAULT,
  activeOfferId: null,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHANGE_CITY:
      return {
        ...state,
        city: action.payload,
      };
    case ActionType.GET_OFFERS:
      return {
        ...state,
        offers: action.payload,
      };
    case ActionType.CHANGE_ACTIVE_OFFER:
      return {
        ...state,
        activeOfferId: action.payload,
      };
    case ActionType.SORT_OFFERS:
      return {
        ...state,
        sortType: action.payload,
      };
    default:
      return state;
  }
};


export {reducer};
