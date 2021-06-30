import React, {useRef, useEffect} from 'react';
import PropTypes from 'prop-types';
import leaflet from 'leaflet';
import 'leaflet/dist/leaflet.css';
import offerProp from '../offer/offer.prop';
import {MarkerType} from '../../const';
import useMap from '../../hooks/use-map/use-map';

const defaultMarker = leaflet.icon(MarkerType.DEFAULT);
const activeMarker = leaflet.icon(MarkerType.ACTIVE);

function Map({offers, activeOfferId, city}) {
  const mapRef = useRef(null);
  const map = useMap(mapRef, city);

  useEffect(() => {
    const markers = leaflet.layerGroup();

    if (map) {
      markers.addTo(map);

      offers.forEach(({location: {latitude, longitude}, id}) => {
        leaflet
          .marker({
            lat: latitude,
            lng: longitude,
          }, {
            icon: (id === activeOfferId)
              ? activeMarker
              : defaultMarker,
          })
          .addTo(markers);
      });
    }

    return () => {
      markers.clearLayers();
    };
  }, [map, offers, activeOfferId]);

  return (
    <div
      style={{height: '100%'}}
      ref={mapRef}
    >
    </div>
  );
}

Map.propTypes = {
  offers: PropTypes.arrayOf(offerProp).isRequired,
  activeOfferId: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  city: PropTypes.object.isRequired,
};

export default Map;
