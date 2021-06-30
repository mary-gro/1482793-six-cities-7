import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers';
import reviews from './mocks/reviews';
import {adaptOfferToClient, adaptReviewToClient} from './utils';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));
const adaptedReviews = reviews.map((review) => adaptReviewToClient(review));

ReactDOM.render(
  <React.StrictMode>
    <App
      offers={adaptedOffers}
      reviews={adaptedReviews}
    />
  </React.StrictMode>,
  document.getElementById('root'));
