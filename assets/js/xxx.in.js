<<<<<<< HEAD
'use strict';

$(window).on('load', function () {});

(function () {
  setTimeout(function () {
    $('.js-wrap').addClass('is-in');
  }, 100);
})();

var In = {
  conf: {
    elem: '.js-in'
  },
  set: function set() {
    var setHeight = $(window).innerHeight() * .8;
    $(this.conf.elem).css({ 'min-height': setHeight });
  },
  resize: function resize() {
    var _this = this;

    $(window).on('resize', function () {
      _this.set();
    });
  },
  default: function _default() {
    this.set();
    this.resize();
  }
};
=======
'use strict';

$(window).on('load', function () {});

(function () {
  setTimeout(function () {
    $('.js-wrap').addClass('is-in');
  }, 100);
})();

var In = {
  conf: {
    elem: '.js-in'
  },
  set: function set() {
    var setHeight = $(window).innerHeight() * .8;
    $(this.conf.elem).css({ 'min-height': setHeight });
  },
  resize: function resize() {
    var _this = this;

    $(window).on('resize', function () {
      _this.set();
    });
  },
  default: function _default() {
    this.set();
    this.resize();
  }
};
>>>>>>> 7d6d769e7d4d6c28d5b4cdd0122f1a22687c4a56
In.default();