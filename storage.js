'use strict';
var loadName;
var loadEmail;
var loadScore;
var playGame = document.getElementById('play_game');

function playHandler(event) { //Sets storage for username and email
  var nameDomElement = document.getElementById('username');
  var emailDomElement = document.getElementById('email');
  var nameData;
  var emailData;

  //form name validation
  if (!nameDomElement.value) {
    // Cool way to do form validation. Typically we want to try and keep
    // styling out of our scripts wherever possible. The best way to handle
    // things like this is to have a class set for errors in your CSS somewhere
    // and add them via classList
    nameDomElement.style.outline = '2px solid #f00';
    event.preventDefault();

  } else {
    nameData = nameDomElement.value;
    JSON.stringify(nameData);
    localStorage.setItem('nameString', nameData);
  }

  //form email validation
  if (!emailDomElement.value) {
    emailDomElement.style.outline = '2px solid #f00';
    event.preventDefault();
  } else {
    emailData = emailDomElement.value;
    JSON.stringify(emailData);
    localStorage.setItem('emailString', emailData);
  }
}

if (playGame) {
  playGame.addEventListener('click', playHandler);
}

function loadHandler() { //retrieves name, email, and score data
  loadName = localStorage.getItem('nameString');
  loadEmail = localStorage.getItem('emailString');
  loadScore = localStorage.getItem('score');
}
