"use strict";

(function () {
  /**
   * Global variables
   */

  var userAgent = navigator.userAgent.toLowerCase(),
    initialDate = new Date(),

    $window = $(window),
    $document = $(document),
    $html = $('html'),
		isRtl = $html.attr("dir") === "rtl",
    isDesktop = $html.hasClass("desktop"),
    isIE = userAgent.indexOf("msie") != -1 ? parseInt(userAgent.split("msie")[1], 10) : userAgent.indexOf("trident") != -1 ? 11 : userAgent.indexOf("edge") != -1 ? 12 : false,
    isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent),
    plugins = {
      copyrightYear: $(".copyright-year"),
      rdNavbar: $('.rd-navbar'),
      swiper: $(".swiper-slider"),
      gallerySlider: $('.swiper-container'),
      progressBar: $(".progress-bar-custom"),
      counterCustom: $('.counter'),
      progressBarLinear: $('.progress-bar'),
      tooltipCustom: $('[data-toggle="tooltip"]'),
      owl: $('.owl-carousel'),
      viewAnimate: $('.view-animate'),
      scrollToCustom: $('.questions'),
      rdSearch: $('.rd-navbar-search'),
      dateCountdown: $('.DateCountdown'),
			lightGallery: $("[data-lightgallery='group']"),
			lightGalleryItem: $("[data-lightgallery='item']"),
			lightDynamicGalleryItem: $("[data-lightgallery='dynamic']"),
      rdMailForm: $(".rd-mailform"),
      rdInputLabel: $(".form-label"),
      regula: $("[data-constraints]"),
      radio: $("input[type='radio']"),
      checkbox: $("input[type='checkbox']"),
      captcha: $('.recaptcha')
    };

  $document.ready(function () {
    var isNoviBuilder = window.xMode;

		/**
		 * getSwiperHeight
		 * @description  calculate the height of swiper slider basing on data attr
		 */
		function getSwiperHeight(object, attr) {
			var val = object.attr("data-" + attr),
				dim;

			if (!val) {
				return undefined;
			}

			dim = val.match(/(px)|(%)|(vh)|(vw)$/i);

			if (dim.length) {
				switch (dim[0]) {
					case "px":
						return parseFloat(val);
					case "vh":
						return $window.height() * (parseFloat(val) / 100);
					case "vw":
						return $window.width() * (parseFloat(val) / 100);
					case "%":
						return object.width() * (parseFloat(val) / 100);
				}
			} else {
				return undefined;
			}
		}

		/**
		 * toggleSwiperInnerVideos
		 * @description  toggle swiper videos on active slides
		 */
		function toggleSwiperInnerVideos(swiper) {
			var prevSlide = $(swiper.slides[swiper.previousIndex]),
				nextSlide = $(swiper.slides[swiper.activeIndex]),
				videos,
				videoItems = prevSlide.find("video");

			for (var i = 0; i < videoItems.length; i++) {
				videoItems[i].pause();
			}

			videos = nextSlide.find("video");
			if (videos.length) {
				videos.get(0).play();
			}
		}

		/**
		 * toggleSwiperCaptionAnimation
		 * @description  toggle swiper animations on active slides
		 */
		function toggleSwiperCaptionAnimation(swiper) {
			var prevSlide = $(swiper.container).find("[data-caption-animate]"),
				nextSlide = $(swiper.slides[swiper.activeIndex]).find("[data-caption-animate]"),
				delay,
				duration,
				nextSlideItem,
				prevSlideItem;

			for (var i = 0; i < prevSlide.length; i++) {
				prevSlideItem = $(prevSlide[i]);

				prevSlideItem.removeClass("animated")
					.removeClass(prevSlideItem.attr("data-caption-animate"))
					.addClass("not-animated");
			}


			var tempFunction = function (nextSlideItem, duration) {
				return function () {
					nextSlideItem
						.removeClass("not-animated")
						.addClass(nextSlideItem.attr("data-caption-animate"))
						.addClass("animated");
					if (duration) {
						nextSlideItem.css('animation-duration', duration + 'ms');
					}
				};
			};

			for (var i = 0; i < nextSlide.length; i++) {
				nextSlideItem = $(nextSlide[i]);
				delay = nextSlideItem.attr("data-caption-delay");
				duration = nextSlideItem.attr('data-caption-duration');
				if (!isNoviBuilder) {
					if (delay) {
						setTimeout(tempFunction(nextSlideItem, duration), parseInt(delay, 10));
					} else {
						tempFunction(nextSlideItem, duration);
					}

				} else {
					nextSlideItem.removeClass("not-animated")
				}
			}
		}



    // isScrolledIntoView
    function isScrolledIntoView(elem) {
      if (!isNoviBuilder) {
        return elem.offset().top + elem.outerHeight() >= $window.scrollTop() && elem.offset().top <= $window.scrollTop() + $window.height();
      }
      else {
        return true;
      }
    }

		/**
		 * attachFormValidator
		 * @description  attach form validation to elements
		 */
		function attachFormValidator( elements ) {
			// Custom validator - phone number
			regula.custom({
				name: 'PhoneNumber',
				defaultMessage: 'Invalid phone number format',
				validator: function() {
					if ( this.value === '' ) return true;
					else return /^(\+\d)?[0-9\-\(\) ]{5,}$/i.test( this.value );
				}
			});

			for ( var i = 0; i < elements.length; i++ ) {
				var o = $(elements[i]), v;
				o.addClass("form-control-has-validation").after("<span class='form-validation'></span>");
				v = o.parent().find(".form-validation");
				if (v.is(":last-child")) o.addClass("form-control-last-child");
			}

			elements.on('input change propertychange blur', function (e) {
				var $this = $(this), results;

				if ( e.type !== "blur" ) if ( !$this.parent().hasClass("has-error") ) return;
				if ( $this.parents('.rd-mailform').hasClass('success') ) return;

				if ( ( results = $this.regula('validate') ).length ) {
					for ( i = 0; i < results.length; i++ ) {
						$this.siblings(".form-validation").text(results[i].message).parent().addClass("has-error");
					}
				} else {
					$this.siblings(".form-validation").text("").parent().removeClass("has-error")
				}
			}).regula('bind');

			var regularConstraintsMessages = [
				{
					type: regula.Constraint.Required,
					newMessage: "The text field is required."
				},
				{
					type: regula.Constraint.Email,
					newMessage: "The email is not a valid email."
				},
				{
					type: regula.Constraint.Numeric,
					newMessage: "Only numbers are required"
				},
				{
					type: regula.Constraint.Selected,
					newMessage: "Please choose an option."
				}
			];


			for ( var i = 0; i < regularConstraintsMessages.length; i++ ) {
				var regularConstraint = regularConstraintsMessages[i];

				regula.override({
					constraintType: regularConstraint.type,
					defaultMessage: regularConstraint.newMessage
				});
			}
		}

		/**
		 * validateReCaptcha
		 * @description  validate google reCaptcha
		 */
		function validateReCaptcha(captcha) {
			var captchaToken = captcha.find('.g-recaptcha-response').val();

			if (captchaToken.length === 0) {
				captcha
					.siblings('.form-validation')
					.html('Please, prove that you are not robot.')
					.addClass('active');
				captcha
					.closest('.form-group')
					.addClass('has-error');

				captcha.on('propertychange', function () {
					var $this = $(this),
						captchaToken = $this.find('.g-recaptcha-response').val();

					if (captchaToken.length > 0) {
						$this
							.closest('.form-group')
							.removeClass('has-error');
						$this
							.siblings('.form-validation')
							.removeClass('active')
							.html('');
						$this.off('propertychange');
					}
				});

				return false;
			}

			return true;
		}

		/**
		 * isValidated
		 * @description  check if all elemnts pass validation
		 */
		function isValidated(elements, captcha) {
			var results, errors = 0;

			if (elements.length) {
				for (j = 0; j < elements.length; j++) {

					var $input = $(elements[j]);
					if ((results = $input.regula('validate')).length) {
						for (k = 0; k < results.length; k++) {
							errors++;
							$input.siblings(".form-validation").text(results[k].message).parent().addClass("has-error");
						}
					} else {
						$input.siblings(".form-validation").text("").parent().removeClass("has-error")
					}
				}

				if (captcha) {
					if (captcha.length) {
						return validateReCaptcha(captcha) && errors === 0
					}
				}

				return errors === 0;
			}
			return true;
		}


		/**
		 * onloadCaptchaCallback
		 * @description  init google reCaptcha
		 */
		window.onloadCaptchaCallback = function () {
			for (i = 0; i < plugins.captcha.length; i++) {
				var $capthcaItem = $(plugins.captcha[i]);

				grecaptcha.render(
					$capthcaItem.attr('id'),
					{
						sitekey: $capthcaItem.attr('data-sitekey'),
						size: $capthcaItem.attr('data-size') ? $capthcaItem.attr('data-size') : 'normal',
						theme: $capthcaItem.attr('data-theme') ? $capthcaItem.attr('data-theme') : 'light',
						callback: function (e) {
							$('.recaptcha').trigger('propertychange');
						}
					}
				);
				$capthcaItem.after("<span class='form-validation'></span>");
			}
		};

		/**
		 * lightGallery
		 * @description Enables lightGallery plugin
		 */
		function initLightGallery(itemsToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemsToInit).lightGallery({
					thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
					selector: "[data-lightgallery='item']",
					autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
					pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
					addClass: addClass,
					mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
					loop: $(itemsToInit).attr("data-lg-loop") !== "false"
				});
			}
		}

		function initDynamicLightGallery(itemsToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemsToInit).on("click", function() {
					$(itemsToInit).lightGallery({
						thumbnail: $(itemsToInit).attr("data-lg-thumbnail") !== "false",
						selector: "[data-lightgallery='item']",
						autoplay: $(itemsToInit).attr("data-lg-autoplay") === "true",
						pause: parseInt($(itemsToInit).attr("data-lg-autoplay-delay")) || 5000,
						addClass: addClass,
						mode: $(itemsToInit).attr("data-lg-animation") || "lg-slide",
						loop: $(itemsToInit).attr("data-lg-loop") !== "false",
						dynamic: true,
						dynamicEl: JSON.parse($(itemsToInit).attr("data-lg-dynamic-elements")) || []
					});
				});
			}
		}

		function initLightGalleryItem(itemToInit, addClass) {
			if (!isNoviBuilder) {
				$(itemToInit).lightGallery({
					selector: "this",
					addClass: addClass,
					counter: false,
					youtubePlayerParams: {
						modestbranding: 1,
						showinfo: 0,
						rel: 0,
						controls: 0
					},
					vimeoPlayerParams: {
						byline: 0,
						portrait: 0
					}
				});
			}
		}

		// Filter carousel items
		var notCarouselItems = [];
		for (var z = 0; z < plugins.lightGalleryItem.length; z++) {
			if ( !$(plugins.lightGalleryItem[z]).parents('.owl-carousel').length &&
				!$(plugins.lightGalleryItem[z]).parents('.swiper-slider').length &&
				!$(plugins.lightGalleryItem[z]).parents('.slick-slider').length) {
				notCarouselItems.push( plugins.lightGalleryItem[z] );
			}
		}

		plugins.lightGalleryItem = notCarouselItems;

		if (plugins.lightGallery.length) {
			for (var i = 0; i < plugins.lightGallery.length; i++) {
				initLightGallery(plugins.lightGallery[i]);
			}
		}

		if (plugins.lightGalleryItem.length) {
			for (var i = 0; i < plugins.lightGalleryItem.length; i++) {
				initLightGalleryItem(plugins.lightGalleryItem[i]);
			}
		}

		if (plugins.lightDynamicGalleryItem.length) {
			for (var i = 0; i < plugins.lightDynamicGalleryItem.length; i++) {
				initDynamicLightGallery(plugins.lightDynamicGalleryItem[i]);
			}
		}

		/**
     * IE Polyfills
     * @description  Adds some loosing functionality to IE browsers
     */
    if (isIE) {
      if (isIE < 10) {
        $html.addClass("lt-ie10");
      }

      if (isIE < 11) {
        if (plugins.pointerEvents) {
          $.getScript(plugins.pointerEvents)
            .done(function () {
              $html.addClass("lt-ie11");
              PointerEventsPolyfill.initialize({});
            });
        }
      }

      if (isIE === 11) {
        $("html").addClass("ie-11");
      }

      if (isIE === 12) {
        $("html").addClass("ie-edge");
      }
    }

    /**
     * @module       Copyright
     * @description  Evaluates the copyright year
     */
    if (plugins.copyrightYear.length) {
      plugins.copyrightYear.text(initialDate.getFullYear());
    }

    /**
     * IE Polyfills
     * @description  Adds some loosing functionality to IE browsers
     */
    if (isIE) {
      if (isIE < 10) {
        $html.addClass("lt-ie10");
      }

      if (isIE < 11) {
        if (plugins.pointerEvents) {
          $.getScript(plugins.pointerEvents)
            .done(function () {
              $html.addClass("lt-ie11");
              PointerEventsPolyfill.initialize({});
            });
        }
      }

      if (isIE === 11) {
        $("html").addClass("ie-11");
      }

      if (isIE === 12) {
        $("html").addClass("ie-edge");
      }
    }

    /**
     * @module       WOW Animation
     * @description  Enables scroll animation on the page
     */
    if (!isNoviBuilder && isDesktop && $html.hasClass("wow-animation") && $(".wow").length) {
      new WOW().init();
    }

    /**
     * @module       ToTop
     * @description  Enables ToTop Plugin
     */
    if (!isNoviBuilder && isDesktop) {
      $().UItoTop({
        easingType: 'easeOutQuart',
        containerClass: 'ui-to-top fa fa-angle-up'
      });
    }

    /**
     * @module       RD Navbar
     * @description  Enables RD Navbar Plugin
     */
    if (plugins.rdNavbar.length) {
      for (i = 0; i < plugins.rdNavbar.length; i++) {
        var $currentNavbar = $(plugins.rdNavbar[i]);
        $currentNavbar.RDNavbar({
          anchorNav: !isNoviBuilder,
          stickUpClone: ($currentNavbar.attr("data-stick-up-clone") && !isNoviBuilder) ? $currentNavbar.attr("data-stick-up-clone") === 'true' : false,
          responsive: {
            0: { stickUp: (!isNoviBuilder) ? $currentNavbar.attr("data-stick-up") === 'true' : false },
            768: { stickUp: (!isNoviBuilder) ? $currentNavbar.attr("data-sm-stick-up") === 'true' : false },
            992: { stickUp: (!isNoviBuilder) ? $currentNavbar.attr("data-md-stick-up") === 'true' : false },
            1200: { stickUp: (!isNoviBuilder) ? $currentNavbar.attr("data-lg-stick-up") === 'true' : false }
          },
          callbacks: {
            onStuck: function () {
              var navbarSearch = this.$element.find('.rd-search input');
              if (navbarSearch) navbarSearch.val('').trigger('propertychange');
            },
            onUnstuck: function () {
              if (this.$clone === null)
                return;

              var navbarSearch = this.$clone.find('.rd-search input');

              if (navbarSearch) {
                navbarSearch.val('').trigger('propertychange');
                navbarSearch.blur();
              }
            },
            onDropdownOver: function(){
              return !isNoviBuilder;
            }
          }
        });
        if (plugins.rdNavbar.attr("data-body-class")) {
          document.body.className += ' ' + plugins.rdNavbar.attr("data-body-class");
        }
        $( '.rd-navbar-nav' ).on( 'click', function() {
          $( '[data-rd-navbar-toggle=".rd-navbar"]' ).removeClass( 'active' );
          $( '.rd-navbar' ).removeClass( 'active' );
        });
      }
    }

		/**
		 * initOwlCarousel
		 * @description  Init owl carousel plugin
		 */
		function initOwlCarousel(c) {
			var aliaces = ["-", "-xs-", "-sm-", "-md-", "-lg-", "-xl-"],
				values = [0, 480, 768, 992, 1200, 1200],

				responsive = {};

			for (var j = 0; j < values.length; j++) {
				responsive[values[j]] = {};
				for (var k = j; k >= -1; k--) {
					if (!responsive[values[j]]["items"] && c.attr("data" + aliaces[k] + "items")) {
						responsive[values[j]]["items"] = k < 0 ? 1 : parseInt(c.attr("data" + aliaces[k] + "items"), 10);
					}
					if (!responsive[values[j]]["stagePadding"] && responsive[values[j]]["stagePadding"] !== 0 && c.attr("data" + aliaces[k] + "stage-padding")) {
						responsive[values[j]]["stagePadding"] = k < 0 ? 0 : parseInt(c.attr("data" + aliaces[k] + "stage-padding"), 10);
					}
					if (!responsive[values[j]]["margin"] && responsive[values[j]]["margin"] !== 0 && c.attr("data" + aliaces[k] + "margin")) {
						responsive[values[j]]["margin"] = k < 0 ? 30 : parseInt(c.attr("data" + aliaces[k] + "margin"), 10);
					}
				}
			}

			// Enable custom pagination
			if (c.attr('data-dots-custom')) {
				c.on("initialized.owl.carousel", function (event) {
					var carousel = $(event.currentTarget),
						customPag = $(carousel.attr("data-dots-custom")),
						active = 0;

					if (carousel.attr('data-active')) {
						active = parseInt(carousel.attr('data-active'), 10);
					}

					carousel.trigger('to.owl.carousel', [active, 300, true]);
					customPag.find("[data-owl-item='" + active + "']").addClass("active");

					customPag.find("[data-owl-item]").on('click', function (e) {
						e.preventDefault();
						carousel.trigger('to.owl.carousel', [parseInt(this.getAttribute("data-owl-item"), 10), 300, true]);
					});

					carousel.on("translate.owl.carousel", function (event) {
						customPag.find(".active").removeClass("active");
						customPag.find("[data-owl-item='" + event.item.index + "']").addClass("active")
					});
				});
			}

			c.on("initialized.owl.carousel", function () {
				initLightGalleryItem(c.find('[data-lightgallery="item"]'), 'lightGallery-in-carousel');
			});

			c.owlCarousel({
				autoplay: isNoviBuilder ? false : c.attr("data-autoplay") === "true",
				loop: isNoviBuilder ? false : c.attr("data-loop") !== "false",
				items: 1,
				rtl: isRtl,
				center: c.attr("data-center") === "true",
				dotsContainer: c.attr("data-pagination-class") || false,
				navContainer: c.attr("data-navigation-class") || false,
				mouseDrag: isNoviBuilder ? false : c.attr("data-mouse-drag") !== "false",
				nav: c.attr("data-nav") === "true",
				dots: c.attr("data-dots") === "true",
				dotsEach: c.attr("data-dots-each") ? parseInt(c.attr("data-dots-each"), 10) : false,
				animateIn: c.attr('data-animation-in') ? c.attr('data-animation-in') : false,
				animateOut: c.attr('data-animation-out') ? c.attr('data-animation-out') : false,
				responsive: responsive,
				navText: function () {
					try {
						return JSON.parse(c.attr("data-nav-text"));
					} catch (e) {
						return [];
					}
				}(),
				navClass: function () {
					try {
						return JSON.parse(c.attr("data-nav-class"));
					} catch (e) {
						return ['owl-prev', 'owl-next'];
					}
				}()
			});
		}


		/**
 * Swiper 3.1.7
 * @description  Enable Swiper Slider
 */
