(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      if (target.length) {
        $('html, body').animate({
          scrollTop: (target.offset().top - 72)
        }, 1000, "easeInOutExpo");
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  //$('.js-scroll-trigger').click(function() {
  //  $('.navbar-collapse').collapse('hide');
  //});

  // Activate scrollspy to add active class to navbar items on scroll
  // $('body').scrollspy({
  //   target: '#mainNav',
  //   offset: 75
  // });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").slideDown("slow");
    }
  };

  // Collapse now if page is not at top
//  navbarCollapse();
  // Collapse the navbar when page is scrolled
  //$(window).scroll(navbarCollapse);


  let position = $(window).scrollTop(); 
  // should start at 0

  //Masque la navbar lors du scroll
  $(window).scroll(function() {
      const scroll      = $(window).scrollTop();//Position actuelle
      const triggerTop  = 100; //Interval haut
      const triggerDown = 30; // Interval bas

       
      if(scroll > (position + triggerDown)) {
      // Si scroll vers le bas
          $("#mainNav").children().fadeOut( "fast", function() {
            $("#mainNav").slideUp("fast");
          });
          position = scroll;
      } else if (scroll < (position - triggerTop)) { 
        //Scroll vers le haut
          $("#mainNav").slideDown("fast", function() {
            $("#mainNav").children().fadeIn("fast");
          });
          position = scroll;
      } 
  });

  // Magnific popup calls
  $('#portfolio').magnificPopup({
    delegate: 'a',
    type: 'image',
    tLoading: 'Loading image #%curr%...',
    mainClass: 'mfp-img-mobile',
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });

})(jQuery); // End of use strict
