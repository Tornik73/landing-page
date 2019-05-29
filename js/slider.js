$(document).ready(function(){
  
    $('.right-arrow').click(function(){
      var currentImage = $('.cetate.curry');
      var currentImageIndex = $('.cetate.curry').index();
      var nextImageIndex = currentImageIndex + 1;
      var nextImage = $('.cetate').eq(nextImageIndex);
      currentImage.fadeOut(1000);
      currentImage.removeClass('curry');
        
        if(nextImageIndex == ($('.cetate:last').index()+1)){
            $('.cetate').eq(0).fadeIn(1000);
            $('.cetate').eq(0).addClass('curry');
        }else{
            nextImage.fadeIn(1000);
                nextImage.addClass('curry');
            
        }
    });
    
    $('.left-arrow').click(function(){
      var currentImage = $('.cetate.curry');
      var currentImageIndex = $('.cetate.curry').index();
      var prevImageIndex = currentImageIndex - 1;
      var prevImage = $('.cetate').eq(prevImageIndex);
        
        currentImage.fadeOut(1000);
        currentImage.removeClass('curry');
        prevImage.fadeIn(1000);
        prevImage.addClass('curry');
    });
});