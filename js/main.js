jQuery(document).ready(function ($) {
  var endDate = new Date(`Fri, 9 Apr 2021 12:30:00 GMT`).getTime() / 1000;
  var startDate = new Date(2021, 3, 1).getTime() / 1000;
  var nowDate = new Date().getTime() / 1000;

  nowDate = Math.min(nowDate, endDate);
  console.log(endDate, startDate, nowDate);
  $(".countdown").final_countdown(
    {
      start: startDate,
      end: endDate,
      now: nowDate,
      selectors: {
        value_seconds: ".clock-seconds .val",
        canvas_seconds: "canvas_seconds",
        value_minutes: ".clock-minutes .val",
        canvas_minutes: "canvas_minutes",
        value_hours: ".clock-hours .val",
        canvas_hours: "canvas_hours",
        value_days: ".clock-days .val",
        canvas_days: "canvas_days",
      },
      seconds: {
        borderColor: "#7995D5",
        borderWidth: "6",
      },
      minutes: {
        borderColor: "#ACC742",
        borderWidth: "6",
      },
      hours: {
        borderColor: "#ECEFCB",
        borderWidth: "6",
      },
      days: {
        borderColor: "#FF9900",
        borderWidth: "6",
      },
    },
    function () {
      // Finish callback
      console.log("Called countdown");
    }
  );
  // Back to top button
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $(".back-to-top").fadeIn("slow");
    } else {
      $(".back-to-top").fadeOut("slow");
    }
  });
  $(".back-to-top").click(function () {
    $("html, body").animate({ scrollTop: 0 }, 1500, "easeInOutExpo");
    return false;
  });

  // Header fixed on scroll
  $(window).scroll(function () {
    if ($(this).scrollTop() > 100) {
      $("#header").addClass("header-scrolled");
    } else {
      $("#header").removeClass("header-scrolled");
    }
  });

  if ($(window).scrollTop() > 100) {
    $("#header").addClass("header-scrolled");
  }

  // Real view height for mobile devices
  if (window.matchMedia("(max-width: 767px)").matches) {
    $("#intro").css({ height: $(window).height() });
  }

  // Initiate the wowjs animation library
  new WOW().init();

  // Initialize Venobox
  $(".venobox").venobox({
    bgcolor: "",
    overlayColor: "rgba(6, 12, 34, 0.85)",
    closeBackground: "",
    closeColor: "#fff",
  });

  // Initiate superfish on nav menu
  $(".nav-menu").superfish({
    animation: {
      opacity: "show",
    },
    speed: 400,
  });

  // Mobile Navigation
  if ($("#nav-menu-container").length) {
    var $mobile_nav = $("#nav-menu-container").clone().prop({
      id: "mobile-nav",
    });
    $mobile_nav.find("> ul").attr({
      class: "",
      id: "",
    });
    $("body").append($mobile_nav);
    $("body").prepend(
      '<button type="button" id="mobile-nav-toggle"><i class="fa fa-bars"></i></button>'
    );
    $("body").append('<div id="mobile-body-overly"></div>');
    $("#mobile-nav")
      .find(".menu-has-children")
      .prepend('<i class="fa fa-chevron-down"></i>');

    $(document).on("click", ".menu-has-children i", function (e) {
      $(this).next().toggleClass("menu-item-active");
      $(this).nextAll("ul").eq(0).slideToggle();
      $(this).toggleClass("fa-chevron-up fa-chevron-down");
    });

    $(document).on("click", "#mobile-nav-toggle", function (e) {
      $("body").toggleClass("mobile-nav-active");
      $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
      $("#mobile-body-overly").toggle();
    });

    $(document).click(function (e) {
      var container = $("#mobile-nav, #mobile-nav-toggle");
      if (!container.is(e.target) && container.has(e.target).length === 0) {
        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
      }
    });
  } else if ($("#mobile-nav, #mobile-nav-toggle").length) {
    $("#mobile-nav, #mobile-nav-toggle").hide();
  }

  // Smooth scroll for the menu and links with .scrollto classes
  $(".nav-menu a, #mobile-nav a, .scrollto").on("click", function () {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      if (target.length) {
        var top_space = 0;

        if ($("#header").length) {
          top_space = $("#header").outerHeight();

          if (!$("#header").hasClass("header-fixed")) {
            top_space = top_space - 20;
          }
        }

        $("html, body").animate(
          {
            scrollTop: target.offset().top - top_space,
          },
          1500,
          "easeInOutExpo"
        );

        if ($(this).parents(".nav-menu").length) {
          $(".nav-menu .menu-active").removeClass("menu-active");
          $(this).closest("li").addClass("menu-active");
        }

        if ($("body").hasClass("mobile-nav-active")) {
          $("body").removeClass("mobile-nav-active");
          $("#mobile-nav-toggle i").toggleClass("fa-times fa-bars");
          $("#mobile-body-overly").fadeOut();
        }
        return false;
      }
    }
  });

  // Gallery carousel (uses the Owl Carousel library)
  $(".gallery-carousel").owlCarousel({
    autoplay: true,
    dots: true,
    loop: true,
    center: true,
    responsive: {
      0: { items: 1 },
      768: { items: 3 },
      992: { items: 4 },
      1200: { items: 5 },
    },
  });

  // Buy tickets select the ticket type on click
  $("#buy-ticket-modal").on("show.bs.modal", function (event) {
    var button = $(event.relatedTarget);
    var ticketType = button.data("ticket-type");
    var modal = $(this);
    modal.find("#ticket-type").val(ticketType);
  });

  // custom code
});

(function () {
  "use strict";

  // check if an element is in viewport
  // http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  function isElementInViewport(el) {
    var rect = el.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  function callbackFunc() {
    var items = document.querySelectorAll(".active .timeline li");
    console.log(items);
    for (var i = 0; i < items.length; i++) {
      if (isElementInViewport(items[i])) {
        items[i].classList.add("in-view");
      }
    }
  }

  // listen for events
  window.addEventListener("load", callbackFunc);
  window.addEventListener("resize", callbackFunc);
  window.addEventListener("scroll", callbackFunc);
})();
