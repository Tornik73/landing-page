$(document).ready(function () {
  let timer = 5000;
  $('.right-arrow').click(function () {
    var currentImage = $('.cetate.curry');
    var currentImageIndex = $('.cetate.curry').index();
    var nextImageIndex = currentImageIndex + 1;
    var nextImage = $('.cetate').eq(nextImageIndex);
    currentImage.fadeOut(1000);
    currentImage.removeClass('curry');

    if (nextImageIndex == ($('.cetate:last').index() + 1)) {
      $('.cetate').eq(0).fadeIn(1000);
      $('.cetate').eq(0).addClass('curry');
    } else {
      nextImage.fadeIn(1000);
      nextImage.addClass('curry');

    }
    timer = 20000;
  });

  $('.left-arrow').click(function () {
    var currentImage = $('.cetate.curry');
    var currentImageIndex = $('.cetate.curry').index();
    var prevImageIndex = currentImageIndex - 1;
    var prevImage = $('.cetate').eq(prevImageIndex);

    currentImage.fadeOut(1000);
    currentImage.removeClass('curry');
    prevImage.fadeIn(1000);
    prevImage.addClass('curry');
    timer = 20000;
  });
  setInterval(function () {
    var currentImage = $('.cetate.curry');
    var currentImageIndex = $('.cetate.curry').index();
    var prevImageIndex = currentImageIndex - 1;
    var prevImage = $('.cetate').eq(prevImageIndex);

    currentImage.fadeOut(1000);
    currentImage.removeClass('curry');
    prevImage.fadeIn(1000);
    prevImage.addClass('curry');
    timer = 5000;
  }, timer);
});