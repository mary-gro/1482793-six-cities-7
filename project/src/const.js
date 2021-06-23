export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer/:id',
  MAIN: '/',
};

export const PropertyType = {
  apartment: 'Apartment',
  room: 'Private Room',
  house: 'House',
  hotel: 'Hotel',
};

export const OffersType = {
  MAIN: {
    type: 'main',
    class: 'cities__place-card',
    wrapper: 'cities__image-wrapper',
    imageWidth: 260,
    imageHeight: 200,
  },
  FAVORITES: {
    type: 'favorite',
    class: 'favorites__card',
    wrapper: 'favorites__image-wrapper',
    imageWidth: 150,
    imageHeight: 110,
  },
};
