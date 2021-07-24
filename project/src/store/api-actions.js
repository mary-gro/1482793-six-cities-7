import {getOffers, requireAuthorization, logout as userLogout, redirectToRoute, loadUserData, loadOffer, loadNearbyOffers, loadReviews, loadFavorites, updateFavorites} from './action';
import {AuthorizationStatus, APIRoute, AppRoute} from '../const';
import {adaptOfferToClient, adaptReviewToClient, adaptUserToClient} from '../utils';

export const fetchOfferList = () => (dispatch, _getState, api) => (
  api.get(APIRoute.OFFERS)
    .then(({data}) => dispatch(getOffers(data.map((offer) => adaptOfferToClient(offer)))))
);

export const checkAuth = () => (dispatch, _getState, api) => (
  api.get(APIRoute.LOGIN)
    .then(({data}) => {
      dispatch(requireAuthorization(AuthorizationStatus.AUTH));
      dispatch(loadUserData(adaptUserToClient(data)));
    })
    .catch(() => {})
);

export const login = ({login: email, password}) => (dispatch, _getState, api) => (
  api.post(APIRoute.LOGIN, {email, password})
    .then(({data}) => {
      localStorage.setItem('token', data.token);
      dispatch(loadUserData(adaptUserToClient(data)));
    })
    .then(() => dispatch(requireAuthorization(AuthorizationStatus.AUTH)))
    .then(() => dispatch(redirectToRoute(AppRoute.MAIN)))
);

export const logout = () => (dispatch, _getState, api) => (
  api.delete(APIRoute.LOGOUT)
    .then(() => localStorage.removeItem('token'))
    .then(() => dispatch(userLogout()))
    .then(() => dispatch(fetchOfferList()))
);

export const fetchOffer = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}`)
    .then(({data}) => dispatch(loadOffer(adaptOfferToClient(data))))
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const fetchNearbyOffers = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.OFFERS}/${id}/nearby`)
    .then(({data}) => {
      dispatch(loadNearbyOffers(
        data.map((offer) => adaptOfferToClient(offer)),
      ));
    })
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const fetchReviews = (id) => (dispatch, _getState, api) => (
  api.get(`${APIRoute.REVIEWS}/${id}`)
    .then(({data}) => {
      dispatch(loadReviews(
        data.map((review) => adaptReviewToClient(review)),
      ));
    })
    .catch(() => dispatch(redirectToRoute(AppRoute.NOT_FOUND)))
);

export const addReview = (id, {comment, rating}) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.REVIEWS}/${id}`, {comment, rating})
    .then(({data}) => {
      dispatch(loadReviews(
        data.map((review) => adaptReviewToClient(review)),
      ));
    })
);

export const fetchFavorites = () => (dispatch, _getState, api) => (
  api.get(APIRoute.FAVORITE)
    .then(({data}) => {
      dispatch(loadFavorites(
        data.map((offer) => adaptOfferToClient(offer)),
      ));
    })
    .catch(() => dispatch(redirectToRoute(AppRoute.LOGIN)))
);

export const addFavorite = (id, status) => (dispatch, _getState, api) => (
  api.post(`${APIRoute.FAVORITE}/${id}/${status}`)
    .then(({data}) => {
      dispatch(updateFavorites(adaptOfferToClient(data)));
    })
    .catch(() => dispatch(redirectToRoute(AppRoute.LOGIN)))
);
