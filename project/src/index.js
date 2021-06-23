import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app/app';
import offers from './mocks/offers';
import {adaptOfferToClient} from './utils';

const adaptedOffers = offers.map((offer) => adaptOfferToClient(offer));

ReactDOM.render(
  <React.StrictMode>
    <App
      offers={adaptedOffers}
    />
  </React.StrictMode>,
  document.getElementById('root'));
