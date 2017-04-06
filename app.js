'use strict';
var button = document.getElementById('start-game');
var audio = document.querySelector('audio');
var section = document.querySelector('section');
var images = document.querySelectorAll('section figure img');
var figCaptions = document.querySelectorAll('section figcaption');
var counter = 0;
var round = 0;
var userScore = 0;
var timer;
var correct;
//array of quiz questions
var media = [
  {             //song src
    song: 'songs/Cranes in the Sky.mp3',
                //answer                  album            artist
    choice1: ['images/solange.jpg', 'A Seat at the Table', 'Solange'],
    choice2: ['images/lemonade.jpg', 'Lemonade', 'Beyonce'],
    choice3: ['images/rihanna.jpg', 'Unapologetic', 'Rihanna'],
    choice4: ['images/laurynhill.jpg', 'The Miseducation of Lauren Hill', 'Lauryn Hill']
  },
  {
    song: 'songs/01 Icky Thump (mp3cut.net).mp3',
    // if you take a look at the repetition in your choice arrays and the fact
    // that each index actually has a specific purpose you can see that this is
    // a perfect use case for an object! More specifically a constructor/class
    // that way you can ask the choices for their data by name rather than having
    // to remember what index the data you want is at. You could even keep track of
    // which one is correct.
    //
    // so something like:
    // function Choice(answer, album, artist, isCorrect) {
    //   this.answer = answer;
    //   this.artist = artist;
    //   this.album = album;
    //   this.isCorrect = isCorrect;
    // }
    //
    choice1: ['images/ickythump.jpeg', 'Icky Thump', 'The White Stripes'],
    choice2: ['images/deathfromabove.jpg', 'You\'re a Woman, I\'m a Machine', 'Death From Above 1979'],
    choice3: ['images/blackkeysmagicpotion.jpg', 'Magic Potion', 'The White Stripes'],
    choice4: ['images/apologiestothequeenmary.jpg', 'Apologies To The Queen Mary', 'Wolf Parade']
  },
  {
    song: 'songs/allmanbrothers.mp3',
    choice1: ['images/brothersandsisters.jpg', 'Brothers and Sisters', 'The Allman Brothers Band'],
    choice2: ['images/rockofages.jpg', 'Rock of Ages', 'The Band'],
    choice3: ['images/creedence.jpg', 'Willy and the Poor Boys', 'Creedence Clearwater Revival'],
    choice4: ['images/iloveyouhoneybear.jpg', 'I Love You Honeybear', 'Father John Misty']
  },
  {
    song: 'songs/kurtvile.mp3',
    choice1: ['images/believeimgoingdown.jpg', 'B\'lieve I\'m Goin Down...', 'Kurt Vile'],
    choice2: ['images/mangylove.jpg', 'Mangy Love', 'Cass McCombs'],
    choice3: ['images/singingsaw.jpg', 'Singing Saw', 'Kevin Morby'],
    choice4: ['images/iloveyouhoneybear.jpg', 'I Love You Honeybear', 'Father John Misty']
  },
  {
    song: 'songs/jackWhite.mp3',
    choice1: ['images/lemonade.jpg', 'Lemonade', 'Beyonce'],
    choice2: ['images/rihanna.jpg', 'Unapologetic', 'Rihanna'],
    choice3: ['images/laurynhill.jpg', 'The Miseducation of Lauren Hill', 'Lauryn Hill'],
    choice4: ['images/solange.jpg', 'A Seat at the Table', 'Solange']
  }
];


function playClickHandler(event) {
  var number = 19;
  //countdown timer
  timer = setInterval(function() {
    button.style.color = 'rgb(230, 7, 7)';
    button.textContent = number;
    number--;

    if (number < 0) {
      onGuess();
      displayNextOrResults();
    }
  }, 1000);
  //prevent page jumping unless it's last page
  if (counter !== media.length) {
    event.preventDefault();
  }

  button.style.cursor = 'default';
  audio.play();
}

