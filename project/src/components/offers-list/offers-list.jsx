import React from 'react';
import Offer from '../offer/offer';
import offerProp from '../offer/offer.prop';
import PropTypes from 'prop-types';

function OffersList({offers, offersType, setActiveOfferId}) {
  return (
    <div className="cities__places-list places__list tabs__content">
      {
        offers.map((offer) => (
          <Offer
            key={offer.id}
            offer={offer}
            offersType={offersType}
            setActiveOfferId={setActiveOfferId}
          />
        ))
      }
    </div>
  );
}

OffersList.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  offersType: PropTypes.object.isRequired,
  setActiveOfferId: PropTypes.func,
};

export default OffersList;
