import React from 'react';
import ReactDOM from 'react-dom';
import {createStore} from 'redux';
import {Provider} from 'react-redux';
import {composeWithDevTools} from 'redux-devtools-extension';
import App from './components/app/app';
import reviews from './mocks/reviews';
import {adaptReviewToClient} from './utils';
import {reducer} from './store/reducer';

const adaptedReviews = reviews.map((review) => adaptReviewToClient(review));

const store = createStore(
  reducer,
  composeWithDevTools(),
);

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App
        reviews={adaptedReviews}
      />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'));
