import {NameSpace} from '../root-reducer';

export const getCity = (state) => state[NameSpace.OFFERS].city;

export const getSortType = (state) => state[NameSpace.OFFERS].sortType;

export const getActiveOffer = (state) => state[NameSpace.OFFERS].activeOfferId;
