<<<<<<< HEAD
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var breakpoint = 768;

$(window).on('load', function () {
  URL.default();
  Link.default();
  //Info.set();
});
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

// JSON

// JSON読み込み

var GetInfo = function () {
  function GetInfo(data) {
    _classCallCheck(this, GetInfo);

    // ニュースを吐き出す場所 loadingクラスに使用
    this.area = data.area || '';

    this.artist = data.artist;
    this.id = data.id;
    // json directory
    this.jsonDirectory = 'https://www.sonymusic.co.jp/json/v2/artist/';

    this.start = data.start || 0;
    this.count = data.count || 4;
    this.totalCount = 0;

    this.info = {
      path: '' + this.jsonDirectory + this.artist + '/information/start/',
      detailPath: '' + this.jsonDirectory + this.artist + '/information/',
      data: []
    };

    this.more = {
      btn: data.more.btn || undefined,
      count: data.more.count || undefined
    };

    this.get = data.get;
  }

  _createClass(GetInfo, [{
    key: 'Get',
    value: function Get() {
      var _this3 = this;

      this.Class('add');
      $.ajax({
        url: this.info.path + this.start + '/count/' + this.count,
        type: "GET",
        dataType: "jsonp",
        crossDomain: true,
        scriptCharset: "utf-8",
        jsonpCallback: "callback",
        complete: function complete(data) {
          var json = data.responseJSON;
          var items = json.items;
          _this3.totalCount = json.total_count;

          if (_this3.totalCount === 0) {
            _this3.None();
            return false;
          }

          // カウント数　> total_countの場合
          if (_this3.count > _this3.totalCount) {
            _this3.count = _this3.totalCount;
          }
          // カウント数 > 配列数の場合
          if (_this3.count != items.length) {
            _this3.count = items.length;
          }

          // ループ処理 dataに格納
          for (var i = 0; i < items.length; i++) {
            _this3.info.data.push({
              id: items[i].id, // id => 記事取得用
              date: items[i].date, // 日付
              title: items[i].title // タイトル
            });
          }

          if (_this3.start + _this3.count >= _this3.totalCount) {
            _this3.More('hide');
          }
          _this3.start = _this3.start + _this3.count;
          _this3.GetDetail(0);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {}
      });
    }
  }, {
    key: 'GetDetail',
    value: function GetDetail(count) {
      var _this4 = this;

      $.ajax({
        url: this.info.detailPath + this.info.data[count].id,
        type: "GET",
        dataType: "jsonp",
        crossDomain: true,
        scriptCharset: "utf-8",
        jsonpCallback: "callback",
        complete: function complete(data) {
          var response = data.responseJSON;
          _this4.info.data[count].article = response.article;
          count++;

          // JSONの配列数ループ処理
          if (_this4.info.data[count]) {
            _this4.GetDetail(count);
          } else {
            _this4.JsonLoaded();
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {}
      });
    }
    // loadingクラス付与

  }, {
    key: 'Class',
    value: function Class(p) {
      if (this.area !== '') {
        if (p === 'add') {
          $('.' + this.area).addClass('is-loading');
        }
        if (p === 'remove') {
          $('.' + this.area).removeClass('is-loading');
        }
      }
    }
    // Moreボタンの挙動

  }, {
    key: 'More',
    value: function More() {
      var _this5 = this;

      var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'defalt';

      $('.' + this.more.btn).on('click', function () {
        if (_this5.more.count !== undefined) {
          _this5.count = _this5.more.count;
        }
        _this5.Get();
      });
      if (p === 'hide') {
        $('.' + this.more.btn).hide();
      }
    }
  }, {
    key: 'None',
    value: function None() {
      // newsがない場合
      this.Class('remove');
      this.More('hide');
    }
  }, {
    key: 'JsonLoaded',
    value: function JsonLoaded() {
      // 動作の終了後に
      this.Class('remove');
      this.get(this.info.data, this.count);
    }
  }, {
    key: 'set',
    value: function set() {
      this.Get();
      if (this.more.btn !== undefined) {
        // Moreボタンの指定があれば
        this.More();
      }
    }
  }]);

  return GetInfo;
}();

var Info = new GetInfo({
  area: 'js-info',
  artist: _artistFolder,
  id: _artistId,
  start: 0,
  count: 3,
  more: {
    btn: ''
  },
  get: function get(data, count) {
    // dataにdate / title / articleを内包しています
    WriteInfo.set(data, count);
  }
});

// リストを書き出す
var WriteInfo = {
  conf: {
    wrap: 'js-info', // 埋め込む場所
    class: 'p-info__item', // liに付けるクラス
    customData: [{
      name: 'type',
      value: 'info'
    }],
    data: [],
    count: 0
  },
  List: function List(count) {
    var className = this.conf.class ? 'class="' + this.conf.class + '"' : '';
    var idName = this.conf.id ? 'id="' + this.conf.id + '"' : '';
    var dataName = '';
    for (var i = 0; i < this.conf.customData.length; i++) {
      dataName += 'data-' + this.conf.customData[i].name + '="' + this.conf.customData[i].value + '"';
    }

    var _html = '';
    for (var _i = this.conf.count; _i < this.conf.count + count; _i++) {
      _html += '<li ' + className + ' ' + idName + ' ' + dataName + '>';
      _html += '<div class="date">' + this.conf.data[_i].date.split('.')[0] + '.<br class="is-sp">' + this.conf.data[_i].date.split('.')[1] + '.' + this.conf.data[_i].date.split('.')[2] + '</div><div class="text">' + this.conf.data[_i].title + '</div>';
      _html += '<a href="./information/archive/?' + this.conf.data[_i].id + '"></a>';
      _html += '</li>';
    }
    $(_html).appendTo('.' + this.conf.wrap);
    this.conf.count = this.conf.count + count;
  },
  // 記事を書き出し => 今回はモーダルに
  ArticleAdd: function ArticleAdd(target, area) {
    var _html = '';
    var i = $(target).index('li.' + this.conf.class);
    _html += '<div class="head">';
    _html += '<time>' + this.conf.data[i].date.split('.')[0] + '.<br class="is-sp">' + this.conf.data[i].date.split('.')[1] + '.' + this.conf.data[i].date.split('.')[2] + '</time>';
    _html += '<p>' + this.conf.data[i].title + '</p>';
    _html += '</div>';
    _html += '<div class="text">' + this.conf.data[i].article + '</div>';
    $(_html).appendTo('.' + area);
  },
  ArticleRemove: function ArticleRemove(target, area) {
    $('.' + area).html('');
  },
  set: function set(data, count) {
    this.conf.data = data;
    this.List(count);
  }
=======
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var breakpoint = 768;

$(window).on('load', function () {
  URL.default();
  Link.default();
  //Info.set();
});
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

// JSON

// JSON読み込み

var GetInfo = function () {
  function GetInfo(data) {
    _classCallCheck(this, GetInfo);

    // ニュースを吐き出す場所 loadingクラスに使用
    this.area = data.area || '';

    this.artist = data.artist;
    this.id = data.id;
    // json directory
    this.jsonDirectory = 'https://www.sonymusic.co.jp/json/v2/artist/';

    this.start = data.start || 0;
    this.count = data.count || 4;
    this.totalCount = 0;

    this.info = {
      path: '' + this.jsonDirectory + this.artist + '/information/start/',
      detailPath: '' + this.jsonDirectory + this.artist + '/information/',
      data: []
    };

    this.more = {
      btn: data.more.btn || undefined,
      count: data.more.count || undefined
    };

    this.get = data.get;
  }

  _createClass(GetInfo, [{
    key: 'Get',
    value: function Get() {
      var _this3 = this;

      this.Class('add');
      $.ajax({
        url: this.info.path + this.start + '/count/' + this.count,
        type: "GET",
        dataType: "jsonp",
        crossDomain: true,
        scriptCharset: "utf-8",
        jsonpCallback: "callback",
        complete: function complete(data) {
          var json = data.responseJSON;
          var items = json.items;
          _this3.totalCount = json.total_count;

          if (_this3.totalCount === 0) {
            _this3.None();
            return false;
          }

          // カウント数　> total_countの場合
          if (_this3.count > _this3.totalCount) {
            _this3.count = _this3.totalCount;
          }
          // カウント数 > 配列数の場合
          if (_this3.count != items.length) {
            _this3.count = items.length;
          }

          // ループ処理 dataに格納
          for (var i = 0; i < items.length; i++) {
            _this3.info.data.push({
              id: items[i].id, // id => 記事取得用
              date: items[i].date, // 日付
              title: items[i].title // タイトル
            });
          }

          if (_this3.start + _this3.count >= _this3.totalCount) {
            _this3.More('hide');
          }
          _this3.start = _this3.start + _this3.count;
          _this3.GetDetail(0);
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {}
      });
    }
  }, {
    key: 'GetDetail',
    value: function GetDetail(count) {
      var _this4 = this;

      $.ajax({
        url: this.info.detailPath + this.info.data[count].id,
        type: "GET",
        dataType: "jsonp",
        crossDomain: true,
        scriptCharset: "utf-8",
        jsonpCallback: "callback",
        complete: function complete(data) {
          var response = data.responseJSON;
          _this4.info.data[count].article = response.article;
          count++;

          // JSONの配列数ループ処理
          if (_this4.info.data[count]) {
            _this4.GetDetail(count);
          } else {
            _this4.JsonLoaded();
          }
        },
        error: function error(XMLHttpRequest, textStatus, errorThrown) {}
      });
    }
    // loadingクラス付与

  }, {
    key: 'Class',
    value: function Class(p) {
      if (this.area !== '') {
        if (p === 'add') {
          $('.' + this.area).addClass('is-loading');
        }
        if (p === 'remove') {
          $('.' + this.area).removeClass('is-loading');
        }
      }
    }
    // Moreボタンの挙動

  }, {
    key: 'More',
    value: function More() {
      var _this5 = this;

      var p = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'defalt';

      $('.' + this.more.btn).on('click', function () {
        if (_this5.more.count !== undefined) {
          _this5.count = _this5.more.count;
        }
        _this5.Get();
      });
      if (p === 'hide') {
        $('.' + this.more.btn).hide();
      }
    }
  }, {
    key: 'None',
    value: function None() {
      // newsがない場合
      this.Class('remove');
      this.More('hide');
    }
  }, {
    key: 'JsonLoaded',
    value: function JsonLoaded() {
      // 動作の終了後に
      this.Class('remove');
      this.get(this.info.data, this.count);
    }
  }, {
    key: 'set',
    value: function set() {
      this.Get();
      if (this.more.btn !== undefined) {
        // Moreボタンの指定があれば
        this.More();
      }
    }
  }]);

  return GetInfo;
}();

var Info = new GetInfo({
  area: 'js-info',
  artist: _artistFolder,
  id: _artistId,
  start: 0,
  count: 3,
  more: {
    btn: ''
  },
  get: function get(data, count) {
    // dataにdate / title / articleを内包しています
    WriteInfo.set(data, count);
  }
});

// リストを書き出す
var WriteInfo = {
  conf: {
    wrap: 'js-info', // 埋め込む場所
    class: 'p-info__item', // liに付けるクラス
    customData: [{
      name: 'type',
      value: 'info'
    }],
    data: [],
    count: 0
  },
  List: function List(count) {
    var className = this.conf.class ? 'class="' + this.conf.class + '"' : '';
    var idName = this.conf.id ? 'id="' + this.conf.id + '"' : '';
    var dataName = '';
    for (var i = 0; i < this.conf.customData.length; i++) {
      dataName += 'data-' + this.conf.customData[i].name + '="' + this.conf.customData[i].value + '"';
    }

    var _html = '';
    for (var _i = this.conf.count; _i < this.conf.count + count; _i++) {
      _html += '<li ' + className + ' ' + idName + ' ' + dataName + '>';
      _html += '<div class="date">' + this.conf.data[_i].date.split('.')[0] + '.<br class="is-sp">' + this.conf.data[_i].date.split('.')[1] + '.' + this.conf.data[_i].date.split('.')[2] + '</div><div class="text">' + this.conf.data[_i].title + '</div>';
      _html += '<a href="./information/archive/?' + this.conf.data[_i].id + '"></a>';
      _html += '</li>';
    }
    $(_html).appendTo('.' + this.conf.wrap);
    this.conf.count = this.conf.count + count;
  },
  // 記事を書き出し => 今回はモーダルに
  ArticleAdd: function ArticleAdd(target, area) {
    var _html = '';
    var i = $(target).index('li.' + this.conf.class);
    _html += '<div class="head">';
    _html += '<time>' + this.conf.data[i].date.split('.')[0] + '.<br class="is-sp">' + this.conf.data[i].date.split('.')[1] + '.' + this.conf.data[i].date.split('.')[2] + '</time>';
    _html += '<p>' + this.conf.data[i].title + '</p>';
    _html += '</div>';
    _html += '<div class="text">' + this.conf.data[i].article + '</div>';
    $(_html).appendTo('.' + area);
  },
  ArticleRemove: function ArticleRemove(target, area) {
    $('.' + area).html('');
  },
  set: function set(data, count) {
    this.conf.data = data;
    this.List(count);
  }
>>>>>>> 7d6d769e7d4d6c28d5b4cdd0122f1a22687c4a56
};