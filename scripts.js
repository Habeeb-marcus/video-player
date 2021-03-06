const player = document.querySelector('.player');
const video = document.querySelector('video');
const progressRange = document.querySelector('.progress-range');
const progressBar = document.querySelector('.progress-bar');
const playBtn = document.getElementById('play-btn');
const volumeIcon = document.getElementById('volume-icon');
const volumeRange = document.querySelector('.volume-range');
const volumeBar = document.querySelector('.volume-bar');
const currentTime = document.querySelector('.time-elapsed');
const duration = document.querySelector('.time-duration')
const fullscreenBtn = document.querySelector('.fullscreen');
const speed = document.querySelector('.player-speed');

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


// click to seek within the video
function setProgress(e) {
  const newTime = e.offsetX / progressRange.offsetWidth;
  progressBar.style.width = `${newTime * 100}%`;
  video.currentTime = newTime * video.duration;

}

let lastVolume = 1;



// volume controls
function changeVolume(e) {
  let newVolume = e.offsetX / volumeRange.offsetWidth;
  

  // roundinng voulme up or down
  if (newVolume < 0.1) {
    newVolume = 0;
  } 
  if (newVolume > 0.9) {
    newVolume = 1;
  }
  volumeBar.style.width = `${newVolume * 100}%`;
  video.volume = newVolume;
  

  // change icon depending on volume
  volumeIcon.className = '';
  if (newVolume > 0.7) {
    volumeIcon.classList.add('fas', 'fa-volume-up');
  }else if (newVolume < 0.7 && newVolume > 0) {
    volumeIcon.classList.add('fas', 'fa-volume-down');
  }else if (newVolume === 0) {
    volumeIcon.classList.add ('fas', 'fa-volume-off');
  }

  lastVolume = newVolume;
}

  // change volumeIcon for mute and unmute
function toggleMute() {
  volumeIcon.className = '';
  if (video.volume) {
    lastVolume = video.volume;
    video.volume = 0;
    volumeBar.style.width = 0;
    volumeIcon.classList.add('fas', 'fa-volume-mute');
    volumeIcon.setAttribute('title', 'Unmute');
  } else {
    video.volume = lastVolume;
    volumeBar.style.width = `${lastVolume * 100}%`;
    volumeIcon.classList.add('fas', 'fa-volume-up');
    volumeIcon.setAttribute('title', 'Mute');
    
  }
}


// change playback speed

function changeSpeed () {
video.playbackRate =speed.value;
}


// Fullscreen
function openFullscreen(elem) {
  if (elem.requestFullscreen) {
    elem.requestFullscreen();
  } else if (elem.webkitRequestFullscreen) { /* Safari */
    elem.webkitRequestFullscreen();
  } else if (elem.msRequestFullscreen) { /* IE11 */
    elem.msRequestFullscreen();
  }
  video.classList.add('video-fullscreen');
}

/* Close fullscreen */
function closeFullscreen() {
  if (document.exitFullscreen) {
    document.exitFullscreen();
  } else if (document.webkitExitFullscreen) { /* Safari */
    document.webkitExitFullscreen();
  } else if (document.msExitFullscreen) { /* IE11 */
    document.msExitFullscreen();
  }
  video.classList.remove('video-fullscreen');
}



let fullscreen = false;

// toggle fullscreen
function toggleFullscreen() {
if (!fullscreen) {
  openFullscreen(player);
}else {
  closeFullscreen();
}
fullscreen = !fullscreen;
}


// Event Listners
playBtn.addEventListener('click', togglePlay);
video.addEventListener('click', togglePlay);
video.addEventListener('timeupdate', updateProgress);
video.addEventListener('canplay', updateProgress);
progressRange.addEventListener('click', setProgress );
volumeRange.addEventListener('click', changeVolume);
volumeIcon.addEventListener('click', toggleMute);
speed.addEventListener('click', changeSpeed);
fullscreenBtn.addEventListener('click', toggleFullscreen);