// Aqui estão as referêcias que estou buscando do HTML
const songName = document.getElementById('song-name');
const bandName = document.getElementById('band-name');
const song = document.getElementById('audio');
const cover = document.getElementById('cover');
const play = document.getElementById('play');
const next = document.getElementById('next');
const previous = document.getElementById('previous');
const currentProgress = document.getElementById('current-progress');
const progressContainer = document.getElementById('progress-container');
const shuffleButton = document.getElementById('shuffle');
const repeatButton = document.getElementById('repeat');
const songTime = document.getElementById('song-time');
const totalTime = document.getElementById('total-time');

// Aqui estão as váriaveis
const Felina = {
    songName: 'Felina',
    artist: 'Wiu',
    image: 'felina',
    music: 'felina',
};
const Coracao_De_Gelo = {
    songName: 'Coração de gelo',
    artist: 'Wiu',
    image: 'coração_de_gelo',
    music: 'coração_de_gelo',
};
const Mil_Maneiras = {
    songName: 'Mil Maneiras',
    artist: 'Veigh',
    image: 'album_veigh',
    music: 'mil_maneiras',
};
const Novo_Balanco = {
    songName: 'Novo Balanço',
    artist: 'Veigh',
    image: 'album_veigh',
    music: 'novo_balanço',
};
const WYS_Snowman = {
    songName: 'WYS Snowman',
    artist: 'Snowman',
    image: 'lofi',
    music: 'WYS',
};

let isPlaying = false;
let isShuffled = false;
let repeatOn = false;

const originalPlaylist = [
    Felina,
    Coracao_De_Gelo,
    Mil_Maneiras,
    Novo_Balanco,
    WYS_Snowman,
];
let sortedPlaylist = [...originalPlaylist];
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
    } else {
        playSong();
    }
}

function initializeSong() {
    cover.src = `../src/images/${sortedPlaylist[index].image}.jpg`;
    song.src = `../src/songs/${sortedPlaylist[index].music}.mp3`;
    songName.innerText = sortedPlaylist[index].songName;
    bandName.innerText = sortedPlaylist[index].artist;
}

function previousSong() {
    if (index === 0) {
        index = sortedPlaylist.length - 1;
    } else {
        index -= 1;
    }
    initializeSong();
    playSong();
}

function nextSong() {
    if (index === sortedPlaylist.length - 1) {
        index = 0;
    } else {
        index += 1;
    }
    initializeSong();
    playSong();
}

function updateProgressBar() {
    const barWidth = (song.currentTime / song.duration) * 100;
    currentProgress.style.setProperty('--progress', `${barWidth}%`);
}

function jumpTo(event) {
    const width = progressContainer.clientWidth;
    const clickPosition = event.offsetX;
    const jumpToTime = (clickPosition / width) * song.duration;
    song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
    const size = preShuffleArray.length;
    let currentIndex = size - 1;
    while (currentIndex > 0) {
        let randomIndex = Math.floor(Math.random()* size);
        let aux = preShuffleArray[currentIndex];
        preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
        preShuffleArray[randomIndex] = aux;
        currentIndex -= 1;
    }
}

function shuffleButtonCLicked() {
    if(isShuffled === false) {
        isShuffled = true;
        shuffleArray(sortedPlaylist);
        shuffleButton.classList.add('button-active');
    }
    else {
        isShuffled = false;
        sortedPlaylist = [...originalPlaylist];
        shuffleButton.classList.remove('button-active');
    }
}

function repeatButtonCLicked() {
    if (repeatOn === false) {
        repeatOn = true;
        repeatButton.classList.add('button-active')
    }
    else {
        repeatOn = false;
        repeatButton.classList.remove('button-active'); 
    }
}

function nextOrRepeat() {
    if (repeatOn === false) {
        nextSong();
    }
    else {
        playSong();
    }
}

function updateCurrentTime() {
    songTime.innerText = song.currentTime;
}

function updateTotalTime() {
    totalTime.innerText = song.duration;
}

// Aqui estão as execuções de funções
initializeSong();

// Aqui estão os addEventListener
play.addEventListener('click', playPauseDecider);
previous.addEventListener('click', previousSong);
next.addEventListener('click', nextSong);
song.addEventListener('timeupdate', updateProgressBar);
song.addEventListener('ended', nextOrRepeat);
progressContainer.addEventListener('click', jumpTo);
shuffleButton.addEventListener('click', shuffleButtonCLicked);
repeatButton.addEventListener('click', repeatButtonCLicked);