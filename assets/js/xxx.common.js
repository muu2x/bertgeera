<<<<<<< HEAD
'use strict';

$(document).ready(function () {
  Header.default();
  Footer.default();
});

$(window).on('load', function () {
  $('.js-wrap').addClass('is-load');

  Scroll.default();
  Fall.default();
  Nav.default();
  Glitch.default();
});

if (/\/discography\/archive\//.test(location.pathname)) {
  var timer = setInterval(function () {
    if ($('#discDetail div').length) {
      // $('.listen_wrap #listen_title_wrap').css({'width': 979 - (45 * 3)});
      clearInterval(timer);

      var thumbSrc = $('#main_jacket img').attr('src');
      $('#main_jacket img').attr('src', thumbSrc.replace(/__.*_0/g, '__750_750_0'));
    }
  }, 3);
}

var Header = {
  conf: {
    elem: '.js-header',
    path: [null, './assets/inc/header.html', '../assets/inc/header_in.html', '../../assets/inc/header_into.html']
  },
  state: {
    layer: 0
  },
  include: function include() {
    this.state.layer = $(this.conf.elem).attr('data-layer');
    $(this.conf.elem).load(this.conf.path[this.state.layer]);
  },
  default: function _default() {
    this.include();
  }
};

var Footer = {
  conf: {
    elem: '.js-footer',
    path: [null, './assets/inc/footer.html', '../assets/inc/footer.html', '../../assets/inc/footer.html']
  },
  state: {
    layer: 0
  },
  include: function include() {
    this.state.layer = $(this.conf.elem).attr('data-layer');
    $(this.conf.elem).load(this.conf.path[this.state.layer]);
  },
  default: function _default() {
    this.include();
  }
};

var Scroll = { // スクロールアニメーション
  conf: {
    elem: '[data-scroll]'
  },
  data: function data(e) {
    var dataScroll = e.attr('data-scroll');
    var destination = '#' + dataScroll;
    if (dataScroll === 'top') {
      destination = 'body';
    }
    var scrollHeight = $(destination).offset().top;
    this.scroll(scrollHeight);
  },
  hash: function hash(e) {
    var href = $(e).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top;
    this.scroll(position);
  },
  scroll: function scroll(position) {
    $('html,body').animate({
      scrollTop: position
    }, 950, 'easeOutQuad');
  },
  click: function click() {
    var _this = this;

    $(this.conf.elem).on('click', function (e) {
      _this.data($(e.currentTarget));
    });
    $('a[href^="#"]').on('click', function (e) {
      _this.hash(e.currentTarget);
    });
  },
  default: function _default() {
    this.click();
  }
};

var Nav = {
  conf: {
    elem: '.js-nav',
    open: '.js-nav__open',
    close: '.js-nav__close',
    btn: '.js-nav__btn'
  },
  fade: function fade() {
    $(this.conf.elem).fadeToggle(600);
  },
  click: function click() {
    var _this2 = this;

    $('.js-header').on('click', this.conf.btn, function () {
      $(_this2.conf.elem).toggleClass('is-open');
      $(_this2.conf.btn).toggleClass('is-open');
    });
    $('.js-header').on('click', this.conf.close, function () {
      $(_this2.conf.elem).removeClass('is-open');
      $(_this2.conf.btn).removeClass('is-open');
    });
  },
  default: function _default() {
    this.click();
  }
};

var Glitch = {
  elem: '.js-glitch',
  class: 'u-glitch-in',
  act: function act() {
    var _this3 = this;

    $(this.elem).each(function (index, e) {
      var src = void 0;
      var html = void 0;
      src = $(e).children('img').attr('src');
      html = '<span class="' + _this3.class + '__layer"><img src="' + src + '" alt=""></span>';
      $(e).prepend(html);
    });
  },
  default: function _default() {
    this.act();
  }
};

var Fall = {
  conf: {
    elem: '.js-fall',
    data: ['r', 'b', 'y', 'ebi'],
    item: {
      length: []
    },
    timing: 20,
    randam: {
      max: 90,
      min: 10
    }
  },
  timeout: {
    animation: []
  },
  init: function init() {
    for (var i = 0; i < this.conf.data.length; i++) {
      this.conf.item.length.push($(this.conf.elem + '[data-fall="' + this.conf.data[i] + '"]').find('li').length);
    }
  },
  start: function start() {
    var _this4 = this;

    for (var i = 0; i < this.conf.data.length; i++) {
      clearTimeout(this.timeout.animation[i]);
      var timing = this.conf.timing * 1000;
      this.random(i);
      this.timeout.animation[i] = setTimeout(function () {
        _this4.start();
      }, timing);
    }
  },
  random: function random(data) {
    Ebi.state = false;
    if (data === 3) {
      Ebi.state = true;
    }
    for (var i = 0; i < this.conf.item.length.length; i++) {
      var num = Math.floor(Math.random() * (this.conf.randam.max + 1 - this.conf.randam.min)) + this.conf.randam.min;
      this.set(data, num, i);
    }
  },
  set: function set(data, pos, index) {
    var ebi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    $(this.conf.elem + '[data-fall="' + this.conf.data[data] + '"]').find('li').eq(index).css({ top: pos + '%' });
    if (Ebi.state) {
      Ebi.set(data, pos, index);
    }
  },
  default: function _default() {
    this.init();
    this.start();
  }
};

