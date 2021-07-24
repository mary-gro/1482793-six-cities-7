import React from 'react';
import {useDispatch} from 'react-redux';
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import {PropertyType, OffersType} from '../../const';
import {getRating} from '../../utils';
import {AppRoute} from '../../const';
import offerProp from './offer.prop';
import {addFavorite} from '../../store/api-actions';

function Offer({offer, offersType, setActiveOfferId}) {
  const {id, isFavorite, isPremium, previewImage, price, rating, title, type} = offer;
  const dispatch = useDispatch();
  const status = isFavorite ? 0 : 1;

  const onBookmarkClick = () => {
    dispatch(addFavorite(id, status));
  };

  return (
    <article
      className={`${offersType.class} place-card`}
      onMouseEnter={offersType.type === OffersType.MAIN.type ? () => {
        setActiveOfferId(id);
      } : null}
      onMouseLeave={offersType.type === OffersType.MAIN.type ? () => {
        setActiveOfferId(null);
      } : null}
    >
      {(isPremium && offersType.type === OffersType.MAIN.type)
      && (
        <div className="place-card__mark">
          <span>Premium</span>
        </div>
      )}
      <div className={`${offersType.wrapper} place-card__image-wrapper`}>
        <Link to={`${AppRoute.ROOM}/${id}`}>
          <img className="place-card__image" src={previewImage} width={offersType.imageWidth} height={offersType.imageHeight} alt="Place"/>
        </Link>
      </div>
      <div className={`place-card__info ${offersType.type === OffersType.FAVORITES.type ? 'favorites__card-info' : ''}`}>
        <div className="place-card__price-wrapper">
          <div className="place-card__price">
            <b className="place-card__price-value">&euro;{price}</b>
            <span className="place-card__price-text">&#47;&nbsp;night</span>
          </div>
          <button className={`${isFavorite ? 'place-card__bookmark-button--active' : ''} place-card__bookmark-button button`} type="button" onClick={onBookmarkClick}>
            <svg className="place-card__bookmark-icon" width="18" height="19">
              <use xlinkHref="#icon-bookmark"></use>
            </svg>
            <span className="visually-hidden">To bookmarks</span>
          </button>
        </div>
        <div className="place-card__rating rating">
          <div className="place-card__stars rating__stars">
            <span style={{width: `${getRating(rating)}%`}}></span>
            <span className="visually-hidden">Rating</span>
          </div>
        </div>
        <h2 className="place-card__name">
          <Link to={`${AppRoute.ROOM}/${id}`}>
            {title}
          </Link>
        </h2>
        <p className="place-card__type">{PropertyType[type]}</p>
      </div>
    </article>
  );
}

Offer.propTypes = {
  offer: offerProp,
  offersType: PropTypes.shape({
    type: PropTypes.string.isRequired,
    listClass: PropTypes.string.isRequired,
    class: PropTypes.string.isRequired,
    wrapper: PropTypes.string.isRequired,
    imageWidth: PropTypes.number.isRequired,
    imageHeight: PropTypes.number.isRequired,
  }).isRequired,
  setActiveOfferId: PropTypes.func.isRequired,
};

export default React.memo(Offer);
