$(document).ready(function(){
  $('.new-tweet').hide();
  $('#nav-bar').children('.compose').on('click', function(){
    $('.new-tweet').slideToggle("fast", function(){
      $(this).children('form').children('textarea').focus();
    })
  })
})