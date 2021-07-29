import React from 'react';
import {useDispatch} from 'react-redux';
import Offer from '../offer/offer';
import offerProp from '../offer/offer.prop';
import PropTypes from 'prop-types';
import {changeActiveOffer} from '../../store/action';

function OffersList({offers, offersType}) {
  const dispatch = useDispatch();

  return (
    <div className={`${offersType.listClass}`}>
      {
        offers.map((offer) => (
          <Offer
            key={offer.id}
            offer={offer}
            offersType={offersType}
            onOfferHover={(payload) => dispatch(changeActiveOffer(payload))}
          />
        ))
      }
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  offersType: PropTypes.shape({
    type: PropTypes.string,
    listClass: PropTypes.string,
    class: PropTypes.string,
    wrapper: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
  }).isRequired,
};

export default OffersList;
