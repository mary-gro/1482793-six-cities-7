import React, {useState} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import SortItem from '../sort-item/sort-item';
import {sortOffers} from '../../store/action';
import {getSortType} from '../../store/offers/selectors';
import {SortType} from '../../const';

function SortList() {
  const dispatch = useDispatch();
  const [isListOpened, setIsListOpened] = useState(false);
  const sortType = useSelector(getSortType);

  const handleSortingClick = (payload) => {
    setIsListOpened(false);
    dispatch(sortOffers(payload));
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
              onClick={() => handleSortingClick(SortType[type])}
            />
          ))
        }
      </ul>
    </form>
  );
}

export default SortList;
