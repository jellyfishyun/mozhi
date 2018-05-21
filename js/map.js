;(function() {
	$.fn.oSetMap = function(opts) {
		var opts = $.extend({
				addr: '常州市',
				city: '' ,
				icon: '',
				resizeEnable: true,
				zoom: 16
			}, opts || {});

		var container = $(this).attr('id');

		if (typeof opts.addr !== 'string' || container === undefined) {
			console.log('ReferenceError');
			return;
		}

		var mapObj = new AMap.Map(container, {
			resizeEnable: opts.resizeEnable,
			zoom: opts.zoom
		});

		var marker = new AMap.Marker({
			map: mapObj,
			icon: opts.icon
		});

		//加载地理编码插件
		mapObj.plugin(["AMap.Geocoder"], function() {
			var MGeocoder = new AMap.Geocoder({
				city: opts.city
			});
			//返回地理编码结果
			AMap.event.addListener(MGeocoder, "complete", function(data) {
				var geocode = data.geocodes,
					lngX = geocode[0].location.getLng()
				latY = geocode[0].location.getLat();
				mapObj.setCenter([lngX, latY]);
				marker.setPosition([lngX, latY]);
			});

			MGeocoder.getLocation(opts.addr); //地理编码
		});
	}
})(jQuery);