var Geoloqi = Geoloqi || {};

// Namespaceing Helper
// http://addyosmani.com/blog/essential-js-namespacing/
Geoloqi.module = function(ns_string, module) {
  var parts = ns_string.split('.'),
      parent = Geoloqi,
      pl, i;
  if (parts[0] == "Geoloqi") {
    parts = parts.slice(1);
  }
  pl = parts.length;
  for (i = 0; i < pl; i++) {
    if(i == pl-1 && module) {
      parent[parts[i]] = module();
    } else if (typeof parent[parts[i]] == 'undefined') {
      parent[parts[i]] = {};
    }
    parent = parent[parts[i]];
  }
  return parent;
};

// console.log Wrapper
// http://paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
Geoloqi.log = function(){
  Geoloqi.logs = Geoloqi.logs || [];   // store logs to an array for reference
  Geoloqi.logs.push(arguments);
  if(window.console){
    console.log( Array.prototype.slice.call(arguments) );
  }
};