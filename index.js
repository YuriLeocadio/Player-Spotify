// Aqui estão as referêcias que estou buscando do HTML
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');


// Aqui estão as váriaveis
const Felina = {
    songName : 'Felina',
    artist : 'Wiu',
    image : 'felina',
    music : 'felina'
};
const Coracao_De_Gelo = {
    songName : 'Coração de gelo',
    artist : 'Wiu',
    image : 'coração_de_gelo',
    music : 'coração_de_gelo'
};
const Mil_Maneiras = {
    songName : 'Mil Maneiras',
    artist : 'Veigh',
    image : 'album_veigh',
    music : 'mil_maneiras'
};
const Novo_Balanco = {
    songName : 'Novo Balanço',
    artist : 'Veigh',
    image : 'album_veigh',
    music : 'novo_balanço'
};
const WYS_Snowman = {
    songName : 'WYS Snowman',
    artist : 'Snowman',
    image : 'lofi',
    music : 'WYS'
};

let isPlaying = false;

const playlist = [Felina, Coracao_De_Gelo, Mil_Maneiras, Novo_Balanco, WYS_Snowman];

let index = 0;


// Aqui estão as funções
function playSong() {
    play.querySelector('.bi').classList.remove('bi-play-circle-fill');
    play.querySelector('.bi').classList.add('bi-pause-circle-fill');
    song.play();
    isPlaying = true;
}
function pauseSong() {
    play.querySelector('.bi').classList.remove('bi-pause-circle-fill');
    play.querySelector('.bi').classList.add('bi-play-circle-fill');
    song.pause();
    isPlaying = false;
}

function playPauseDecider() {
    if (isPlaying === true) {
        pauseSong();
    }
    else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `../src/images/${playlist[index].image}.jpg`;
    song.src = `../src/songs/${playlist[index].music}.mp3`;
    songName.innerText = playlist[index].songName;
    bandName.innerText = playlist[index].artist;
}

function previousSong() {
    if(index === 0) {
        index = playlist.length - 1;
    }
    else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if(index === playlist.length - 1) {
        index = 0;
    }
    else {
        index += 1;
    }
    initializeSong();
    playSong();
}


// Aqui estão as execuções de funções
initializeSong();


// Aqui estão os addEventListener
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong)
next.addEventListener('click', nextSong)