import React, {useState} from 'react';
import ReviewRating from '../review-rating/review-rating';

function ReviewForm() {
  const [review, setReview] = useState({rating: '', text: ''});

  const onFieldChange = (evt) => {
    const {name, value} = evt.target;
    setReview({...review, [name]: value});
  };

  const onFormSubmit = (evt) => {
    evt.preventDefault();
  };

  return (
    <form className="reviews__form form" action="#" method="post" onSubmit={onFormSubmit}>
      <label className="reviews__label form__label" htmlFor="review">Your review</label>
      <ReviewRating onFieldChange={onFieldChange} />
      <textarea
        className="reviews__textarea form__textarea"
        id="review"
        name="review"
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

export default ReviewForm;
