import {renderHook} from '@testing-library/react-hooks';
import useMap from './use-map';


let mapRef = {};
let city = null;

const fakeLeaflet = {
  __esModule: true,
  default: {
    map() {
      return 'map';
    },
    tileLayer() {
      return this;
    },
    addTo() {
      return this;
    },
  },
};

jest.mock('leaflet', () => fakeLeaflet);

describe('Hook: useMap', () => {
  beforeAll(() => {
    mapRef = {
      current: true,
    };

    city = {
      name: 'Paris',
      location: {
        latitude: 48.85661,
        longitude: 2.351499,
        zoom: 13,
      },
    };
  });

  it('should return map', () => {
    const {result} = renderHook(() => useMap(mapRef, city));

    expect(result.current).toBe('map');
  });
});
