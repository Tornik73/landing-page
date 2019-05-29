 $(document).ready(function () {
     $(".LocateOnMap-title").on("click", "a", function (event) {
         event.preventDefault();
         var id = $(this).attr('href'),
             top = $(id).offset().top;
         $('body,html').animate({
             scrollTop: top
         }, 1500);
     });
 });
 $(document).ready(function () {
     $(".right-arrow").on("click", "a", function (event) {
         event.preventDefault();
         var id = $(this).attr('href'),
             top = $(id).offset().top;
         $('body,html').animate({
             scrollTop: top
         }, 1500);
     });
 });
 $(document).ready(function () {
     $(".left-arrow").on("click", "a", function (event) {
         event.preventDefault();
         var id = $(this).attr('href'),
             top = $(id).offset().top;
         $('body,html').animate({
             scrollTop: top
         }, 1500);
     });
 });