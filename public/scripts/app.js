/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

var loadTweets = function(){
  $.ajax({
    url: "/tweets",
    method: 'GET',
    dataType: 'JSON'
  }).then(function(tweets){
    $('.tweet-contents').empty();
    renderTweets(tweets);
  }, function(failure){
    console.log(failure);
    throw failure;
  })
}

function renderTweets(tweets){
  for (var primary_key in tweets){
    var source = $('#tweet-template').html();
    var template = Handlebars.compile(source);
    tweetDOM = createTweetElement(tweets[primary_key], template);
    $('.tweet-contents').append(tweetDOM);
  }
}

function createTweetElement(tweet, template){
  new_article = template({
    image_location: tweet['user']['avatars']['regular'],
    user_name: tweet['user']['name'],
    user_handle: tweet['user']['handle'],
    content: tweet['content']['text'],
    time_since: printTime(tweet['created_at'])
  });
  return new_article;
}

function printTime(timeStamp){
  var current = Date.now();
  var diff = (timeStamp - current)/1000;
  return roundTime(-1 * diff);
}

function roundTime(time){
  var year = time/(365*24*60*60)
  if(year > 1){
    return `${Math.floor(year)} years ago`;
  }
  var month = time/(30*24*60*60);
  if(month > 1){
    return `${Math.floor(month)} months ago`;
  }
  var day = time/(24*60*60);
  if(day > 1){
    return `${Math.floor(day)} days ago`;
  }
  var hour = time/(60*60);
  if(hour > 1){
    return `${Math.floor(hour)} hours ago`;
  }
  var minute = time/(60);
  if(minute > 1){
    return `${Math.floor(minute)} minutes ago`;
  }
  var second = time;
  return `${Math.floor(second)} seconds ago`;
}

function escape(str) {
  var div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function(){
  loadTweets();
  $('form').on('submit', function (event){
    event.preventDefault();
    $(this).children('.warning').remove();
    var $text = $(this).children('textarea')[0];
    var flashWarning;
    if ($text.value === "" || $text.value === null){
      flashWarning = "Please enter a tweet"
    } else {
      if ($text.length > 140){
        flashWarning = "Tweets are limited to a length of 140 characters"
      }
    }
    if (flashWarning){
      $(this).append(`<p class="warning"> ${flashWarning} </p>`);
    } else {
      $.ajax({
        url: "/tweets",
        method: 'POST',
        data: {text:$text.value},
        success: function(){
          loadTweets();
          $text.value = "";
        }
      })
    }
  })
})