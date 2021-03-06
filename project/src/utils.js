import {SortType} from './const';

const PERCENTS = 100;
const MAX_RATING = 5;

export const getRating = (rating) => Math.round(rating) * PERCENTS / MAX_RATING;

export const adaptOfferToClient = (offer) => {
  if (offer?.fake) {
    return offer;
  }

  const adaptedOffer = {
    ...offer,
    host: {
      avatarUrl: offer.host.avatar_url,
      id: offer.host.id,
      isPro: offer.host.is_pro,
      name: offer.host.name,
    },
    isFavorite: offer.is_favorite,
    isPremium: offer.is_premium,
    maxAdults: offer.max_adults,
    previewImage: offer.preview_image,

  };

  delete adaptedOffer.is_favorite;
  delete adaptedOffer.is_premium;
  delete adaptedOffer.max_adults;
  delete adaptedOffer.preview_image;

  return adaptedOffer;
};

export const adaptReviewToClient = (review) => {
  if (review?.fake) {
    return review;
  }

  const adaptedReview = {
    ...review,
    user: {
      avatarUrl: review.user.avatar_url,
      id: review.user.id,
      isPro: review.user.is_pro,
      name: review.user.name,
    },
  };

  return adaptedReview;
};

export const adaptUserToClient = (userData) => {
  if (userData?.fake) {
    return userData;
  }

  const adaptedUser = {
    ...userData,
    avatarUrl: userData.avatar_url,
    isPro: userData.is_pro,
  };

  delete adaptedUser.avatar_url;
  delete adaptedUser.is_pro;
  delete adaptedUser.token;

  return adaptedUser;
};

export const sortOffers = (offers, type, city) => {
  const offersByCity = offers.filter((offer) => offer.city.name === city);
  switch (type) {
    case SortType.LOW_TO_HIGH.name:
      return offersByCity.sort((a, b) => a.price - b.price);
    case SortType.HIGH_TO_LOW.name:
      return offersByCity.sort((a, b) => b.price - a.price);
    case SortType.TOP_RATED.name:
      return offersByCity.sort((a, b) => b.rating - a.rating);
    default:
      return offersByCity;
  }
};