var Ebi = {
  state: false,
  set: function set(data, pos, index) {
    $(Fall.conf.elem + '[data-fall="' + Fall.conf.data[data] + '"]').find('li').eq(index).attr('data-ebi', Math.floor(Math.random() * 100) + 1);
  }
=======
'use strict';

$(document).ready(function () {
  Header.default();
  Footer.default();
});

$(window).on('load', function () {
  $('.js-wrap').addClass('is-load');

  Scroll.default();
  Fall.default();
  Nav.default();
  Glitch.default();
});

if (/\/discography\/archive\//.test(location.pathname)) {
  var timer = setInterval(function () {
    if ($('#discDetail div').length) {
      // $('.listen_wrap #listen_title_wrap').css({'width': 979 - (45 * 3)});
      clearInterval(timer);

      var thumbSrc = $('#main_jacket img').attr('src');
      $('#main_jacket img').attr('src', thumbSrc.replace(/__.*_0/g, '__750_750_0'));
    }
  }, 3);
}

var Header = {
  conf: {
    elem: '.js-header',
    path: [null, './assets/inc/header.html', '../assets/inc/header_in.html', '../../assets/inc/header_into.html']
  },
  state: {
    layer: 0
  },
  include: function include() {
    this.state.layer = $(this.conf.elem).attr('data-layer');
    $(this.conf.elem).load(this.conf.path[this.state.layer]);
  },
  default: function _default() {
    this.include();
  }
};

var Footer = {
  conf: {
    elem: '.js-footer',
    path: [null, './assets/inc/footer.html', '../assets/inc/footer.html', '../../assets/inc/footer.html']
  },
  state: {
    layer: 0
  },
  include: function include() {
    this.state.layer = $(this.conf.elem).attr('data-layer');
    $(this.conf.elem).load(this.conf.path[this.state.layer]);
  },
  default: function _default() {
    this.include();
  }
};

var Scroll = { // スクロールアニメーション
  conf: {
    elem: '[data-scroll]'
  },
  data: function data(e) {
    var dataScroll = e.attr('data-scroll');
    var destination = '#' + dataScroll;
    if (dataScroll === 'top') {
      destination = 'body';
    }
    var scrollHeight = $(destination).offset().top;
    this.scroll(scrollHeight);
  },
  hash: function hash(e) {
    var href = $(e).attr('href');
    var target = $(href == '#' || href == '' ? 'html' : href);
    var position = target.offset().top;
    this.scroll(position);
  },
  scroll: function scroll(position) {
    $('html,body').animate({
      scrollTop: position
    }, 950, 'easeOutQuad');
  },
  click: function click() {
    var _this = this;

    $(this.conf.elem).on('click', function (e) {
      _this.data($(e.currentTarget));
    });
    $('a[href^="#"]').on('click', function (e) {
      _this.hash(e.currentTarget);
    });
  },
  default: function _default() {
    this.click();
  }
};

var Nav = {
  conf: {
    elem: '.js-nav',
    open: '.js-nav__open',
    close: '.js-nav__close',
    btn: '.js-nav__btn'
  },
  fade: function fade() {
    $(this.conf.elem).fadeToggle(600);
  },
  click: function click() {
    var _this2 = this;

    $('.js-header').on('click', this.conf.btn, function () {
      $(_this2.conf.elem).toggleClass('is-open');
      $(_this2.conf.btn).toggleClass('is-open');
    });
    $('.js-header').on('click', this.conf.close, function () {
      $(_this2.conf.elem).removeClass('is-open');
      $(_this2.conf.btn).removeClass('is-open');
    });
  },
  default: function _default() {
    this.click();
  }
};

var Glitch = {
  elem: '.js-glitch',
  class: 'u-glitch-in',
  act: function act() {
    var _this3 = this;

    $(this.elem).each(function (index, e) {
      var src = void 0;
      var html = void 0;
      src = $(e).children('img').attr('src');
      html = '<span class="' + _this3.class + '__layer"><img src="' + src + '" alt=""></span>';
      $(e).prepend(html);
    });
  },
  default: function _default() {
    this.act();
  }
};

var Fall = {
  conf: {
    elem: '.js-fall',
    data: ['r', 'b', 'y', 'ebi'],
    item: {
      length: []
    },
    timing: 20,
    randam: {
      max: 90,
      min: 10
    }
  },
  timeout: {
    animation: []
  },
  init: function init() {
    for (var i = 0; i < this.conf.data.length; i++) {
      this.conf.item.length.push($(this.conf.elem + '[data-fall="' + this.conf.data[i] + '"]').find('li').length);
    }
  },
  start: function start() {
    var _this4 = this;

    for (var i = 0; i < this.conf.data.length; i++) {
      clearTimeout(this.timeout.animation[i]);
      var timing = this.conf.timing * 1000;
      this.random(i);
      this.timeout.animation[i] = setTimeout(function () {
        _this4.start();
      }, timing);
    }
  },
  random: function random(data) {
    Ebi.state = false;
    if (data === 3) {
      Ebi.state = true;
    }
    for (var i = 0; i < this.conf.item.length.length; i++) {
      var num = Math.floor(Math.random() * (this.conf.randam.max + 1 - this.conf.randam.min)) + this.conf.randam.min;
      this.set(data, num, i);
    }
  },
  set: function set(data, pos, index) {
    var ebi = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;

    $(this.conf.elem + '[data-fall="' + this.conf.data[data] + '"]').find('li').eq(index).css({ top: pos + '%' });
    if (Ebi.state) {
      Ebi.set(data, pos, index);
    }
  },
  default: function _default() {
    this.init();
    this.start();
  }
};

var Ebi = {
  state: false,
  set: function set(data, pos, index) {
    $(Fall.conf.elem + '[data-fall="' + Fall.conf.data[data] + '"]').find('li').eq(index).attr('data-ebi', Math.floor(Math.random() * 100) + 1);
  }
>>>>>>> 7d6d769e7d4d6c28d5b4cdd0122f1a22687c4a56
};