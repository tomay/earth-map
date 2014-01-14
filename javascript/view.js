$(function(){

  $("#container").hover(function () {
    $("#container").animate({
          height: "330px"
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

});