
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


$(window).on('load', function() {
  $('.wrapper').animate({'opacity': 1}, {duration: 1500});

  var $grid = $('.lookbook__lineup').masonry({
    itemSelector: '.lookbook__lineup-img',
    percentPosition: true,
    columnWidth: '.lookbook__lineup-img',
    //gutter: 10,
    transitionDuration: '0.4s'
  });

  $grid.masonry('layout');

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
    var clickedIndex = $(this).index(); 
    var lineUp = $('.lookbook__lineup li'); 
    $('.swiper-wrapper').empty(); 
    
    for (var i = 0; i < lineUp.length; i++) {
      var currentItem = lineUp.eq(i);
      var photoText = currentItem.find('.photo-caption').text(); 
      
      var _html = '';
      _html += '<li class="swiper-slide">'; 
      _html +=   '<div class="detail_img">';
      _html +=     '<img src="' + currentItem.data('img') + '">';
      _html +=     '<div class="modal-caption">' + photoText + '</div>'; 
      _html +=   '</div>';
      _html += '</li>';
      
      $('.swiper-wrapper').append(_html);
    }
    $('.modal,.modalBg').fadeIn();


    if (mySwiper != '') {
      mySwiper.destroy(true, true);
    }

    mySwiper = new Swiper('.swiper-container', {
      initialSlide: clickedIndex, 
      navigation: {
          nextEl: '.btn_next',
          prevEl: '.btn_prev',
      },
      nextButton: '.btn_next',
      prevButton: '.btn_prev',
  
      centeredSlides: true,
      spaceBetween: 1000,
      autoHeight: true,
      slidesPerView: 'auto',
      loop: false,
      observer: true,
      observeParents: true,
      on: {
        imagesReady: function () {
            this.update();   
            modalResize();  
        },
        slideChangeTransitionEnd: function() {
            modalResize();  
        }
    }
  });

    modalResize();
  });


  $('.modalBg,.btn_close').on('click', function() {
    $('html,body').css({ overflow: '' });
    $('.modal,.modalBg').fadeOut();
    $('.swiper-wrapper').empty();
  });
});

function modalResize() {
  var scTop = $(window).scrollTop();
  $('.modal').css({
    'position': 'absolute',
    'top': (scTop + 40) + 'px',
    'left': '50%',
    'transform': 'translateX(-50%)',
    'width': 'auto',
    'display': 'block' 
  });
  
  if (mySwiper) {
    mySwiper.update();
  }
}