if (plugins.swiper.length) {
	for (var i = 0; i < plugins.swiper.length; i++) {
		var s = $(plugins.swiper[i]);
		var pag = s.find(".swiper-pagination"),
			next = s.find(".swiper-button-next"),
			prev = s.find(".swiper-button-prev"),
			bar = s.find(".swiper-scrollbar"),
			swiperSlide = s.find(".swiper-slide"),
			autoplay = false;

		for (var j = 0; j < swiperSlide.length; j++) {
			var $this = $(swiperSlide[j]),
				url;

			if (url = $this.attr("data-slide-bg")) {
				$this.css({
					"background-image": "url(" + url + ")",
					"background-size": "cover"
				})
			}
		}

		swiperSlide.end()
			.find("[data-caption-animate]")
			.addClass("not-animated")
			.end();

		s.swiper({
			autoplay: isNoviBuilder ? null : s.attr('data-autoplay') ? s.attr('data-autoplay') === "false" ? undefined : s.attr('data-autoplay') : 5000,
			direction: s.attr('data-direction') ? s.attr('data-direction') : "horizontal",
			effect: s.attr('data-slide-effect') ? s.attr('data-slide-effect') : "slide",
			speed: s.attr('data-slide-speed') ? s.attr('data-slide-speed') : 600,
			keyboardControl: s.attr('data-keyboard') === "true",
			mousewheelControl: s.attr('data-mousewheel') === "true",
			mousewheelReleaseOnEdges: s.attr('data-mousewheel-release') === "true",
			nextButton: next.length ? next.get(0) : null,
			prevButton: prev.length ? prev.get(0) : null,
			pagination: pag.length ? pag.get(0) : null,
			paginationClickable: pag.length ? pag.attr("data-clickable") !== "false" : false,
			paginationBulletRender: pag.length ? pag.attr("data-index-bullet") === "true" ? function (swiper, index, className) {
				return '<span class="' + className + '">' + (index + 1) + '</span>';
			} : null : null,
			scrollbar: bar.length ? bar.get(0) : null,
			scrollbarDraggable: bar.length ? bar.attr("data-draggable") !== "false" : true,
			scrollbarHide: bar.length ? bar.attr("data-draggable") === "false" : false,
			loop: isNoviBuilder ? false : s.attr('data-loop') !== "false",
			simulateTouch: s.attr('data-simulate-touch') && !isNoviBuilder ? s.attr('data-simulate-touch') === "true" : false,
			onTransitionStart: function (swiper) {
				toggleSwiperInnerVideos(swiper);
			},
			onTransitionEnd: function (swiper) {
				toggleSwiperCaptionAnimation(swiper);
			},
			onInit: function (swiper) {
				toggleSwiperInnerVideos(swiper);
				toggleSwiperCaptionAnimation(swiper);
			}
		});

		$window.on("resize", (function (s) {
			return function () {
				var mh = getSwiperHeight(s, "min-height"),
					h = getSwiperHeight(s, "height");
				if (h) {
					s.css("height", mh ? mh > h ? mh : h : h);
				}
			}
		})(s)).trigger("resize");
	}
}


		/**
		 * Owl carousel
		 * @description Enables Owl carousel plugin
		 */
		if (plugins.owl.length) {
			for (var i = 0; i < plugins.owl.length; i++) {
				var c = $(plugins.owl[i]);
				plugins.owl[i].owl = c;

				initOwlCarousel(c);
			}
		}

    /**
     * Gallery init
     *
     * */
    if (plugins.gallerySlider.length) {
      var galleryTop = new Swiper('.gallery-top', {
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        spaceBetween: 10
      });

      var galleryThumbs = new Swiper('.gallery-thumbs', {
        spaceBetween: 10,
        centeredSlides: true,
        slidesPerView: 'auto',
        touchRatio: 0.2,
        slideToClickedSlide: true
      });

      galleryTop.params.control = galleryThumbs;
      galleryThumbs.params.control = galleryTop;
      //galleryThumbs.slideTo( $('.first-el').index(),1000,false );
      $(".first-el").click(function () {
        var v = $(this).index();
        galleryThumbs.slideTo(v, 1000, false);
      });
      $('.first-el').click();
    }

    /**
     * @module       Progress Bar custom
     * @description  Enables Progress Bar Plugin
     */
    if (plugins.progressBar.length) {
      plugins.progressBar.each(function () {
        var bar, type;
        if (
          this.className.indexOf("progress-bar-horizontal") > -1
        ) {
          type = 'Line';
        }

        if (
          this.className.indexOf("progress-bar-radial") > -1
        ) {
          type = 'Circle';
        }

        if (this.getAttribute("data-stroke") && this.getAttribute("data-value") && type) {
          //console.log(this.offsetWidth);
          //console.log(parseFloat(this.getAttribute("data-stroke")) / this.offsetWidth * 100);
          bar = new ProgressBar[type](this, {
            strokeWidth: Math.round(parseFloat(this.getAttribute("data-stroke")) / this.offsetWidth * 100)
            ,
            trailWidth: this.getAttribute("data-trail") ? Math.round(parseFloat(this.getAttribute("data-trail")) / this.offsetWidth * 100) : 0
            ,
            text: {
              value: this.getAttribute("data-counter") === "true" ? '0' : null
              , className: 'progress-bar__body'
              , style: null
            }
          });

          bar.svg.setAttribute('preserveAspectRatio', "none meet");
          if (type === 'Line') {
            bar.svg.setAttributeNS(null, "height", this.getAttribute("data-stroke"));
          }

          bar.path.removeAttribute("stroke");
          bar.path.className.baseVal = "progress-bar__stroke";
          if (bar.trail) {
            bar.trail.removeAttribute("stroke");
            bar.trail.className.baseVal = "progress-bar__trail";
          }

          if (this.getAttribute("data-easing") && !isIE) {
            $(document)
              .on("scroll", $.proxy(function () {
                //console.log(isScrolledIntoView(this));
                if (isScrolledIntoView($(this)) && this.className.indexOf("progress-bar--animated") === -1) {
                  console.log(1);
                  this.className += " progress-bar--animated";
                  bar.animate(parseInt(this.getAttribute("data-value")) / 100.0, {
                    easing: this.getAttribute("data-easing")
                    ,
                    duration: this.getAttribute("data-duration") ? parseInt(this.getAttribute("data-duration")) : 800
                    ,
                    step: function (state, b) {
                      if (b._container.className.indexOf("progress-bar-horizontal") > -1 ||
                        b._container.className.indexOf("progress-bar-vertical") > -1) {
                        b.text.style.width = Math.abs(b.value() * 100).toFixed(0) + "%"
                      }
                      b.setText(Math.abs(b.value() * 100).toFixed(0));
                    }
                  });
                }
              }, this))
              .trigger("scroll");
          } else {
            bar.set(parseInt(this.getAttribute("data-value")) / 100.0);
            bar.setText(this.getAttribute("data-value"));
            if (type === 'Line') {
              bar.text.style.width = parseInt(this.getAttribute("data-value")) + "%";
            }
          }
        } else {
          console.error(this.className + ": progress bar type is not defined");
        }
      });
    }

    /**
     * @module       Count To
     * @description  Enables Count To Plugin
     */
    if (plugins.counterCustom.length > 0) {
      $(document)
      //$(this).scroll(function () {
        .on("scroll", $.proxy(function () {
          plugins.counterCustom.not('.animated').each(function () {
            var $this = $(this);
            var position = $this.offset().top;

            if (($(window).scrollTop() + $(window).height()) > position) {

              $this.countTo();
              $this.addClass('animated');
            }
          });
        }, $(this)))
        .trigger("scroll");
    }

    /**
     * @module      Progress Horizontal Bootstrap
     * @description  Enables Animation
     */
    if (plugins.progressBarLinear.length > 0) {

      $(document)
      //$(this).scroll(function () {
        .on("scroll", $.proxy(function () {
          plugins.progressBarLinear.not('.animated').each(function () {

            var position = $(this).offset().top;

            if (($(window).scrollTop() + $(window).height()) > position) {
              var $this = $(this);
              var start = $this.attr("aria-valuemin");
              var end = $this.attr("aria-valuenow");
              $this.css({width: end + '%'});

              $this.parent().find('span').counter({
                start: start,
                end: end,
                time: 0.4,
                step: 20
              });
              $this.addClass('animated');
            }

          });
        }, $(this)))
        .trigger("scroll");

    }

    /**
     * @module       tooltip
     * @description  Bootstrap tooltips
     */
    if (plugins.tooltipCustom.length) {
      $(function () {
        plugins.tooltipCustom.tooltip()
      });
    }



		/**
     * @module       ViewPort Universal
     * @description  Add class in viewport
     */
    if (plugins.viewAnimate.length) {
      $(this).on("scroll", $.proxy(function () {
        plugins.viewAnimate.not('.active').each(function () {
          var $this = $(this);
          var position = $this.offset().top;

          if (($(window).scrollTop() + $(window).height()) > position) {
            $this.addClass("active");
          }
        });
      }, $(this)))
        .trigger("scroll");
    }

    /**
     * @module       Scroll To
     * @description  Enables Scroll To
     */
    if (plugins.scrollToCustom.length) {
      plugins.scrollToCustom.scrollTo({});
    }

    /**
     * @module       RD Search
     * @description  Enables RD Search Plugin
     */
    if (plugins.rdSearch.length) {
      plugins.rdSearch.RDSearch({});
    }

    /**
     * @module       Countdown
     * @description  Enables RD Search Plugin
     */
    if (plugins.dateCountdown.length) {
      var time = {
        "Days": {
          "text": "Days",
          "color": "#fff",
          "show": true
        },
        "Hours": {
          "text": "Hours",
          "color": "#fff",
          "show": true
        },
        "Minutes": {
          "text": "Minutes",
          "color": "#fff",
          "show": true
        },
        "Seconds": {
          "text": "Seconds",
          "color": "#fff",
          "show": true
        }
      };
      plugins.dateCountdown.TimeCircles({
        "animation": "smooth",
        "bg_width": 0.4,
        "fg_width": 0.02666666666666667,
        "circle_bg_color": "rgba(0,0,0,.2)",
        "time": time
      });
      $(window).on('load resize orientationchange', function () {
        if ($(window).width() < 479) {
          plugins.dateCountdown.TimeCircles({
            time: {
              //Days: {show: true},
              //Hours: {show: true},
              Minutes: {show: true},
              Seconds: {show: false}
            }
          }).rebuild();
        } else if ($(window).width() < 767) {
          plugins.dateCountdown.TimeCircles({
            time: {
              //Minutes: {show: true},
              Seconds: {show: false}
            }
          }).rebuild();
        } else {
          plugins.dateCountdown.TimeCircles({time: time}).rebuild();
        }
      });
    }

		/**
		 * RD Input Label
		 * @description Enables RD Input Label Plugin
		 */
		if (plugins.rdInputLabel.length) {
			plugins.rdInputLabel.RDInputLabel();
		}

		/**
		 * Radio
		 * @description Add custom styling options for input[type="radio"]
		 */
		if (plugins.radio.length) {
			var i;
			for (i = 0; i < plugins.radio.length; i++) {
				$(plugins.radio[i]).addClass("radio-custom").after("<span class='radio-custom-dummy'></span>")
			}
		}

		/**
		 * Checkbox
		 * @description Add custom styling options for input[type="checkbox"]
		 */
		if (plugins.checkbox.length) {
			var i;
			for (i = 0; i < plugins.checkbox.length; i++) {
				$(plugins.checkbox[i]).addClass("checkbox-custom").after("<span class='checkbox-custom-dummy'></span>")
			}
		}

    // Regula
    if (plugins.regula.length) {
      attachFormValidator(plugins.regula);
    }

		/**
		 * Google ReCaptcha
		 * @description Enables Google ReCaptcha
		 */
		if (plugins.captcha.length) {
			$.getScript("//www.google.com/recaptcha/api.js?onload=onloadCaptchaCallback&render=explicit&hl=en");
		}


		/**
		 * RD Mailform
		 * @version      3.2.0
		 */
		if (plugins.rdMailForm.length) {
			var i, j, k,
				msg = {
					'MF000': 'Successfully sent!',
					'MF001': 'Recipients are not set!',
					'MF002': 'Form will not work locally!',
					'MF003': 'Please, define email field in your form!',
					'MF004': 'Please, define type of your form!',
					'MF254': 'Something went wrong with PHPMailer!',
					'MF255': 'Aw, snap! Something went wrong.'
				};

			for (i = 0; i < plugins.rdMailForm.length; i++) {
				var $form = $(plugins.rdMailForm[i]),
					formHasCaptcha = false;

				$form.attr('novalidate', 'novalidate').ajaxForm({
					data: {
						"form-type": $form.attr("data-form-type") || "contact",
						"counter": i
					},
					beforeSubmit: function (arr, $form, options) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
							inputs = form.find("[data-constraints]"),
							output = $("#" + form.attr("data-form-output")),
							captcha = form.find('.recaptcha'),
							captchaFlag = true;

						output.removeClass("active error success");

						if (isValidated(inputs, captcha)) {

							// veify reCaptcha
							if (captcha.length) {
								var captchaToken = captcha.find('.g-recaptcha-response').val(),
									captchaMsg = {
										'CPT001': 'Please, setup you "site key" and "secret key" of reCaptcha',
										'CPT002': 'Something wrong with google reCaptcha'
									};

								formHasCaptcha = true;

								$.ajax({
									method: "POST",
									url: "bat/reCaptcha.php",
									data: {'g-recaptcha-response': captchaToken},
									async: false
								})
									.done(function (responceCode) {
										if (responceCode !== 'CPT000') {
											if (output.hasClass("snackbars")) {
												output.html('<p><span class="icon text-middle fa fa-check icon-xxs"></span><span>' + captchaMsg[responceCode] + '</span></p>')

												setTimeout(function () {
													output.removeClass("active");
												}, 3500);

												captchaFlag = false;
											} else {
												output.html(captchaMsg[responceCode]);
											}

											output.addClass("active");
										}
									});
							}

							if (!captchaFlag) {
								return false;
							}

							form.addClass('form-in-process');

							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle fa fa-circle-o-notch fa-spin icon-xxs"></span><span>Sending</span></p>');
								output.addClass("active");
							}
						} else {
							return false;
						}
					},
					error: function (result) {
						if (isNoviBuilder)
							return;

						var output = $("#" + $(plugins.rdMailForm[this.extraData.counter]).attr("data-form-output")),
							form = $(plugins.rdMailForm[this.extraData.counter]);

						output.text(msg[result]);
						form.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}
					},
					success: function (result) {
						if (isNoviBuilder)
							return;

						var form = $(plugins.rdMailForm[this.extraData.counter]),
							output = $("#" + form.attr("data-form-output")),
							select = form.find('select');

						form
							.addClass('success')
							.removeClass('form-in-process');

						if (formHasCaptcha) {
							grecaptcha.reset();
						}

						result = result.length === 5 ? result : 'MF255';
						output.text(msg[result]);

						if (result === "MF000") {
							if (output.hasClass("snackbars")) {
								output.html('<p><span class="icon text-middle fa fa-check icon-xxs"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active success");
							}
						} else {
							if (output.hasClass("snackbars")) {
								output.html(' <p class="snackbars-left"><span class="icon icon-xxs fa fa-exclamation-triangle text-middle"></span><span>' + msg[result] + '</span></p>');
							} else {
								output.addClass("active error");
							}
						}

						form.clearForm();

						if (select.length) {
							select.select2("val", "");
						}

						form.find('input, textarea').trigger('blur');

						setTimeout(function () {
							output.removeClass("active error success");
							form.removeClass('success');
						}, 3500);
					}
				});
			}
		}

	});
}());
