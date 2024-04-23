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
(function() {
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
      gallery: {
        enabled: true,
        navigateByImgClick: false,
        tCounter: ''
      },
      disableOn: function() {
        return $(window).width() > 640;
      }
    });
  
  }).call(this);
  // слайер
  (function ($) {
    $(function () {
  
  
      $('.slider').slick({
        dots: true,
        prevArrow: '<a class="slick-prev slick-arrow" href="#" style=""><div class="icon icon--ei-arrow-left"><svg class="icon__cnt"><use xlink:href="#ei-arrow-left-icon"></use></svg></div></a>',
        nextArrow: '<a class="slick-next slick-arrow" href="#" style=""><div class="icon icon--ei-arrow-right"><svg class="icon__cnt"><use xlink:href="#ei-arrow-right-icon"></use></svg></div></a>',
        customPaging: function (slick, index) {
          var targetImage = slick.$slides.eq(index).find('img').attr('src');
          return '<img src=" ' + targetImage + ' "/>';
        }
      });
  
  
    });
  })(jQuery);