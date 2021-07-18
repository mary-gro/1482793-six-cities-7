import React, {useEffect} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../header/header';
import ReviewForm from '../review-form/review-form';
import ReviewsList from '../reviews-list/reviews-list';
import Map from '../map/map';
import OffersList from '../offers-list/offers-list';
import {OffersType, AuthorizationStatus} from '../../const';
import {fetchOffer, fetchReviews, fetchNearbyOffers} from '../../store/api-actions';
import {getRating} from '../../utils';
import Loading from '../loading/loading';
import offerProp from '../offer/offer.prop';
import reviewProp from '../review/review.prop';

function RoomScreen({id, currentOffer, getOffer, reviews, nearbyOffers, isOfferDataLoaded, authorizationStatus}) {
  useEffect(() => {
    getOffer(id);
  }, [id, getOffer]);

  const {bedrooms, description, goods, host, images, isFavorite, isPremium, maxAdults, price, rating, title, type} = currentOffer;

  if (!isOfferDataLoaded) {
    return (
      <Loading />
    );
  }

  return (
    <div className="page">
      <Header />

      <main className="page__main page__main--property">
        <section className="property">
          <div className="property__gallery-container container">
            <div className="property__gallery">
              {images.map((image) => (
                <div className="property__image-wrapper" key={image}>
                  <img className="property__image" src={image} alt="Property"/>
                </div>),
              )}
            </div>
          </div>
          <div className="property__container container">
            <div className="property__wrapper">
              {isPremium && (
                <div className="property__mark">
                  <span>Premium</span>
                </div>
              )}
              <div className="property__name-wrapper">
                <h1 className="property__name">
                  {title}
                </h1>
                <button className={`${isFavorite ? 'property__bookmark-button--active' : ''} property__bookmark-button button`} type="button">
                  <svg className="property__bookmark-icon" width="31" height="33">
                    <use xlinkHref="#icon-bookmark"></use>
                  </svg>
                  <span className="visually-hidden">To bookmarks</span>
                </button>
              </div>
              <div className="property__rating rating">
                <div className="property__stars rating__stars">
                  <span style={{width: `${getRating(rating)}%`}}></span>
                  <span className="visually-hidden">Rating</span>
                </div>
                <span className="property__rating-value rating__value">{rating}</span>
              </div>
              <ul className="property__features">
                <li className="property__feature property__feature--entire">
                  {type}
                </li>
                <li className="property__feature property__feature--bedrooms">
                  {bedrooms} {bedrooms > 1 ? 'Bedrooms' : 'Bedroom'}
                </li>
                <li className="property__feature property__feature--adults">
                  Max {maxAdults} {maxAdults > 1 ? 'adults' : 'adult'}
                </li>
              </ul>
              <div className="property__price">
                <b className="property__price-value">&euro;{price}</b>
                <span className="property__price-text">&nbsp;night</span>
              </div>
              <div className="property__inside">
                <h2 className="property__inside-title">What&apos;s inside</h2>
                <ul className="property__inside-list">
                  {goods.map((property) => (
                    <li className="property__inside-item" key={property}>
                      {property}
                    </li>),
                  )}
                </ul>
              </div>
              <div className="property__host">
                <h2 className="property__host-title">Meet the host</h2>
                <div className="property__host-user user">
                  <div className="property__avatar-wrapper property__avatar-wrapper--pro user__avatar-wrapper">
                    <img className="property__avatar user__avatar" src={host.avatarUrl} width="74" height="74" alt="Host avatar" />
                  </div>
                  <span className="property__user-name">
                    {host.name}
                  </span>
                  {host.isPro && (
                    <span className="property__user-status">
                    Pro
                    </span>
                  )}
                </div>
                <div className="property__description">
                  <p className="property__text">
                    {description}
                  </p>
                </div>
              </div>
              <section className="property__reviews reviews">
                <h2 className="reviews__title">Reviews &middot; <span className="reviews__amount">{reviews.length}</span></h2>
                <ReviewsList
                  reviews={reviews}
                />
                {authorizationStatus === AuthorizationStatus.AUTH ? <ReviewForm id={currentOffer.id} /> : ''}
              </section>
            </div>
          </div>
          <section className="property__map map">
            <Map offers={[...nearbyOffers, currentOffer]} activeOfferId={currentOffer.id} city={currentOffer.city} />
          </section>
        </section>
        <div className="container">
          <section className="near-places places">
            <h2 className="near-places__title">Other places in the neighbourhood</h2>
            <OffersList offers={nearbyOffers} offersType={OffersType.NEARBY}/>
          </section>
        </div>
      </main>
    </div>
  );
}

RoomScreen.propTypes = {
  id: PropTypes.string,
  currentOffer: offerProp,
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
  nearbyOffers: PropTypes.arrayOf(offerProp),
  authorizationStatus: PropTypes.string.isRequired,
  getOffer: PropTypes.func.isRequired,
  isOfferDataLoaded: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  currentOffer: state.offer,
  reviews: state.reviews,
  nearbyOffers: state.nearbyOffers,
  authorizationStatus: state.authorizationStatus,
  isOfferDataLoaded: state.isDataLoaded,
});

const mapDispatchToProps = (dispatch) => ({
  getOffer(id) {
    dispatch(fetchOffer(id));
    dispatch(fetchNearbyOffers(id));
    dispatch(fetchReviews(id));
  },
});

export {RoomScreen};
export default connect(mapStateToProps, mapDispatchToProps)(RoomScreen);
