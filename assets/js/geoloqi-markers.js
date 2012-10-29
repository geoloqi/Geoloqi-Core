Geoloqi.module("markers.style_for", function(){
	exports = {};
	normal = {
		shadowUrl: '/geoloqi-core/assets/img/markers/shadow.png',
		iconSize: new L.Point(27, 41),
		shadowSize: new L.Point(29, 43),
		iconAnchor: new L.Point(13, 41),
		//popupAnchor: new L.Point(0, -43)
		popupAnchor: new L.Point(0, -35)
	};
	
	dot = {
		shadowUrl: null,
		shadowSize: new L.Point(0,0),
		iconSize: new L.Point(19, 18),
		iconAnchor: new L.Point(9, 9),
		popupAnchor: new L.Point(0, 0)
	};

	handle = {
		shadowUrl: null,
		shadowSize: new L.Point(0,0),
		iconSize: new L.Point(25, 24),
		iconAnchor: new L.Point(12, 12),
		popupAnchor: new L.Point(0, 0)
	};

	large = {
		shadowUrl: '/geoloqi-core/assets/img/markers/large_shadow.png',
		iconSize: new L.Point(33, 47),
		shadowSize: new L.Point(35, 49),
		iconAnchor: new L.Point(16, 47),
		//popupAnchor: new L.Point(0, -49)
		popupAnchor: new L.Point(0, -42)
	};

	style_for = function(marker_type){
		switch(marker_type){
			case "blank":
				return normal;
			case "cutout":
				return normal;
			case "message":
				return normal;
			case "user":
				return normal;
			case "dot":
				return dot;
			case "handle":
				return handle;
			case "large_blank":
				return large;
			case "large_cutout":
				return large;
			case "large_user":
				return large;
			case "large_message":
				return large;
			default:
				return {};
		}
	};
		
	return style_for;
});

Geoloqi.module("markers.Types", function(){
	return ["blank",
					"cutout",
					"dot",
					"message",
					"user",
					"handle",
					"large_blank",
					"large_cutout",
					"large_user",
					"large_message"];
});

Geoloqi.module("markers.Colors", function(){
	return ["gray",
					"blue",
					"green",
					"orange",
					"red",
					"yellow",
					"pink",
					"purple"];
});

Geoloqi.module("markers.init", function(){
	return function(){
		_.each(Geoloqi.markers.Colors, function(color){
			_.each(Geoloqi.markers.Types, function(marker_type){
				Geoloqi.module("markers."+color+"."+marker_type, function(){
					options = {
						iconUrl: '/geoloqi-core/assets/img/markers/'+color+'_'+marker_type+'.png'
					};
					defaults = Geoloqi.markers.style_for(marker_type);
					if(L.VERSION) {
						return L.Icon.extend(_.extend(options, defaults));
					} else {
						return L.Icon.extend({
							options: _.extend(options, defaults)
						});
					}
				});
			});
		});
	};
});