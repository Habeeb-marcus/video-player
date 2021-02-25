const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration');
const fullscreenBtn = document.querySelector('.fullscreen')

// play & pause
function showPlayIcon() {
  playBtn.classList.replace('fa-pause', 'fa-play');
  playBtn.setAttribute('title', 'play');
};

function togglePlay() {
  if (video.paused) {
    video.play();
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'pause');
  } else {
    video.pause();
    showPlayIcon();
  }
}

// on video end, show play button icon
video.addEventListener('ended', showPlayIcon);

// progress bar

// calculate display time format
function displayTime(time)  {
const minutes = Math.floor(time / 60);
let seconds = Math.floor(time % 60);
seconds = seconds > 9 ? seconds : `0${seconds}`;
return `${minutes}:${seconds}`;


}


// update our progress bar as the video
function updateProgress () {
 progressBar.style.width = `${ (video.currentTime / video.duration)  * 100}% `
 currentTime.textContent = `${displayTime(video.currentTime)} /`;
 duration.textContent = `${displayTime(video.duration)}`;
}


// volume controls



// change playback speed




// Fullscreen

// Event Listners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);