function imagesClickHandler(event) {
  var clicked = event.target;

  //make sure user clicks on a picture
  if (!clicked.getAttribute('src')) {
    return;
  }
  //don't allow more than one click per round
  if (counter > round) {
    return;
  }

  if (clicked.alt === correct) {
    //if user chooses right answer
    onGuess();
    userScore++;
    storeScore();
    //if user chooses wrong answer
  } else if (clicked.getAttribute('src')) {
    onGuess();
  }

  //fade incorrect answers
  for (var j = 0; j < images.length; j++) {
    if (images[j].alt !== correct) {
      images[j].style.opacity = '0.2';
      images[j].style.outline = '';
    } else {
      //highlight correct answer
      images[j].style.outline = '5px solid #94d594';
    }
  }

  //remove hand cursor for image hover after user guess
  for (var i = 0; i < images.length; i++) {
    images[i].className = '';
  }
  displayNextOrResults();
}

function nextClickHandler() {

  for (var i = 0; i < images.length; i++) {
    images[i].style.outline = 'none';
    images[i].removeAttribute('alt');
    images[i].style.opacity = '';
  }

  displayQuiz();
  audio.play();
  round++;
}

function generateRandomNumber(max){
  return Math.floor(Math.random() * max);
}
// in this particular case you're always only looking through 4 images
// which means that your final set will always include the same 4 numbers
// just in random order. Given that this actually would have been a good
// place to shuffle the numbers rather than generate random ones.
function displayQuiz() {
  audio.src = media[counter].song;

  var rand1 = generateRandomNumber(images.length);
  var rand2 = generateRandomNumber(images.length);
  while(rand2 === rand1) {
    rand2 = generateRandomNumber(images.length);
  }
  var rand3 = generateRandomNumber(images.length);
  while(rand3 === rand2 || rand3 === rand1) {
    rand3 = generateRandomNumber(images.length);
  }
  var rand4 = generateRandomNumber(images.length);
  while(rand4 === rand3 || rand4 === rand2 || rand4 === rand1) {
    rand4 = generateRandomNumber(images.length);
  }

  //set image, along with album/artist info
  images[rand1].src = media[counter].choice1[0];
  images[rand1].setAttribute('alt', media[counter].choice1[0]);
  //set hook for correct answer
  correct = media[counter].choice1[0];
  figCaptions[rand1].innerHTML = '<i>' + media[counter].choice1[1] + '</i>' + '<br>' + media[counter].choice1[2];
  //set image and album artist info for incorrect answers
  images[rand2].src = media[counter].choice2[0];
  figCaptions[rand2].innerHTML = '<i>' + media[counter].choice2[1] + '</i>' + '<br>' + media[counter].choice2[2];
  images[rand3].src = media[counter].choice3[0];
  figCaptions[rand3].innerHTML = '<i>' + media[counter].choice3[1] + '</i>' + '<br>' + media[counter].choice3[2];
  images[rand4].src = media[counter].choice4[0];
  figCaptions[rand4].innerHTML = '<i>' + media[counter].choice4[1] + '</i>' + '<br>' + media[counter].choice4[2];
}

function onGuess() {
  counter++;
  button.style.color = '';
  button.style.cursor = 'pointer';
  clearInterval(timer);
  audio.pause();
}

function displayNextOrResults() {
  if (counter === media.length) {
    button.removeEventListener('click', nextClickHandler);
    button.innerHTML = 'RESULTS!';
    button.href = 'results.html';
    //otherwise have button display next round message
  } else {
    button.innerHTML = 'Play round ' + (counter + 1);
    button.addEventListener('click', nextClickHandler);
  }
}

function storeScore(){
  JSON.stringify(userScore);
  localStorage.setItem('score', userScore);
}

button.addEventListener('click', playClickHandler);
section.addEventListener('click', imagesClickHandler);
displayQuiz();
storeScore();
