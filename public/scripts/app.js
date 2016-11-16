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
    console.log("rendering")
    console.log(tweets[primary_key]['user']);
    tweetDOM = createTweetElement(tweets[primary_key]);
    $('.tweet-contents').append(tweetDOM);
  }
}

function createTweetElement(tweet){
  console.log(tweet);
  console.log(Object.keys(tweet))
  // console.log(tweet['user']['avatars']['regular'])
  var $tweet = $('<article>').addClass('tweet');
  var image = `<img class='avatar' src=${escape(tweet['user']['avatars']['regular'])}>`;
  var userName = `<h2>${escape(tweet['user']['name'])}</h2>`;
  var userAvatar = `<h4>${escape(tweet['user']['handle'])}</h4>`
  var head = `<header>${image+userName+userAvatar}</header>`
  var tweetText = tweet['content']['text'];
  var para = `<p class="tweet-text">${escape(tweetText)}</p>`
  var timeStamp = printTime(tweet['created_at']);
  var foot = `<footer><p class='tweet-time'>${escape(timeStamp)}</p></footer>`
  $($tweet).append(head);
  $($tweet).append(para);
  $($tweet).append(foot);
  return $tweet[0].outerHTML;
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
  console.log(month)
  if(month > 1){
    return `${Math.floor(month)} months ago`;
  }
  var day = time/(24*60*60);
  if(day > 1){
    return `${Math.floor(day)} days ago`;
  }
  var hour = time/(60*60);
  console.log("hour",hour)
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