var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    $(window).resize(function(){
      app.resizeTiles(130, 10);
    });
  },

  onDeviceReady: function() {
    $(window).trigger("resize")
  },

  resizeTiles: function(minSize, borderSize) {
    var deviceWidth = $(".app").width();
    var ntiles = Math.floor(deviceWidth/(minSize + 2*borderSize));
    var tileWidth = deviceWidth / ntiles;
    $(".tile").css("width", tileWidth-(2*borderSize));
    $(".tile").css("height", tileWidth-(2*borderSize));
  }
};
