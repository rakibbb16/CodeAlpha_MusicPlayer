// Get all elements from the page
const audio = document.getElementById("audio");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const progress = document.getElementById("progress");
const currentTimeEl = document.getElementById("current-time");
const durationEl = document.getElementById("duration");
const volume = document.getElementById("volume");
const playlistEl = document.getElementById("playlist");

// Define your playlist (songs)
const songs = [
  {
    name: "song1.mp3",
    title: "Dreamscape",
    artist: "Kevin MacLeod"
  },
  {
    name: "song2.mp3",
    title: "Sunny Day",
    artist: "Audio Jungle"
  },
  {
    name: "song3.mp3",
    title: "Epic Adventure",
    artist: "Bensound"
  }
];

let songIndex = 0; // Keeps track of current song

// Load a song into the player
function loadSong(song) {
  title.textContent = song.title;
  artist.textContent = song.artist;
  audio.src = "music/" + song.name;
  highlightPlaylist();
}

// Highlight the active song in the playlist
function highlightPlaylist() {
  document.querySelectorAll(".playlist-item").forEach((item, index) => {
    item.classList.toggle("active", index === songIndex);
  });
}

// Create playlist items dynamically
function createPlaylist() {
  songs.forEach((song, index) => {
    const item = document.createElement("div");
    item.classList.add("playlist-item");
    item.textContent = `${song.title} – ${song.artist}`;

    // When clicked, load and play the selected song
    item.addEventListener("click", () => {
      songIndex = index;
      loadSong(songs[songIndex]);
      playSong();
    });

    playlistEl.appendChild(item);
  });
}

// Initialize
createPlaylist();
loadSong(songs[songIndex]);

let isPlaying = false; // Player state

// Play current song
function playSong() {
  isPlaying = true;
  audio.play();
  playBtn.textContent = "⏸️";
}

// Pause song
function pauseSong() {
  isPlaying = false;
  audio.pause();
  playBtn.textContent = "▶️";
}

// Toggle play/pause when button is clicked
playBtn.addEventListener("click", () => {
  isPlaying ? pauseSong() : playSong();
});

// Move to next song
function nextSong() {
  songIndex = (songIndex + 1) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Move to previous song
function prevSong() {
  songIndex = (songIndex - 1 + songs.length) % songs.length;
  loadSong(songs[songIndex]);
  playSong();
}

// Add next/prev button events
nextBtn.addEventListener("click", nextSong);
prevBtn.addEventListener("click", prevSong);

// Update progress bar and time display as song plays
audio.addEventListener("timeupdate", () => {
  const percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent || 0;
  currentTimeEl.textContent = formatTime(audio.currentTime);
  durationEl.textContent = formatTime(audio.duration);
});

// Seek to different time when user moves progress bar
progress.addEventListener("input", () => {
  const time = (progress.value / 100) * audio.duration;
  audio.currentTime = time;
});

// Volume control
volume.addEventListener("input", () => {
  audio.volume = volume.value;
});

// Format time in minutes:seconds
function formatTime(time) {
  const mins = Math.floor(time / 60);
  const secs = Math.floor(time % 60).toString().padStart(2, "0");
  return `${mins}:${secs}`;
}

// Autoplay next song when current one ends
audio.addEventListener("ended", nextSong);
