import React from 'react';
import PropTypes from 'prop-types';
import {SortType} from '../../const';

function SortItem({type, isActive, onClick}) {
  return (
    <li
      className={`places__option ${isActive ? 'places__option--active' : ''}`}
      tabIndex="0"
      onClick={onClick}
    >
      {SortType[type].description}
    </li>
  );
}

SortItem.propTypes = {
  type: PropTypes.string.isRequired,
  isActive: PropTypes.bool.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default SortItem;
