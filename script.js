const albums = [
    {
        img: 'assets/cover-1.png',
        music: 'assets/lost-in-city-lights-145038.mp3',
        title: 'Lost in the City Lights',
        subtitle: 'Cosmo Sheldrake'
    },
    {
        img: 'assets/cover-2.png',
        music: 'assets/forest-lullaby-110624.mp3',
        title: 'Forest Lullaby',
        subtitle: 'Lesfm'
    }
]

let coverIImage = document.getElementById("coverImage")
let title = document.getElementById("title")
let subtitle = document.getElementById("subtitle")
let currentTime = document.getElementById("currentTime")
let duration = document.getElementById("duration")
let play = document.getElementById("play")
let next = document.getElementById("next")
let prev = document.getElementById("prev")
let audio = document.getElementById("audio")
let progressBar = document.getElementById("progressBar")
let mainProgress = document.getElementById("mainProgress")

play.addEventListener('click', () => {
    if(play.classList.contains('play')) {
        audio.play()
        play.src = 'assets/pause.svg'
        console.log(true);
        play.classList.remove('play')
        play.classList.add('pause')
    } else {
        audio.pause()
        play.src = 'assets/Play_fill.svg'
        play.classList.add('play')
        play.classList.remove('pause')
    }
})

function timeConverter(music) {
    let minutes = Math.floor(music / 60);
    let secChecker = Math.round(music % 60);
    let secCustom = secChecker < 10 ? '0'+secChecker : secChecker 
    let seconds = secCustom == 60 ? '59' : secCustom
    return `${minutes}:${seconds}`
}

window.addEventListener('load', () => {
    coverIImage.src = albums[0].img;
    title.innerHTML = albums[0].title;
    subtitle.innerHTML = albums[0].subtitle;
    // audio.src = albums[0].music;
    currentTime.innerHTML = '0:00'
    duration.innerHTML = timeConverter(audio.duration)
})

setInterval(() => {
    currentTime.innerHTML = timeConverter(audio.currentTime)
    var progress = (audio.currentTime / audio.duration) * 100 + '%';
    progressBar.style.width = progress;
}, 500)

audio.addEventListener('ended', () => {
    play.src = 'assets/Play_fill.svg'
    play.classList.add('play')
    play.classList.remove('pause')
})

let currentItem = 0;

next.addEventListener('click', () => {
    currentItem++;
    if(currentItem >= albums.length) {
        currentItem = 0;
    }

    coverIImage.src = albums[currentItem].img;
    title.innerHTML = albums[currentItem].title;
    subtitle.innerHTML = albums[currentItem].subtitle;
    audio.src = albums[currentItem].music;
    currentTime.innerHTML = '0:00'
    setInterval(() =>  {duration.innerHTML = timeConverter(audio.duration)}, 500)
    play.src = 'assets/Play_fill.svg'
    play.classList.add('play')
    play.classList.remove('pause')
})

prev.addEventListener('click', () => {
    currentItem--;
    if(currentItem < 0) {
        currentItem = albums.length - 1;
    }

    coverIImage.src = albums[currentItem].img;
    title.innerHTML = albums[currentItem].title;
    subtitle.innerHTML = albums[currentItem].subtitle;
    audio.src = albums[currentItem].music;
    currentTime.innerHTML = '0:00'
    setInterval(() =>  {duration.innerHTML = timeConverter(audio.duration)}, 500)
    play.src = 'assets/Play_fill.svg'
    play.classList.add('play')
    play.classList.remove('pause')
})

mainProgress.addEventListener('click', (e) => {
    let clickPosition = event.clientX - mainProgress.getBoundingClientRect().left;
    let clickPercent = Math.round((clickPosition / mainProgress.offsetWidth) * 100);
    let clickCurrentTime = ((audio.duration * clickPercent) / 100)
    audio.currentTime = clickCurrentTime
    progressBar.style.width = clickPercent + '%';
})