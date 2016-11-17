$(document).ready(function(){
  console.log($('.icons').children('.icon-wrap'));
  $('.tweet-contents').on('click', '.icons .icon-wrap', function(){
    let mydata = $(this).data();
    let status = mydata.tweeterStatus === "true";
    let icon = mydata.tweeterIcon;
    $.ajax({
      url: '/tweets',
      method: 'PUT',
      dataType: 'application/JSON',
      data: `status=${status}&icon=${icon}`
    })

  });
})