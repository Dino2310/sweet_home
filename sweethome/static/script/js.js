function color(bgc, lampId){
    $.ajax({
        url: '/ex',
        type:"GET",
        data:{
            "res" : bgc,
            "lampId":lampId,
        },
        success: function (data) {
            $(lamp).css("background-color",  data["content"]['result'])
        },
        error: function(s) {
            console.log('err');
        }
    })
         
}

function lamp_switch(lampId) {
    lamp = "#"+lampId
    let count = $(lamp).children()
    lamp = (count.length)? count: lamp
    let bgc = $(lamp).css("background-color")
    color(bgc, lampId)
}

function photo_del(obj_id){
    if (confirm("Удаление")){
        $.ajax({
            url:'/photo/del/',
            type:"GET",
            data:{"id":obj_id},
            success: function (data){
                alert("Удаление успешно завершено")
            },
            error: function(data){
                alert("Удаление заверешно с ошибкой")
                console.error(data)
            }

        })
    }
}

// галерея
$('.gallery').each(function() {
    $('.gallery-link').magnificPopup({
      type: 'image',
      closeOnContentClick: true,
      closeBtnInside: false,
      mainClass: 'mfp-with-zoom mfp-img-mobile',

      image: {
        verticalFit: true,
        titleSrc: function(item) {
          return item.el.find('figcaption').text() || item.el.attr('title');
        }
      },
      zoom: {
        enabled: true
      },
      // duration: 300
      // delegate: 'article',
      gallery: {
        preload: [0,1],
        enabled: true,
        navigateByImgClick: false,
        tCounter: ''
      },
      disableOn: function() {
        return $(window).width() > 640;
      }
    });
  
  }).call(this)

// слайдер

