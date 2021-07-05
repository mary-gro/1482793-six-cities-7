import React from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import OffersList from '../offers-list/offers-list.jsx';
import offerProp from '../offer/offer.prop';
import {Cities, OffersType} from '../../const';
import Header from '../header/header';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortList from '../sort-list/sort-list';
import {sortOffers} from '../../utils';

function MainScreen({offers, city, activeOfferId}) {

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className="cities__places-container container">
            <section className="cities__places places">
              <h2 className="visually-hidden">Places</h2>
              <b className="places__found">{offers.length} places to stay in {city}</b>
              <SortList />
              <OffersList offers={offers} offersType={OffersType.MAIN} activeOfferId={activeOfferId} />
            </section>
            <div className="cities__right-section">
              <section className="cities__map map">
                <Map offers={offers} activeOfferId={activeOfferId} city={Cities[city.toUpperCase()]} />
              </section>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

const mapStateToProps = (state) => ({
  offers: sortOffers(state.offers, state.sortType.name, state.city),
  city: state.city,
  activeOfferId: state.activeOfferId,
});

MainScreen.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  city: PropTypes.string.isRequired,
  activeOfferId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
};

export {MainScreen};
export default connect(mapStateToProps)(MainScreen);
