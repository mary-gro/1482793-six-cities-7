import React from 'react';
import PropTypes from 'prop-types';
import Header from '../header/header';
import Footer from '../footer/footer';
import OffersList from '../offers-list/offers-list';
import offerProp from '../offer/offer.prop';
import {OffersType} from '../../const';

function FavoritesScreen({offers}) {
  const favoriteOffers = offers.filter((offer) => offer.isFavorite);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              <li className="favorites__locations-items">
                <div className="favorites__locations locations locations--current">
                  <div className="locations__item">
                    <a className="locations__item-link" href="/#">
                      <span>Amsterdam</span>
                    </a>
                  </div>
                </div>
                <OffersList offers={favoriteOffers} offersType={OffersType.FAVORITES}/>
              </li>
            </ul>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
}

FavoritesScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
};

export default FavoritesScreen;