var aslider = {
  // Each slider is stored in this as {currentSlide: xx, timeoutHandle: yy}
  sliders: [],

  // Init Aslider and each defined slider on the webpage
  initAsliders: function () {
      'use strict';

      // Get each slider from the webpage and process it
      var sliders = document.querySelectorAll('.aslider');
      for (var i = 0; i < sliders.length; i++) {

          var currentSlider = sliders[i];

          // Create an object to represent current slider state for this slider
          var sliderObject = {};
          var sliderIndex = aslider.sliders.push(sliderObject) - 1;

          sliderObject.sliderContainer = sliders[i];
          sliderObject.muted = false;

          // Normalise each slider element on the page
          var style = currentSlider.getAttribute('style');
          currentSlider.setAttribute('style', (style)?style+';position:relative':'position:relative');

          // Perform any slider specific setup for the current slider:
          
          // Hide the mute control?
          if (! currentSlider.hasAttribute('data-hide-mute') &&
                  ! currentSlider.hasAttribute('data-hide-controls')) {
              // Add audio/mute icon
              var muteButton = document.createElement('a');
              muteButton.setAttribute('class', aslider.muteButtonClass);
              muteButton.setAttribute('style', aslider.muteIconStyle);
              muteButton.setAttribute('data-state', 100);
              muteButton.setAttribute('onclick', 'aslider.toggleAudio(' + sliderIndex + ')');
              var muteIcon = document.createElement('img');
              muteIcon.setAttribute('src', aslider.audioLoudIcon);
              muteIcon.setAttribute('style', 'width: inherit; height: inherit;');
              muteButton.appendChild(muteIcon);
              currentSlider.appendChild(muteButton);
              // Having the onclick handler appended this way neatly resolves potential memory leaks if the page
              // will be modified by outside scripts.
          }

          // Hide the play-pause control?
          if (! currentSlider.hasAttribute('data-hide-pause') &&
              ! currentSlider.hasAttribute('data-hide-controls')) {
              // Add play-pause icon
              var pauseButton = document.createElement('a');
              pauseButton.setAttribute('style', aslider.playPauseIconStyle);
              pauseButton.setAttribute('class', aslider.pauseButtonClass);
              pauseButton.setAttribute('data-state', 'play');
              pauseButton.setAttribute('onclick', 'aslider.toggleState(' + sliderIndex + ')');
              var pauseIcon = document.createElement('img');
              pauseIcon.setAttribute('src', aslider.pauseIcon);
              pauseIcon.setAttribute('style', 'width: inherit; height: inherit');
              pauseButton.appendChild(pauseIcon);
              currentSlider.appendChild(pauseButton);
          }
          
          // End slider specific setup.

          // Initialise each slide of the current slider
          var slides = currentSlider.querySelectorAll('.aslide');

          for (var j = 0; j < slides.length; j++) {
              var slide = slides[j];

              // Set classes to hide the slide and preload audio if specified
              slide.setAttribute('style', aslider.slideFade + ";" + aslider.slideFadeOut);
              if (slide.hasAttribute('data-audio')) {
                  var audioElement =  document.createElement('audio');
                  audioElement.setAttribute('src', slide.getAttribute('data-audio'));
                  audioElement.setAttribute('preload', '');
                  if (slide.hasAttribute('data-audio-loop')) {
                      audioElement.setAttribute('loop', '');
                  }
                  slide.appendChild(audioElement);
              }
          }

          // Advance to the first slide and start the slider
          if (slides.length > 0) { // Don't crap out if no slides specified
              var duration = slides[0].getAttribute('data-duration') || currentSlider.getAttribute('data-duration');
              if (!duration) throw ("Could not find duration on slide or on slider.");
              
              slides[0].setAttribute('style', aslider.slideFade + ";" + aslider.slideFadeIn);
              sliderObject.timeoutHandle = setTimeout(function (sliderIndex, slides) {
                  aslider.advanceSlide(slides[0], sliderIndex);
              }, parseInt(duration) * 1000, sliderIndex, slides);
              sliderObject.currentSlide = slides[0];

              aslider._playAudio(sliderIndex);
          }
      }
  },

  advanceSlide: function (currentSlide, sliderIndex) {
      'use strict';
      console.log('Advance', sliderIndex)
      var nextSlide = currentSlide.nextElementSibling;
      var slider = aslider.sliders[sliderIndex].sliderContainer;

      if (!nextSlide ||! /aslide/.test(nextSlide.className)) { // Loop to the first slide if we are on the last slide now
          nextSlide = currentSlide.parentNode.querySelector('.aslide');
      }

      currentSlide.setAttribute('style', aslider.slideFade + ";" + aslider.slideFadeOut);
      nextSlide.setAttribute('style', aslider.slideFade + ";" + aslider.slideFadeIn);

      // Cancel playing audio
      aslider._pauseAudio(sliderIndex);

      aslider.sliders[sliderIndex].currentSlide = nextSlide;

      // Play new audio
      aslider._playAudio(sliderIndex);

      //slider.clientHeight($(nextSlide).height());

      var duration = nextSlide.getAttribute('data-duration') || slider.getAttribute('data-duration');
      if (!duration) throw ("Could not find duration on slide or on slider.");

      aslider.sliders[sliderIndex].timeoutHandle = setTimeout(function () {
          aslider.advanceSlide(nextSlide, sliderIndex);
      }, parseInt(duration) * 1000);
  },

  _playAudio: function(slideIndex) {
      // Given a slideshow, plays the audio for the current slide if present and not muted
      'use strict';
      if (aslider.sliders[slideIndex].muted === false) {
          var audio = aslider.sliders[slideIndex].currentSlide.querySelector('audio');
          if (audio) {
              audio.play();            
          }
      }
  },

  _pauseAudio: function(slideIndex) {
      // Given a slideshow, pauses the audio for the current slide
      'use strict';
      var audio = aslider.sliders[slideIndex].currentSlide.querySelector('audio');
      if (audio) {
          audio.pause();            
      }
  },

  toggleAudio: function (sliderIndex) {
      // Turn on/off audio for a given slider
      'use strict';

      var slider = aslider.sliders[sliderIndex].sliderContainer;
      var muteButton = slider.querySelector('.'+aslider.muteButtonClass);

      if (aslider.sliders[sliderIndex].muted) {

          muteButton.querySelector('img').setAttribute('src', aslider.audioLoudIcon);
          muteButton.setAttribute('data-state', '100');
          aslider.sliders[sliderIndex].muted = false;
          aslider._playAudio(sliderIndex);

      } else {

          muteButton.querySelector('img').setAttribute('src', aslider.audioMuteIcon);
          muteButton.setAttribute('data-state', '0');
          aslider.sliders[sliderIndex].muted = true;
          aslider._pauseAudio(sliderIndex);

      }
  },

  toggleState: function (sliderIndex) {
      // Toggles the Paused/playing state of a slider
      'use strict';

      var slider = aslider.sliders[sliderIndex].sliderContainer;

      var pauseButton = slider.querySelector('.'+aslider.pauseButtonClass);

      if (pauseButton.getAttribute('data-state') === 'play') { // If the slider is playing, pause it

          pauseButton.querySelector('img').setAttribute('src', aslider.playIcon);// Change button icon from pause to play
          pauseButton.setAttribute('data-state', 'pause');
          clearTimeout(aslider.sliders[sliderIndex].timeoutHandle); // Stop advancing to next slide
          aslider._pauseAudio(sliderIndex);// pause audio

      } else { // If on the other hand the slider is paused, start playing

          pauseButton.querySelector('img').setAttribute('src', aslider.pauseIcon); // Change pause button icon to pause icon
          pauseButton.setAttribute('data-state', 'play');
          // Start advancing slides
          aslider.sliders[sliderIndex].timeoutHandle = setTimeout(function () {
              aslider.advanceSlide(aslider.sliders[sliderIndex].currentSlide, sliderIndex);
          }, parseInt(aslider.sliders[sliderIndex].currentSlide.getAttribute('data-duration')) * 1000);
          aslider._playAudio(sliderIndex);// unpause audio

      }
  },

  stop: function() {
      'use strict';
      while (aslider.sliders.length > 0) {
          var slider = aslider.sliders.pop();
          clearTimeout(slider.timeoutHandle);
      }

  },

  init: function () {
      'use strict';
      aslider.stop();
      if (window.addEventListener) {
          window.addEventListener('load', this.initAsliders, false);
      } else if (window.attachEvent) { // IE
          window.attachEvent('onload', this.initAsliders);
      }
  },

  /* Configuration */
  slideFade: "display: block; opacity: 1; top: 0; position: absolute; left: 0; overflow: hidden; transition: opacity 1s ease-in-out; -moz-transition: opacity 1s ease-in-out; -webkit-transition: opacity 1s ease-in-out;",
  slideFadeOut: "opacity: 0",
  slideFadeIn: "opacity: 1",
  slideSlide: "",
  slideSlideOut: "",
  slideSlideIn: "",
  muteIconStyle: "display: block; height: 25px; width: 25px; position: absolute; left: 30px; top: 30px;",
  playPauseIconStyle: "display: block; height: 25px; width: 25px; position: absolute; left: 75px; top: 30px;",
  muteButtonClass: 'audio-toggle',
  pauseButtonClass: 'play-pause-toggle'
};

aslider.init();