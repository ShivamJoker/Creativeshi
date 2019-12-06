//Strike the lis
$("ul").on("click", "li", function() {
  $(this).toggleClass("strike");
});

//Remove lis
$("ul").on("click", "span", function(e) {
  $(this).parent().fadeOut(500, function() {
    $(this).remove();
  });
  e.stopPropagation();
});

//Add todos
$("input[type='text']").keypress(function(e){
  if (e.which === 13 && $.trim( $("input[type='text']").val()) !== "" ){
     var todoText = ($(this).val());
     $(this).val("");
     $("ul").append("<li><span><i class='fa fa-trash' aria-hidden='true'></i> </span>" + todoText + "</li>")
     $("li").addClass("fade")
  }
});
//toggle plus button
$(".fa-minus-circle").click(function() {
  $("input[type='text']").fadeToggle();
  $(this).fadeOut(150, function() {
    $(".fa-plus-circle").fadeIn(150);
  });
});
$(".fa-plus-circle").click(function() {
  $("input[type='text']").fadeToggle();
  $(this).fadeOut(150, function() {
    $(".fa-minus-circle").fadeIn(150);
  });
});
