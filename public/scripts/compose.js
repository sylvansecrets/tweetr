$(document).ready(function(){
  // $('#nav-bar').children('.compose').on('click', function(){
  //   $newTweet = $('.new-tweet');
  //   if ($newTweet.hasClass('collapsed')){
  //     $newTweet.removeClass('collapsed');
  //   } else {
  //     $newTweet.addClass('collapsed')
  //   }
  // });
  $('.new-tweet').hide();
  $('#nav-bar').children('.compose').on('click', function(){
    $('.new-tweet').slideToggle("fast", function(){
      $(this).children('form').children('textarea').focus();
    })
  })
})