import {combineReducers} from '@reduxjs/toolkit';
import {data} from './data/data';
import {offers} from './offers/offers';
import {user} from './user/user';

export const NameSpace = {
  DATA: 'DATA',
  OFFERS: 'OFFERS',
  USER: 'USER',
};

export default combineReducers({
  [NameSpace.DATA]: data,
  [NameSpace.OFFERS]: offers,
  [NameSpace.USER]: user,
});
