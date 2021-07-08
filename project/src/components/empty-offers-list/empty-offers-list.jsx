import React from 'react';
import PropTypes from 'prop-types';


function EmptyOffersList({activeCity}) {
  return (
    <div className="cities__status-wrapper tabs__content">
      <b className="cities__status">No places to stay available</b>
      <p className="cities__status-description">We could not find any property available at the moment in {activeCity}</p>
    </div>
  );
}

EmptyOffersList.propTypes = {
  activeCity: PropTypes.string.isRequired,
};

export default EmptyOffersList;
