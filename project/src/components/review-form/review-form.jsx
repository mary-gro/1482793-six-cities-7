import React, {useState, useRef} from 'react';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {useDispatch} from 'react-redux';
import ReviewRating from '../review-rating/review-rating';
import {addReview} from '../../store/api-actions';
import PropTypes from 'prop-types';
import {ReviewLength, FORM_ERROR_TEXT} from '../../const';

function ReviewForm({id}) {
  const dispatch = useDispatch();
  const formRef = useRef();
  const [review, setReview] = useState({rating: '', text: ''});
  const [isDisabled, setIsDisabled] = useState(false);

  const onFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReview({...review, [name]: value});
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
    setIsDisabled(true);
    dispatch(addReview(id, {
      comment: review.text,
      rating: review.rating,
    }))
      .then(() => {
        setReview({rating: '', text: ''});
        formRef.current.reset();
      })
      .catch(() => {
        toast.error(FORM_ERROR_TEXT, {
          position: 'top-center',
          autoClose: 3000,
        });
      })
      .finally(() => setIsDisabled(false));
  };

  return (
    <form className="reviews__form form" ref={formRef} action="#" method="post" onSubmit={onFormSubmit}>
      <ToastContainer />
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating onFieldChange={onFieldChange} isDisabled={isDisabled} />
      <textarea
        className="reviews__textarea form__textarea"
        minLength={ReviewLength.MIN}
        maxLength={ReviewLength.MAX}
        id="review"
        name="text"
        placeholder="Tell how was your stay, what you like and what can be improved"
        onChange={onFieldChange}
        value={review.text}
        disabled={isDisabled}
        required
      >
      </textarea>
      <div className="reviews__button-wrapper">
        <p className="reviews__help">
          To submit review please make sure to set <span className="reviews__star">rating</span> and describe your stay with at least <b className="reviews__text-amount">50 characters</b>.
        </p>
        <button
          className="reviews__submit form__submit button"
          type="submit"
          disabled={!(review.rating && review.text.length > ReviewLength.MIN && review.text.length < ReviewLength.MAX) || isDisabled}
        >
            Submit
        </button>
      </div>
    </form>
  );
}

ReviewForm.propTypes = {
  id: PropTypes.number.isRequired,
};

export default ReviewForm;
