
// DOM Elements
let songName = document.querySelector("#song-name");
let songSinger = document.querySelector("#song-singer");
let songImage = document.querySelector(".song-image");
let playPauseImg = document.querySelector("#play-pause");
let volumeRange = document.querySelector("#volume-range");
let songRange = document.querySelector("#song-duration");
let volSvg = document.querySelector("#vol-svg");
let playlistImg = document.querySelector("#playlist-img");
let playlist = document.querySelector(".playlist");
let playlistSongs = document.querySelectorAll(".playlist-song");

// Variables
let index = 0;
let isPlaying = false;
let track = document.createElement("audio");

// Song Data
let songs = [
    { name: "Tu Ruha Hai", path: "firstsong.mp3", image: "image1.jpg", singer: "Sonu Nigam & Neeti Mohan" },
    { name: "Ye Tune Kya Kiya", path: "secondsong.mp3", image: "image2.jpg", singer: "Javed Bashir, Pritam Chakraborty, and Rajat Arora" },
    { name: "Ureche Mon", path: "thirthsong.mp3", image: "image3.jpg", singer: "Arijit Singh" },
    { name: "Kasturi", path: "fourthsong.mp3", image: "image4.jpg", singer: "Arijit Singh" },
    { name: "Naina Da Kay Kasoor", path: "fifthsong.mp3", image: "image5.jpg", singer: "Amit Trivedi" },
    { name: "Dube Dube", path: "sixthsong.mp3", image: "image6.jpg", singer: "Tanjib Sarowar" }
    
];

// Load Track Function
function loadTrack(index) {
    track.src = songs[index].path;
    songName.textContent = songs[index].name;
    songSinger.textContent = songs[index].singer;
    songImage.style.backgroundImage = `url("${songs[index].image}")`;

    track.load();

    // Set initial volume and reset song duration
    track.volume = volumeRange.value / 100;
    songRange.value = 0;

    // Update song range dynamically
    track.addEventListener("loadedmetadata", () => {
        songRange.max = track.duration;
    });

    // Update current time in range slider every second
    setInterval(() => {
        if (!isNaN(track.duration)) {
            songRange.value = track.currentTime;
        }
    }, 1000);

    track.loop = true;
}
loadTrack(index);

// Play/Pause Functionality
function playPause() {
    isPlaying ? pauseSong() : playSong();
}

function playSong() {
    track.play();
    isPlaying = true;
    playPauseImg.src = "pause.svg";
}

function pauseSong() {
    track.pause();
    isPlaying = false;
    playPauseImg.src = "play.svg";
}

// Next and Previous Song
function nextSong() {
    index = (index + 1) % songs.length; // Loop to first song if at the end
    loadTrack(index);
    playSong();
}

function previousSong() {
    index = (index - 1 + songs.length) % songs.length; // Loop to last song if at the beginning
    loadTrack(index);
    playSong();
}

// Volume Control
function volume() {
    track.volume = volumeRange.value / 100;
    volSvg.src = volumeRange.value == 0 ? "mute.svg" : "volume.svg";
}

// Update Track Current Time
function duration() {
    track.currentTime = songRange.value;
}

// Toggle Playlist Visibility
playlistImg.addEventListener("click", () => {
    playlist.classList.toggle("playlist-active");
    playlistImg.src = playlist.classList.contains("playlist-active") ? "cross.svg" : "playlist.svg";
});

// Play Song from Playlist
playlistSongs.forEach((song, idx) => {
    song.addEventListener("click", () => {
        index = idx;
        loadTrack(index);
        playSong();
        playlist.classList.remove("playlist-active");
        playlistImg.src = "playlist.svg";
    });
});
