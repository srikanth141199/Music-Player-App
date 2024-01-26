// Sample songs array
//Songs are downloaded from free websites and there is no relation between songs and Name of the song displayed and Artish being displayed.
const songs = [
  {
    id: 1,
    name: "Padam Padam",
    artist: "Kylie Minogue",
    img: "images/pop1.jpg",
    genre: "pop",
    source: "songs/song1.mp3",
  },
  {
    id: 2,
    name: "Umbrella",
    artist: "Rihanna featuring Jay-Z",
    img: "images/pop2.jpg",
    genre: "pop",
    source: "songs/song2.mp3",
  },
  {
    id: 3,
    name: "Toxic",
    artist: "Britney Spears",
    img: "images/pop3.jpg",
    genre: "pop",
    source: "songs/song1.mp3",
  },
  {
    id: 4,
    name: "Hits Different",
    artist: "Taylor Swift",
    img: "images/pop4.jpg",
    genre: "pop",
    source: "songs/song2.mp3",
  },
  {
    id: 5,
    name: "Dance the Night",
    artist: "Dua Lipa",
    img: "images/pop5.jpg",
    genre: "pop",
    source: "songs/song1.mp3",
  },
  {
    id: 6,
    name: "Purple Haze",
    artist: "Jimi Hendrix",
    img: "images/rock1.jpg",
    genre: "rock",
    source: "songs/song2.mp3",
  },
  {
    id: 8,
    name: "Sympathy for the Devil",
    artist: "The Rolling Stones",
    img: "images/rock3.jpg",
    genre: "rock",
    source: "songs/song2.mp3",
  },
  {
    id: 9,
    name: "Under Pressure",
    artist: "Queen & David Bowie",
    img: "images/rock4.jpg",
    genre: "rock",
    source: "songs/song1.mp3",
  },
  {
    id: 10,
    name: "I'm Coming Out",
    artist: "Diana Ross",
    img: "images/party1.jpg",
    genre: "Party",
    source: "songs/song2.mp3",
  },
  {
    id: 11,
    name: "212",
    artist: "Azealia Banks, ft Lazy Jay",
    img: "images/party2.jpg",
    genre: "Party",
    source: "songs/song1.mp3",
  },
  {
    id: 12,
    name: "In Da Club",
    artist: "50 Cent",
    img: "images/party3.jpg",
    genre: "Party",
    source: "songs/song1.mp3",
  },
  {
    id: 13,
    name: "Poison",
    artist: "Bell Biv DeVoe",
    img: "images/party4.jpg",
    genre: "Party",
    source: "songs/song2.mp3",
  }
];

// Sample playlists array
const playlists = [];
const toggleEl = document.getElementsByClassName("headingBtn")[0];

toggleEl.textContent = "Light";

let currentSongIndex = 0;

document.addEventListener("DOMContentLoaded", showSongs);

function showSongs() {
  const genreFilter = document.getElementById("genreFilter");
  const selectedGenre = genreFilter.value;
  const songList = document.getElementById("songList");

  const filteredSongs =
    selectedGenre === "all"
      ? songs
      : songs.filter((song) => song.genre === selectedGenre);

  songList.innerHTML = "";
  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.innerHTML = `${song.name} - ${song.artist} <button onclick="playSong(${song.id})">Play</button>`;
    songList.appendChild(li);
  });
}

function playSong(songId) {
  currentSongIndex = songs.findIndex((song) => song.id === songId);
  renderCurrentSong();
}

function renderCurrentSong() {
  const currentSong = songs[currentSongIndex];
  const songImage = document.getElementById("songImage");
  const songName = document.getElementById("songName");
  const artistName = document.getElementById("artistName");
  const audioPlayer = document.getElementById("audioPlayer");

  songImage.src = currentSong.img;
  songName.textContent = currentSong.name;
  artistName.textContent = currentSong.artist;
  audioPlayer.src = currentSong.source;
  audioPlayer.play();
}

function playNext() {
  currentSongIndex = (currentSongIndex + 1) % songs.length;
  renderCurrentSong();
}

function playPrevious() {
  currentSongIndex = (currentSongIndex - 1 + songs.length) % songs.length;
  renderCurrentSong();
}

function addToPlaylist() {
  const currentSong = songs[currentSongIndex];
  const playlistList = document.getElementById("playlistList");

  // Sample implementation, you may need to enhance it based on your needs
  const selectedPlaylist = prompt("Enter the name of the playlist:");
  const playlist = playlists.find((pl) => pl.name === selectedPlaylist);

  if (playlist) {
    playlist.songs.push(currentSong);
  } else {
    playlists.push({ name: selectedPlaylist, songs: [currentSong] });
  }

  renderPlaylists();
}

function createPlaylist() {
  //const playlistName = prompt("Enter the name of the new playlist:");
  const playlistName = document.getElementById('createplaylistSearchInput').value;
  playlists.push({ name: playlistName, songs: [] });
  renderPlaylists();
}

function renderPlaylists() {
  const playlistList = document.getElementById("playlistList");
  playlistList.innerHTML = "";

  playlists.forEach((playlist) => {
    const li = document.createElement("li");
    li.innerHTML = `${playlist.name} <button onclick="renderPlaylistSongs('${playlist.name}')">Show Songs</button>`;
    playlistList.appendChild(li);
  });
}

function renderPlaylistSongs(playlistName) {
  const playlist = playlists.find((pl) => pl.name === playlistName);
  const songList = document.getElementById("songList");

  songList.innerHTML = "";
  playlist.songs.forEach((song) => {
    const li = document.createElement("li");
    li.innerHTML = `${song.name} - ${song.artist} <button onclick="playSong(${song.id})">Play</button>`;
    songList.appendChild(li);
  });
}

function toggleTheme() {
  const body = document.body;

  toggleEl.addEventListener("click", () => {
    body.dataset.theme = body.dataset.theme === "dark" ? "light" : "dark";

    toggleEl.dataset.theme = body.dataset.theme;

    toggleEl.textContent = body.dataset.theme === "dark" ? "Dark" : "Light";
  });
}

toggleTheme();

// Additional Search Functionality for Songs
function searchSongs() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const songList = document.getElementById("songList");

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm) ||
      song.artist.toLowerCase().includes(searchTerm)
  );

  songList.innerHTML = "";
  filteredSongs.forEach((song) => {
    const li = document.createElement("li");
    li.innerHTML = `${song.name} - ${song.artist} <button onclick="playSong(${song.id})">Play</button>`;
    songList.appendChild(li);
  });
}

// Additional Search Functionality for Playlists
function searchPlaylists() {
  const searchTerm = document
    .getElementById("playlistSearchInput")
    .value.toLowerCase();
  const playlistList = document.getElementById("playlistList");

  const filteredPlaylists = playlists.filter((playlist) =>
    playlist.name.toLowerCase().includes(searchTerm)
  );

  playlistList.innerHTML = "";
  filteredPlaylists.forEach((playlist) => {
    const li = document.createElement("li");
    li.innerHTML = `${playlist.name} <button onclick="renderPlaylistSongs('${playlist.name}')">Show Songs</button>`;
    playlistList.appendChild(li);
  });
}
