import React, {useState} from 'react';
import {connect} from 'react-redux';
import ReviewRating from '../review-rating/review-rating';
import {addReview} from '../../store/api-actions';
import PropTypes from 'prop-types';

function ReviewForm({id, submitReview}) {
  const [review, setReview] = useState({rating: '', text: ''});

  const onFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReview({...review, [name]: value});
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();

    submitReview(id, review.text, review.rating);
    setReview({rating: '', text: ''});
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating onFieldChange={onFieldChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="text"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onFieldChange}
        value={review.text}
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button className="reviews__submit form__submit button" type="submit" disabled="">Submit</button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
  submitReview: PropTypes.func.isRequired,
};

const mapDispatchToProps = (dispatch) => ({
  submitReview(...data) {
    dispatch(addReview(...data));
  },
});

export {ReviewForm};
export default connect(null, mapDispatchToProps)(ReviewForm);
