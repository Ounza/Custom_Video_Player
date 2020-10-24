const media = document.querySelector('video');
const controls = document.querySelector('.controls');

const play = document.querySelector('.play');
const stop = document.querySelector('.stop');
const rwd = document.querySelector('.rwd');
const fwd = document.querySelector('.fwd');
const progress = document.getElementById('progress');
const timer = document.querySelector('#timestamp');

//Remove the default controls attribute
media.removeAttribute('controls');
controls.style.visibility = 'visible';

//Functions
function playPauseMedia() {
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
    if(media.paused) {
      play.innerHTML = '<i class="fas fa-pause"></i>';
      media.play();
    } else {
      play.innerHTML = '<i class="fas fa-play"></i>';
      media.pause();
    }
  }
  function stopMedia() {
    media.currentTime = 0;
    media.pause();
    play.innerHTML = '<i class="fas fa-play"></i>';
    rwd.classList.remove('active');
    fwd.classList.remove('active');
    clearInterval(intervalRwd);
    clearInterval(intervalFwd);
  }
  let intervalFwd;
  let intervalRwd;
  
  function mediaBackward() {
    clearInterval(intervalFwd);
    fwd.classList.remove('active');
  
    if(rwd.classList.contains('active')) {
      rwd.classList.remove('active');
      clearInterval(intervalRwd);
      media.play();
    } else {
      rwd.classList.add('active');
      media.pause();
      intervalRwd = setInterval(windBackward, 200);
      play.innerHTML = '<i class="fas fa-play"></i>';
    }
  }
  
  function mediaForward() {
    clearInterval(intervalRwd);
    rwd.classList.remove('active');
  
    if(fwd.classList.contains('active')) {
      fwd.classList.remove('active');
      clearInterval(intervalFwd);
      media.play();
    } else {
      fwd.classList.add('active');
      media.pause();
      intervalFwd = setInterval(windForward, 200);
      play.innerHTML = '<i class="fas fa-play"></i>';
    }
}
function windBackward() {
    if(media.currentTime <= 3) {
      rwd.classList.remove('active');
    } else {
      media.currentTime -= 3;
    }
  }
  
  function windForward() {
    if(media.currentTime >= media.duration - 3) {
      fwd.classList.remove('active');
    } else {
      media.currentTime += 3;
    }
  }

  function updateProgress (){
    progress.value= (media.currentTime/media.duration)*100;
    let minutes = Math.floor(media.currentTime / 60);
    let seconds = Math.floor(media.currentTime - minutes * 60);
    let minuteValue;
    let secondValue;
  
    if (minutes < 10) {
      minuteValue = '0' + minutes;
    } else {
      minuteValue = minutes;
    }
  
    if (seconds < 10) {
      secondValue = '0' + seconds;
    } else {
      secondValue = seconds;
    }
  
    let mediaTime = minuteValue + ':' + secondValue;
    timer.textContent = mediaTime;
  }
  function setVideoProgress(){
    media.currentTime = (+progress.value*media.duration)/100;
  }

//Add event when the play button is clicked
play.addEventListener('click', playPauseMedia);
media.addEventListener('click', playPauseMedia);
stop.addEventListener('click', stopMedia);
media.addEventListener('ended', stopMedia);
rwd.addEventListener('click', mediaBackward);
fwd.addEventListener('click', mediaForward);
media.addEventListener('timeupdate', updateProgress);
progress.addEventListener('change', setVideoProgress);