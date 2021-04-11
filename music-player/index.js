// DOM SELECTORS
const musicContainer = document.querySelector(".music-container");
const btnPrev = document.querySelector("#prev");
const btnPlay = document.querySelector("#play");
const btnNext = document.querySelector("#next");
const audio = document.querySelector("#audio");
const progress = document.querySelector(".progress");
const progressContainer = document.querySelector(".progress-container");
const title = document.querySelector("#title");
const cover = document.querySelector("#cover");

// Song titles
const songs = ["hey", "summer", "ukulele"];
let songIndex = 0;

// FUNCTIONS
function loadSong(song) {
  title.innerText = toTitleCase(song);
  audio.src = `./music/${song}.mp3`;
  cover.src = `./img/${song}.jpg`;
}

function songPlayPause() {
  const isPlaying = musicContainer.classList.contains("play");

  musicContainer.classList.toggle("play");
  btnPlay.querySelector("i.fas").classList.toggle("fa-play");
  btnPlay.querySelector("i.fas").classList.toggle("fa-pause");
  isPlaying ? audio.pause() : audio.play();
}

function songNext() {
  songIndex++;
  if (songIndex === songs.length) songIndex = 0;
  playSong();
}

function songPrev() {
  songIndex--;
  if (songIndex < 0) songIndex = songs.length - 1;
  playSong();
}

function playSong() {
  loadSong(songs[songIndex]);
  audio.play();
}

function updateProgress(e) {
  const { currentTime, duration } = e.srcElement;
  const progressPercent = (currentTime / duration) * 100;
  progress.style.width = `${progressPercent}%`;
}

function setProgress(e) {
  const width = this.clientWidth;
  const clickX = e.offsetX;
  const duration = audio.duration;

  audio.currentTime = (clickX / width) * duration;
}

function toTitleCase(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map((word) => word.replace(word[0], word[0].toUpperCase()))
    .join(" ");
}

// EVENT LISTENERS
btnPlay.addEventListener("click", songPlayPause);
btnNext.addEventListener("click", songNext);
btnPrev.addEventListener("click", songPrev);
audio.addEventListener("timeupdate", updateProgress);
audio.addEventListener("ended", songNext);
progressContainer.addEventListener("click", setProgress);

// PAGE EXECUTION
loadSong(songs[songIndex]);
