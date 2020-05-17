(function ($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function () {
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

  //Sound button function
  $('#sound-link').click(function () {
    //if sound is mute
    if ($('#home-video')[0].muted) {
      $('#home-video')[0].muted = false; //unmute
      //Change the logo in the navbar
      $(this).children().removeClass('fa-volume-up');
      $(this).children().addClass('fa-volume-mute');
    } else {
      $('#home-video')[0].muted = true;
      $(this).children().removeClass('fa-volume-mute');
      $(this).children().addClass('fa-volume-up')
    }
  })

  // Closes responsive menu when a scroll trigger link is clicked
  /*   $('.js-scroll-trigger').click(function() {
      $('.navbar-collapse').collapse('hide');
    });
   */
  // Activate scrollspy to add active class to navbar items on scroll
  /*  $('body').scrollspy({
   target: '#mainNav',
   offset: 75
 });
  */

  // Collapse now if page is not at top
  //  navbarCollapse();
  // Collapse the navbar when page is scrolled
  //$(window).scroll(navbarCollapse);

  // Collapse Navbar
  // var navbarCollapse = function() {
  //   if ($("#mainNav").offset().top > 100) {
  //     $("#mainNav").addClass("navbar-scrolled");
  //   } else {
  //     $("#mainNav").slideDown("slow");
  //   }
  // };



  var position = $(window).scrollTop();
  // should start at 0

  //Masque la navbar lors du scroll
  $(window).scroll(function () {
    var scroll = $(window).scrollTop();//Position actuelle
    var triggerTop = 100; //Interval haut
    var triggerDown = 30; // Interval bas


    if (scroll > (position + triggerDown)) {
      // Si scroll vers le bas
      $("#mainNav").children().fadeOut("fast", function () {
        $("#mainNav").slideUp("fast");
      });
      position = scroll;
    } else if (scroll < (position - triggerTop)) {
      //Scroll vers le haut
      $("#mainNav").slideDown("fast", function () {
        $("#mainNav").children().fadeIn("fast");
      });
      position = scroll;
    }
  });

  //carousel initialisation
  $('#carouselVideo').carousel({
    interval: false,
  });

  //handle click on carousel next and prev button
  jQuery(document).ready(function ($) {
    $(".carouselButton").on("click", function (e) {
      $('#carouselVideo').carousel($(this).data('dir'));
    });

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


  
  function startProcessing () {
    $('#form-submit').prop("disabled",true);
    $('#form-spiner').removeClass('invisible');
  }
  
  function stopProcessing(statusCode) {
    $('#form-submit').prop("disabled",false);
    $('#form-spiner').addClass('invisible');
    $('#form-submit').addClass('error');
   
    removeErrors();
    $('#submit-container').append("<p id='formMsg' class='error-msg'>Une erreur est survenue durant l'envois de votre message" + (statusCode ? "(" + statusCode + ")" : "") + "</p>");

  }
  function finishProcessing () {
    removeErrors();
    $('#form-submit').addClass('sended');
    $("#form-submit").html('Message envoyé <i class="fas fa-check"></i>')
  }
  function removeErrors() {
    if (typeof $('#formMsg') != 'undefined') {
      $('#formMsg').remove();
    }
  }

  //Form submit
  $("#contact-form").submit(function (e) {
    startProcessing();
    e.preventDefault();
    var data = $(this).serialize();

    //var RecaptachaSiteKey = '6LdqRPYUAAAAAEdw6XFIgCAGmc1tax6yWukytB3E';//Dev
    var RecaptachaSiteKey = '6LcNuvYUAAAAAA7hFE4nV3JpDfaWpTUwtCectBBH'; //Prod

    grecaptcha.execute(RecaptachaSiteKey, { action: 'contact' })
      .then(function (token) {
        data += '&recaptcha_response=' + token;
        $.post('contact.php', data)
          .done(function (response) {
            finishProcessing();
          }) 
          .fail(function (response) {
            stopProcessing(response.status);
          });
      })
  })

})(jQuery); // End of use strict


(function ($) {



})(jQuery);