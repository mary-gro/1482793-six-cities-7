export const AppRoute = {
  LOGIN: '/login',
  FAVORITES: '/favorites',
  ROOM: '/offer',
  MAIN: '/',
  NOT_FOUND: '/404',
};

export const APIRoute = {
  OFFERS: '/hotels',
  LOGIN: '/login',
  LOGOUT: '/logout',
  FAVORITE: '/favorite',
  REVIEWS: '/comments',
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

export const Cities = {
  PARIS: {
    name: 'Paris',
    location: {
      latitude: 48.864716,
      longitude: 2.349014,
      zoom: 12,
    },
  },
  COLOGNE: {
    name: 'Cologne',
    location: {
      latitude: 50.935173,
      longitude: 6.953101,
      zoom: 12,
    },
  },
  BRUSSELS: {
    name: 'Brussels',
    location: {
      latitude: 50.85045,
      longitude: 4.34878,
      zoom: 16,
    },
  },
  AMSTERDAM: {
    name: 'Amsterdam',
    location: {
      latitude: 52.38333,
      longitude: 4.9,
      zoom: 12,
    },
  },
  HAMBURG: {
    name: 'Hamburg',
    location: {
      latitude: 53.551086,
      longitude: 9.993682,
      zoom: 12,
    },
  },
  DUSSELDORF: {
    name: 'Dusseldorf',
    location: {
      latitude: 51.233334,
      longitude: 6.783333,
      zoom: 12,
    },
  },
};

export const SortType = {
  DEFAULT: {
    name: 'default',
    description: 'Popular',
  },
  LOW_TO_HIGH: {
    name: 'lowPrice',
    description: 'Price: low to high',
  },
  HIGH_TO_LOW: {
    name: 'highPrice',
    description: 'Price: high to low',
  },
  TOP_RATED: {
    name: 'topRated',
    description: 'Top rated first',
  },
};

export const AuthorizationStatus = {
  AUTH: 'AUTH',
  NO_AUTH: 'NO_AUTH',
  UNKNOWN: 'UNKNOWN',
};
