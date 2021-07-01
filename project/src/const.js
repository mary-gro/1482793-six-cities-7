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
    listClass: 'cities__places-list places__list tabs__content',
    class: 'cities__place-card',
    wrapper: 'cities__image-wrapper',
    imageWidth: 260,
    imageHeight: 200,
  },
  FAVORITES: {
    type: 'favorite',
    listClass: 'favorites__places',
    class: 'favorites__card',
    wrapper: 'favorites__image-wrapper',
    imageWidth: 150,
    imageHeight: 110,
  },
  NEARBY: {
    type: 'offer',
    listClass: 'near-places__list places__list',
    class: 'near-places__card',
    wrapper: 'near-places__image-wrapper',
    imageWidth: 260,
    imageHeight: 200,
  },
};

export const MarkerType = {
  DEFAULT: {
    iconUrl: 'img/pin.svg',
    iconSize: [27, 40],
    iconAnchor: [15, 30],
  },
  ACTIVE: {
    iconUrl: 'img/pin-active.svg',
    iconSize: [27, 40],
    iconAnchor: [15, 30],
  },
};
