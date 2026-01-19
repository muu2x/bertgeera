
$(function() {
  scrollTo(0, 1);
  function scrollTo(postop, speed) {
    $('body, html').animate({ scrollTop: postop }, speed, 'easeOutSine');
  }
  $('.pagetop').on('click', function(event) {
    event.preventDefault();
    $('html,body').animate({ scrollTop: 0 }, 800, 'easeOutSine');
  });
});

$(window).on('load',function(){
  $('.wrapper').animate({'opacity':1},{duration:1500});
  $('.lookbook__lineup').masonry({
    itemSelector: '.lookbook__lineup-img',
    isFitWidth: false,
    columnWidth: '.lookbook__lineup-img',
    percentPosition: true,
    fitWidth: true
  });

  $('.lookbook__lineup').addClass('active');
});

$(window).on('load', function() {
  setTimeout(function() {
    window.scrollTo(0, 0);
  }, 100);
});

var id = 'id',
  img = 'img';
var mySwiper = '';

$(function() {
  $('.lookbook__lineup li').on('click', function() {
    var thisId = $(this).data(id);
    var lineUp = $('.lookbook__lineup li');
    for (var i = 0; i < lineUp.length; i++) {
      var castTotal = lineUp.length;
      var _html = '';
      _html += '<li data-id="' + lineUp.eq(i).data(id) + '" class="swiper-slide">';
      _html += '<div class="detail_img"><img src="' + lineUp.eq(i).data(img) +'"></div>';
      _html += '</li>';
      $('.swiper-wrapper').append(_html);
    }

    $('.modal,.modalBg').fadeIn();
    if (mySwiper != '') {
      $('.swiper-container').each(function() {
        this.swiper.destroy(true, true);
      });
      mySwiper = new Swiper('.swiper-container', {
        initialSlide: thisId - 1,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        centeredSlides: true,
        autoHeight: true,
        loop: true
      });
    } else {
      mySwiper = new Swiper('.swiper-container', {
        initialSlide: thisId - 1,
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        centeredSlides: true,
        autoHeight: true,
        loop: true
      });
    }
    modalResize();
  });

  $('.modalBg,.btn_close').on('click', function() {
    $('html,body').css({ overflow: '' });
    $('.modal,.modalBg').fadeOut();
    $('.swiper-wrapper').empty();
  });
});

function modalResize() {
  var w = $('body').width();
  var winW = $(window).width();
  var h = $(window).height();
  var doc_h = $(document).height();
  var docH = $(document).height();
  var cw = $('.modal').innerWidth();
  var ch = $('.modal').innerHeight();
  var scTop = $(window).scrollTop();
  var current_scrollY;
  $('.modal').css({
    left: (w - cw) / 2 + 'px',
    top: scTop + 50
  });
}
