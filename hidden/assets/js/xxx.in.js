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
In.default();