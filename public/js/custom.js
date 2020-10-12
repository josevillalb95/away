function animatethis(targetElement, speed) {
    var scrollWidth = $(targetElement).get(0).scrollWidth;
    var clientWidth = $(targetElement).get(0).clientWidth;
    $(targetElement).animate({ scrollLeft: scrollWidth - clientWidth },
    {
        duration: speed,
        complete: function () {
            targetElement.animate({ scrollLeft: 0 },
            {
                duration: speed,
                complete: function () {
                    animatethis(targetElement, speed);
                }
            });
        }
    });
};


function sliderinit(ide){
  var slider = $("."+ide);
  slider.on('init', function(){ 
      $(".loading").hide()
      slider.css("display","block");
  });
  slider.slick({
    infinite: true,
    slidesToShow: 2,
    slidesToScroll: 1,
    speed: 300,
    autoplay: true,
    autoplaySpeed: 2500,
    responsive: [{
        breakpoint: 600,
        settings: {
            slidesToShow: 3,
            vertical:true
        }
    }]


  });

  slider.slick('refresh');
}


function orden_parrafo(elemento,flag,index_pos){
  elemento.each(function(index,elem){
      var publi=$(this);
      var acomodado=false;
      if($(".nota_ind .cuerpo > p").length){
          $(".nota_ind .cuerpo > p").each(function(index,elem){
              if(index >= index_pos && !acomodado ){
                  acomodado=true;
                  publi.insertAfter($(this));
                  index_pos+=2;
              }
          })
      }
      
  })

}
function init_imagenes(){
    
         
  
  if($(".nota_ind .imagen").length){
    orden_parrafo($(".nota_ind .imagen"),true,0)
  }
  if($(".nota_ind .video_sort").length){
    orden_parrafo($(".nota_ind .video_sort"),true,0)
  }
     
     
}


$(document).ready(function(){
	console.log("Init JQ")
  if(  $(".notas_grup").length ){
      sliderinit("notas_grup");

      var dragging = false;
      var iX, iY;
      $(".box_notas .movemove").mousedown(function(e) {
        dragging = true;
        iX = e.clientX - this.offsetLeft;
        iY = e.clientY - this.offsetTop;
        this.setCapture && this.setCapture();
        return false;
      });
      document.onmousemove = function(e) {
        if (dragging) {
          var e = e || window.event;
          var oX = e.clientX - iX;
          var oY = e.clientY - iY;
          $(".box_notas ").css({"left":oX + "px", "top":oY + "px"});
          return false;
        }
      };
      $(document).mouseup(function(e) {
        dragging = false;
        // $(".box_notas ")[0].releaseCapture();
        e.cancelBubble = true;
      })
  }

  $(document).on('click', '.nota', function(event) {
      window.open($(this).attr("data-href"), "Google", "width=500,height=500");
  })
  $(document).on('click', '.cerrar_notas', function(event) {
    $(".box_notas").remove()
  })  


  if($(".nota_ind ").length ){
    $("header span").remove()
    init_imagenes();
  }



  $(document).on('click', ".select_peaper span:not('.activo')", function(event) {
    $(".select_peaper span.activo").removeClass("activo")
    $(this).addClass("activo")
    $(".notas_grup").hide()
    $(".loading").show()
    $.ajax({
     url : '/notas/'+$(this).attr("data-diario"),
     type: "GET"
    }).done(function(datos){
        $(".notas_grup").replaceWith(datos)
        if(  $(".notas_grup").length )
          sliderinit("notas_grup");
    })


    
  })




});