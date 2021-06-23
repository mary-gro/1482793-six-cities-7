import React from 'react';
import PropTypes from 'prop-types';

const RatingTitles = {
  5: 'perfect',
  4: 'good',
  3: 'not bad',
  2: 'badly',
  1: 'terribly',
};

function ReviewRating({onFieldChange}) {
  return (
    <div className="reviews__rating-form form__rating">
      {Object.entries(RatingTitles).reverse().map(([value, title]) => (
        <React.Fragment key={title}>
          <input
            className="form__rating-input visually-hidden"
            name="rating"
            value={value}
            id={value <= 1 ? `${value}-star` : `${value}-stars`}
            type="radio"
            onChange={onFieldChange}
            required
          />
          <label
            htmlFor={value <= 1 ? `${value}-star` : `${value}-stars`}
            className="reviews__rating-label form__rating-label"
            title={title}
          >
            <svg className="form__star-image" width="37" height="33">
              <use xlinkHref="#icon-star">
              </use>
            </svg>
          </label>
        </React.Fragment>),
      )}
    </div>
  );
}

ReviewRating.propTypes = {
  onFieldChange: PropTypes.func.isRequired,
};

export default ReviewRating;
