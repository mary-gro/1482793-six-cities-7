import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Header from '../header/header';
import Footer from '../footer/footer';
import OffersList from '../offers-list/offers-list';
import offerProp from '../offer/offer.prop';
import {OffersType, AppRoute} from '../../const';

function FavoritesScreen({offers}) {
  const favoriteOffersByCity = offers
    .reduce((favoriteOffers, offer) => {
      favoriteOffers[offer.city.name] = [...(favoriteOffers[offer.city.name] || []), offer];
      return favoriteOffers;
    }, {});

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {Object.keys(favoriteOffersByCity).map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link to={AppRoute.MAIN} className="locations__item-link">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>

                  <OffersList
                    offers={favoriteOffersByCity[city]}
                    offersType={OffersType.FAVORITES}
                  />
                </li>
              ))}
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

const mapStateToProps = (state) => ({
  offers: state.offers.filter(({isFavorite}) => isFavorite),
});

export {FavoritesScreen};

export default connect(mapStateToProps)(FavoritesScreen);
