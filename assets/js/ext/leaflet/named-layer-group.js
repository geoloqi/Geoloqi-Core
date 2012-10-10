/*
 * L.NamedLayerGroup is a class to combine several layers so you can manipulate the group (e.g. add/remove it) as one layer.
 */

L.NamedLayerGroup = L.LayerGroup.extend({
  initialize: function (layers) {
    this._layers = layers || {};
    var i, len;
  },

  getLayer: function(key){
    return this._layers[key];
  },

  addLayer: function (key, layer) {
    this._layers[key] = layer;

    if (this._map) {
      this._map.addLayer(layer);
    }

    return this;
  },

  removeLayer: function (key) {
    if (this._map) {
      this._map.removeLayer(this._layers[key]);
    }

    delete this._layers[key];

    return this;
  },

  clearLayers: function () {
    for (var i in this._layers) {
      if (this._layers.hasOwnProperty(i)) {
        this.removeLayer(i);
      }
    }
    return this;
  }
});

L.namedLayerGroup = function(layers){
  return new L.NamedLayerGroup(layers);
};