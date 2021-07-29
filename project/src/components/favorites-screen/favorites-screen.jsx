import React, {useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Link} from 'react-router-dom';
import Header from '../header/header';
import Footer from '../footer/footer';
import OffersList from '../offers-list/offers-list';
import EmptyFavoritesList from '../empty-favorites-list/empty-favorites-list';
import {OffersType, AppRoute} from '../../const';
import {getFavorites} from '../../store/data/selectors';
import {fetchFavorites} from '../../store/api-actions';

function FavoritesScreen() {
  const dispatch = useDispatch();
  const favoriteOffers = useSelector(getFavorites);

  useEffect(() => {
    dispatch(fetchFavorites());
  });

  if (favoriteOffers.length === 0) {
    return (
      <div className="page page--favorites-empty">
        <Header/>
        <EmptyFavoritesList />
        <Footer/>
      </div>
    );
  }

  const favoriteCities = Array.from(new Set(favoriteOffers.map((offer) => offer.city.name)));
  const favoriteOffersByCity = (city) => favoriteOffers.filter((item) => item.city.name === city);

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--favorites">
        <div className="page__favorites-container container">
          <section className="favorites">
            <h1 className="favorites__title">Saved listing</h1>
            <ul className="favorites__list">
              {favoriteCities.map((city) => (
                <li className="favorites__locations-items" key={city}>
                  <div className="favorites__locations locations locations--current">
                    <div className="locations__item">
                      <Link to={AppRoute.MAIN} className="locations__item-link">
                        <span>{city}</span>
                      </Link>
                    </div>
                  </div>

                  <OffersList
                    offers={favoriteOffersByCity(city)}
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

export default FavoritesScreen;
