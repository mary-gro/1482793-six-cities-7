import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Cities} from '../../const';
import {getCity} from '../../store/offers/selectors';
import {changeCity} from '../../store/action';

function CitiesList() {
  const dispatch = useDispatch();
  const activeCity = useSelector(getCity);

  return (
    <div className="tabs">
      <section className="locations container">
        <ul className="locations__list tabs__list">
          {Object.values(Cities).map((city) => (
            <li className="locations__item" key={city.name}>
              <a
                className={`locations__item-link tabs__item${city.name === activeCity ? ' tabs__item--active' : ''}`}
                href={`#${city}`}
                onClick={() => dispatch(changeCity(city.name))}
              >
                <span>{city.name}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default React.memo(CitiesList);
