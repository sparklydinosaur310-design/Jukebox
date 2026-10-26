// Grab HTML elements to control them
const audioPlayer = document.getElementById('audio-player');
const playBtn = document.getElementById('play-btn');
const currentTitle = document.getElementById('current-title');
const currentArtist = document.getElementById('current-artist');
const songList = document.getElementById('song-list');

// Mini song library
const songs = [
    {
      title: "Ragtime Cowboy",
      artist: "Saloon House Band",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
    },
    {
      title: "Honky Tonk Stomp",
      artist: "The Desert Drifters",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3"
    },
    {
      title: "Wild West Fiddle",
      artist: "Cactus Pete",
      src: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3"
    }
];

let currentSongIndex = 0;
let isPlaying = false;

// Function to load a song into the audio player and update the screen text
function loadSong(index) {
    const song = songs[index];
    audioPlayer.src = song.src;
    currentTitle.textContent = song.title;
    currentArtist.textContent = song.artist;
}

// Make the Play/Pause button work
playBtn.addEventListener('click', () => {
    // If no song is loaded yet, load the first song by default
    if (!audioPlayer.src) {
        loadSong(currentSongIndex);
    }

    if (isPlaying) {
        audioPlayer.pause();
        playBtn.textContent = 'Play';
        isPlaying = false;
    } else {
        audioPlayer.play();
        playBtn.textContent = 'Pause';
        isPlaying = true;
    }
});

// Display the song library list on the homepage automatically
function displayLibrary() {
    songList.innerHTML = ''; // Clear the list first
   
    songs.forEach((song, index) => {
        const li = document.createElement('li');
        li.textContent = `${song.title} - ${song.artist}`;
        li.style.cursor = 'pointer';
        li.style.marginBottom = '8px';

        // When a user clicks on a song in the list, load that song instanly
        li.addEventListener('click', () => {
            currentSongIndex = index;
            loadSong(currentSongIndex);
            audioPlayer.play();
            playBtn.textContent = 'Pause';
            isPlaying = true;
        });

        songList.appendChild(li);
    });

    // Run the function to show the song library when the page opens
    displayLibrary();