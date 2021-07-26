import {createReducer} from '@reduxjs/toolkit';
import {AuthorizationStatus} from '../../const';
import {requireAuthorization, logout, loadUserData} from '../action';

const initialState = {
  authorizationStatus: AuthorizationStatus.UNKNOWN,
  userData: {},
};

const user = createReducer(initialState, (builder) => {
  builder
    .addCase(requireAuthorization, (state, action) => {
      state.authorizationStatus = action.payload;
    })
    .addCase(logout, (state) => {
      state.authorizationStatus = AuthorizationStatus.NO_AUTH;
    })
    .addCase(loadUserData, (state, action) => {
      state.userData = action.payload;
    });
});

export {user};
