/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */


function loadTweets(){
  $.ajax({
    url: "/tweets",
    method: 'GET',
    success: function(tweets){
      renderTweets(tweets)}
  })

}

function renderTweets(tweets){
  for (let user in tweets){
    tweetDOM = createTweetElement(tweets[user]);
    $('.tweet-contents').append(tweetDOM);
  }
}


function createTweetElement(tweet){
  let $tweet = $('<article>').addClass('tweet');
  let image = `<img class='avatar' src=${escape(tweet['user']['avatars']['regular'])}>`;
  let userName = `<h2>${escape(tweet['user']['name'])}</h2>`;
  let userAvatar = `<h4>${escape(tweet['user']['handle'])}</h4>`
  let head = `<header>${image+userName+userAvatar}</header>`
  let tweetText = tweet['content']['text'];
  let para = `<p class="tweet-text">${escape(tweetText)}</p>`
  let timeStamp = printTime(tweet['created_at']);
  let foot = `<footer><p class='tweet-time'>${escape(timeStamp)}</p></footer>`
  $($tweet).append(head);
  $($tweet).append(para);
  $($tweet).append(foot);
  return $tweet[0].outerHTML;
}

function printTime(timeStamp){
  let current = Date.now();
  let diff = (timeStamp - current)/1000;
  return roundTime(-1 * diff);
}

function roundTime(time){
  let year = time/(365*24*60*60)
  if(year > 1){
    return `${Math.floor(year)} years ago`;
  }
  let month = time/(30*24*60*60);
  console.log(month)
  if(month > 1){
    return `${Math.floor(month)} months ago`;
  }
  let day = time/(24*60*60);
  if(day > 1){
    return `${Math.floor(day)} days ago`;
  }
  let hour = time/(60*60);
  console.log("hour",hour)
  if(hour > 1){
    return `${Math.floor(hour)} hours ago`;
  }
  let minute = time/(60*60);
  if(minute > 1){
    return `${Math.floor(minute)} minutes ago`;
  }
  let second = time/(60*60);
  return `${Math.floor(second)} seconds ago`;
}

function escape(str) {
  let div = document.createElement('div');
  div.appendChild(document.createTextNode(str));
  return div.innerHTML;
}

$(document).ready(function(){
  loadTweets();
})