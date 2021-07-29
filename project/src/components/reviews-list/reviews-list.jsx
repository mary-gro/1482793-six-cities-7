import React from 'react';
import PropTypes from 'prop-types';
import Review from '../review/review';
import reviewProp from '../review/review.prop';

const REVIEWS_MAX_COUNT = 10;

const getSortedReviews = (reviews) => {
  const sortedReviews = reviews.slice()
    .sort((firstReview, secondReview) => {
      const firstReviewDate = new Date(firstReview.date);
      const secondReviewDate = new Date(secondReview.date);

      return secondReviewDate.getTime() - firstReviewDate.getTime();
    });

  if (sortedReviews.length > REVIEWS_MAX_COUNT) {
    return sortedReviews.slice(0, REVIEWS_MAX_COUNT);
  }

  return sortedReviews;
};

function ReviewsList (props) {
  const {reviews} = props;
  const sortedReviews = getSortedReviews(reviews);


  return (
    <ul className="reviews__list">
      {sortedReviews.map((review) => (
        <Review
          key={review.id}
          review={review}
        />
      ))}
    </ul>
  );
}

ReviewsList.propTypes = {
  reviews: PropTypes.arrayOf(reviewProp).isRequired,
};

export default ReviewsList;
