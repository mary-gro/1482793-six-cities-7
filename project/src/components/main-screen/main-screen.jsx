import React from 'react';
import {useSelector} from 'react-redux';
import OffersList from '../offers-list/offers-list.jsx';
import {Cities, OffersType} from '../../const';
import Header from '../header/header';
import Map from '../map/map';
import CitiesList from '../cities-list/cities-list';
import SortList from '../sort-list/sort-list';
import EmptyOffersList from '../empty-offers-list/empty-offers-list';
import {sortOffers} from '../../utils';
import {getCity, getSortType, getActiveOffer} from '../../store/offers/selectors';
import {getOffers} from '../../store/data/selectors';

function MainScreen() {
  const initialOffers = useSelector(getOffers);
  const city = useSelector(getCity);
  const activeOfferId = useSelector(getActiveOffer);
  const sortType = useSelector(getSortType);

  const offers = sortOffers(initialOffers, sortType.name, city);

  return (
    <div className="page page--gray page--main">
      <Header />

      <main className="page__main page__main--index">
        <h1 className="visually-hidden">Cities</h1>
        <CitiesList />
        <div className="cities">
          <div className={`cities__places-container container ${(offers.length > 0) ? '' : 'cities__places-container--empty'}`}>
            {
              !(offers.length > 0)
                ? <EmptyOffersList />
                : (
                  <>
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
                  </>
                )
            }
          </div>
        </div>
      </main>
    </div>
  );
}

export default MainScreen;
