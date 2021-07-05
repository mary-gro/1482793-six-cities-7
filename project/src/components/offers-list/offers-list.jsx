import React from 'react';
import {connect} from 'react-redux';
import {ActionCreator} from '../../store/action';
import Offer from '../offer/offer';
import offerProp from '../offer/offer.prop';
import PropTypes from 'prop-types';

function OffersList({offers, offersType, setActiveOfferId}) {
  return (
    <div className={`${offersType.listClass}`}>
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
  offersType: PropTypes.shape({
    type: PropTypes.string,
    listClass: PropTypes.string,
    class: PropTypes.string,
    wrapper: PropTypes.string,
    imageWidth: PropTypes.number,
    imageHeight: PropTypes.number,
  }).isRequired,
  setActiveOfferId: PropTypes.func,
};

const mapDispatchToProps = (dispatch) => ({
  setActiveOfferId(offerId) {
    dispatch(ActionCreator.changeActiveOffer(offerId));
  },
});

export {OffersList};

export default connect(null, mapDispatchToProps)(OffersList);
