$(document).ready(function(){
  $('.new-tweet').hide();
  $('#nav-bar').children('.compose').on('click', function(){
    if($(this).hasClass('held')){
      $(this).removeClass('held');
    } else {
      $(this).addClass('held');
    }
    $('.new-tweet').slideToggle("fast", function(){
      $(this).children('form').children('textarea').focus();
    })
  })
})