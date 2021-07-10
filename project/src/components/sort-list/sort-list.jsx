import React, {useState} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import SortItem from '../sort-item/sort-item';
import {ActionCreator} from '../../store/action';
import {SortType} from '../../const';

function SortList({sortType, onSortingChange}) {
  const [isListOpened, setIsListOpened] = useState(false);
  const sortingClickHandler = (payload) => {
    setIsListOpened(false);
    onSortingChange(payload);
  };

  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by</span>
      <span
        className="places__sorting-type"
        tabIndex="0"
        onClick={() => setIsListOpened(!isListOpened)}
      >
        {sortType.description}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isListOpened ? 'places__options--opened' : ''}`}>
        {
          Object.keys(SortType).map((type) => (
            <SortItem
              key={type}
              type={type}
              isActive={sortType === type}
              onClick={() => sortingClickHandler(SortType[type])}
            />
          ))
        }
      </ul>
    </form>
  );
}

SortList.propTypes = {
  onSortingChange: PropTypes.func.isRequired,
  sortType: PropTypes.shape({
    name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }).isRequired,
};

const mapStateToProps = (state) => ({
  sortType: state.sortType,
});

const mapDispatchToProps = (dispatch) => ({
  onSortingChange(sortType) {
    dispatch(ActionCreator.sortOffers(sortType));
  },
});

export {SortList};

export default connect(mapStateToProps, mapDispatchToProps)(SortList);
