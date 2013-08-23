var app = {
  // Application Constructor
  initialize: function() {
    this.lastId = 0;
    this.colorSchema = ["#DD1E2F", "#EBB035", "#06A2CB", "#218559", "#D0C6B1", "#D4E7ED", "#EB8540", "#B06A3B", "#AB988B"]
    this.bindEvents();
  },

  bindEvents: function() {
    document.addEventListener('deviceready', this.onDeviceReady, false);
    $(window).resize(function(){
      app.resizeTiles(130, 10);
    });
    $("#zero").on("click", this.zero);
    $("#clear").on("click", this.clear);
    $("#add").on("click", this.add);
  },

  onDeviceReady: function() {
    navigator.splashscreen.hide();
  },

  resizeTiles: function(minSize, borderSize) {
    var deviceWidth = $(".app").width();
    var ntiles = Math.floor(deviceWidth/(minSize + 2*borderSize));
    var tileWidth = deviceWidth / ntiles;
    $(".tile").css("width", tileWidth-(2*borderSize));
    $(".tile").css("height", tileWidth-(2*borderSize));
  },

  clear: function(e) {
    navigator.notification.confirm(
      'Are you sure?!',
       function(result) {
        if (result === 1) {
          app.lastId = 0;
          $(".app").html("");
        }
       },
      'Clear',
      'Yes, No'
    );
  },

  zero: function(e) {
    navigator.notification.confirm(
      'Are you sure?!',
       function(result) {
        if (result === 1) {
          $(".app").find("h1").html(0);
        }
       },
      'Zero',
      'Yes, No'
    );
  },


  add: function(e) {
    navigator.notification.prompt(
        "Please enter user's name",
        app.createTile,
        'Registration',
        ['Ok','Cancel'],
        'Player'
    );
  },

  createTile: function(result) {
    if (result.buttonIndex === 1) {
      app.lastId = app.lastId + 1;
      $(".app").prepend('<div class="tile" id="tile-' + app.lastId + '"><h1>0</h1><h2>' + result.input1 + '</h2></div>');
      var color = app.colorSchema[Math.floor(Math.random()*app.colorSchema.length)];
      $("#tile-" + app.lastId).css("background-color", color)

      var xorhandler = xorTap(app.scoreUp, app.scoreDown);
      var tile = $("#tile-" + app.lastId).get(0);
      tile.addEventListener(('ontouchend' in tile) ? 'touchend' : 'mouseup', doubleTap(300), false);
      tile.addEventListener('tap', xorhandler, false);

      $(window).trigger("resize")
    }
  },

  scoreUp: function(e) {
    var points = parseInt($(this).find("h1").html());
    $(this).find("h1").html(points + 1);
  },

  scoreDown: function(e) {
    var points = parseInt($(this).find("h1").html());
    $(this).find("h1").html(points - 1);
  },
};
