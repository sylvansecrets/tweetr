
$(document).ready(function(){
  $('form').children('textarea').on('input', function(){
      let remainChar = 140 - this.value.length;
      console.log(remainChar, this.value.length);
      $(this).parent('form').children('.counter').html(remainChar);
      if (remainChar < 0){
        $(this).parent('form').children('.counter').addClass('invalid');
      }
  })
})