'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var breakpoint = 768;

$(window).on('load', function () {
  URL.default();
  Link.default();
  if (linkSlider) {
    linkSlider.update();
  }
});
  //Info.set();
var ScrollEffect = void 0;
var scrollLoad = {
  set: function set() {
    ScrollEffect = new SCROLL_EFFECT_MODULE({
      elem: '.js-scroll-item',
      displayRatio: 0.8,
      // displayReverse: true,
      addClassNameActive: 'is-active'
    });
  },
  scroll: function scroll() {
    $(window).on('scroll', function () {
      var pos = $(window).scrollTop() + $(window).innerHeight();
      if (pos === $(document).innerHeight()) {
        $('.js-scroll-item').addClass('is-active');
      }
    });
  },
  default: function _default() {
    this.set();
    this.scroll();
  }
};

var URL = {
  state: {
    param: undefined,
    location: undefined
  },
  get: function get() {
    this.state.param = $(location).attr('search');
    this.state.location = $(location)[0].href;

    var url = this.state.location.replace(/\?.*$/, "");
    history.replaceState('', '', url);
  },
  set: function set() {
    if (this.state.param === '?top') {
      $('.js-wrap').addClass('is-done');
    } else {
      $('.js-layer').hide();
    }
  },
  default: function _default() {
    this.get();
    this.set();
  }
};

var Load = {
  class: '.js-wrap',
  state: {
    width: 0,
    height: 0
  },
  reset: function reset() {
    $(this.class).css({
      'width': '100%',
      'height': 'auto'
    });
    scrollLoad.scroll();
  },
  set: function set() {
    var _this = this;

    this.state.width = $(window).innerWidth();
    this.state.height = $(window).innerHeight();

    $(this.class).css({
      'width': this.state.width,
      'height': this.state.height
    });
    scrollLoad.set();
    setTimeout(function () {
      _this.reset();
    }, 1000);
  },
  default: function _default() {
    this.set();
  }
};
Load.default();

var Hero = {
  class: '.js-hero',
  state: {
    width: 0,
    height: 0
  },
  set: function set() {

    this.state.width = $(window).innerWidth();
    this.state.height = $(window).innerHeight();

    $(this.class).css({
      'width': this.state.width,
      'height': this.state.height
    });
  },
  resize: function resize() {
    var _this2 = this;

    $(window).on('resize', function () {
      _this2.set();
    });
  },
  default: function _default() {
    this.set();
    this.resize();
  }
};
Hero.default();

var linkSlider = void 0;
var Link = {
  elem: '.js-link-slider',
  slider: {
    props: {
      init: false,
      speed: 800,
      direction: 'horizontal',
      setWrapperSize: true,
      spaceBetween: 10,
      slidesPerView: 2,
      loop: true,
      breakpointsInverse: true,
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev'
      },
      breakpoints: {
        750: {
          slidesPerView: 3,
          spaceBetween: 24
        }
      }
    }
  },
  state: {
    init: false,
    length: 0
  },
  get: function get() {
    this.state.length = $(this.elem).find(this.elem + '__slide').length;
    if ($(window).innerWidth() > breakpoint) {
      if (this.state.length === 2) {
        $('.js-slide').css({ 'width': 620 });
        this.slider.props.breakpoints['750'].slidesPerView = 2;
      }
    }
  },
  set: function set() {
    if (this.state.length > 1) {
      linkSlider = new Swiper(this.elem, this.slider.props);
      linkSlider.init();
    } else {
      $('.js-slide__btn').hide();
    }
  },
  resize: function resize() {
    $(window).on('resize', function () {});
  },
  default: function _default() {
    this.get();
    this.set();
    this.resize();
  }
};
