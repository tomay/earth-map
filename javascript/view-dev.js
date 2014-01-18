var View = {

  zoomToAddress: function(map,address) {
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode( {'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        map.fitBounds([
          [results[0].geometry.viewport.getSouthWest().lat(),
          results[0].geometry.viewport.getSouthWest().lng()],
          [results[0].geometry.viewport.getNorthEast().lat(),
          results[0].geometry.viewport.getNorthEast().lng()]
        ]);
      }
    });
  },

  bindTextarea: function(map) {
    $('#location-text').bind("enterKey",function(e){
      address = $('#location-text').val()
      View.zoomToAddress(map, address)
    });

    $('#location-text').keydown(function(e){
      if(e.keyCode == 13) {
        var inval= $('#location-text').val()
        var outval = inval.replace(/\n/g, "")
        $('#location-text').val(outval)
        $(this).trigger("enterKey");
        return false;
      }
    });
  },

  clearTextarea: function() {
    $('#location-text').focus(function() {
      $(this).val('');
    });
  }

}

// on ready
$(function(){
  // get class list from elem
  !function(e){e.fn.classes=function(t){var n=[];e.each(this,function(e,t){var r=t.className.split(/\s+/);for(var i in r){var s=r[i];if(-1===n.indexOf(s)){n.push(s)}}});if("function"===typeof t){for(var r in n){t(n[r])}}return n}}(jQuery);

  $("#container").hover(function () {
    $("#container").animate({
        height: "350px"
      }, {
        queue: false
    });
    }, function () {
    $("#container").animate({
        height: "35px"
      }, {
        queue: false
      });
  });

  $('span > a').click(function() {
    // debugger
    // toggle active link span
    var activeClass = $('span.active').classes()[1]
    $('span.nav-item').removeClass('active');
    $(this).parent().addClass('active');

    // toggle hidden paragraph
    $("div." + activeClass).addClass('hidden')
    var thisClass = $(this).parent().classes()[1]
    $("div." + thisClass).removeClass('hidden')
  });

  var map = L.map('map').setView([30, -90], 4);
  var googleLayer    = new L.Google('ROADMAP');
  var cloudmadeLayer = new L.TileLayer('http://{s}.tile.cloudmade.com/950091b358f4414d81a9c6f5044d082c/997/256/{z}/{x}/{y}.png', {
    attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery &copy; <a href="http://cloudmade.com">CloudMade</a>',
    maxZoom: 18
  })

  map.addLayer(googleLayer);

  var wmsForestCover = L.tileLayer.wms("http://162.243.248.31:8080/geoserver/opengeo/wms", {
    layers: 'opengeo:GLOBCOVER_L4_200901_200912_V2.3',
    format: 'image/png',
    transparent: true,
    version: '1.1.0',
    attribution: ""
  });

  var wmsLastWild = new L.tileLayer.wms("http://sedac.ciesin.columbia.edu/geoserver/gwc/service/wms", {
    layers: 'wildareas-v2:wildareas-v2-last-of-the-wild-geographic',
    format: 'image/png',
    transparent: true,
    opacity: 0.65,
    version: '1.1.1',
    attribution: ""
  });

  var wmsRivers = L.tileLayer.wms("http://162.243.248.31:8080/geoserver/opengeo/wms", {
    layers: 'opengeo:rivers',
    format: 'image/png',
    transparent: true,
    opacity: 0.85,
    version: '1.1.0',
    attribution: ""
  }).addTo(map);

  var wmsRivsBuff = L.tileLayer.wms("http://162.243.248.31:8080/geoserver/opengeo/wms", {
    layers: 'opengeo:rivers_buffer',
    format: 'image/png',
    transparent: true,
    opacity: 0.85,
    version: '1.1.0',
    attribution: ""
  }).addTo(map);

  var baseMaps = {
    "OSM": cloudmadeLayer,
    "Google": googleLayer
  };

  var overlayMaps = {
    "Landcover": wmsForestCover,
    "Last of the Wild": wmsLastWild,
    "Rivers": wmsRivers,
    "River buffers": wmsRivsBuff
  };

  L.control.layers(baseMaps, overlayMaps).addTo(map);

  View.bindTextarea(map);
  View.clearTextarea();

});

