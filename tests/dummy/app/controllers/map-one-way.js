/* globals L:false */

import Ember from 'ember';
import config from '../config/environment';
import getMapillaryLayerConfig from '../utils/get-mapillary-layer-config';

export default Ember.Controller.extend({
  // get client id from config
  clientId: config.APP.mapillaryClientId,
  // map center and zoom
  lat: 56.04958221173251,
  lon: 12.689836318219475,
  zoom: 15,

  // marker is bound to this location
  latLon: Ember.computed('lat', 'lon', function() {
    return [this.get('lat'), this.get('lon')];
  }),

  actions: {
    // when map loads, add vector tile mapillary coverage layer
    onMapLoad(e) {
      var map = e.target;
      var mlyVectorLayerConfig = getMapillaryLayerConfig();
      var mvtSource = new L.TileLayer.MVTSource(mlyVectorLayerConfig);
      map.addLayer(mvtSource);
    },
    // when viewer updates to a new node, recenter map/marker
    onViewerUpdate(node) {
      this.setProperties({
        lat: node.latLon.lat,
        lon: node.latLon.lon
      });
    }
  }
});
