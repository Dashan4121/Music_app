let album = getAlbum();
if (!album) {
    renderError();
} else {
     // Вывод информации об альбоме
    renderAlbumInfo();

// Вывод треков из альбома
    renderTracks();

     // Тут будет код для запуска звуков
    setupAudio(); }

function getAlbum() {
    let search = new URLSearchParams(window.location.search);
    let i = search.get(`i`);
    return albums[i];
}
function renderError() {
    let container = document.querySelector(`.album`);
    container.innerHTML = `Ошибка! Редирект на главную страницу через 5 секунд.`;
    window.location.pathname = `index.html`;
 }
function renderAlbumInfo() {
    let container = document.querySelector(`.album`);
     container.innerHTML = `
          <div class="card mb-2">
              <div class="row">
                  <div class="col-md-4">
                      <img src="${album.img}" alt="" class="img-fluid rounded-start">
                  </div>
                  <div class="col-8">
                      <div class="card-body p-2">
                          <h5 class="card-title">${album.title}</h5>
                          <p class="card-text mb-0 pb-0">${album.description}</p>
                          <p class="card-text"><small class="text-muted">Сборник выпущен в ${album.year} году</small></p>
                      </div>
                        </div>
              </div>
          </div>`

}
function renderTracks(){
    let playlist = document.querySelector(`.playlist`);
    let tracks = album.tracks;
    for (let j = 0; j < tracks.length; j++) {
        let track = tracks[j];
        playlist.innerHTML += `
                        <li class="list-group-item d-flex align-item-center track">
                            <img src="assets/play-circle_4.png" alt="" class="me-3 mt-2 img-pause" style="cursor: pointer;" height="30px" width="30px">
                            <img src="assets/pause-alt_1.png" alt="" class="me-3 mt-2 img-play d-none" style="cursor: pointer;" height="30px" width="30px">
                            <div class="pe-3">
                                <div>${track.title}</div>
                                <div class="text-secondary">${track.author}</div>
                            </div>
                            <progress class= "progress ms-auto mt-3" value="0" max="100" style="height: 12px; font-size: 150%; background-color: cadetblue"></progress>
                            <div class="ps-4 mt-2 time">${track.time}</div>
                            <audio class="audio" src="${track.src}"></audio>
                        </li>
                        `
    }
}
function setupAudio() {
     let trackNodes = document.querySelectorAll(`.track`);
     let tracks = album.tracks;
     for (let i = 0; i < trackNodes.length; i++) {
        let node = trackNodes[i];
        let track = tracks[i];
        let timeNode = node.querySelector(`.time`);
        let impause = node.querySelector(`.img-pause`);
        let implay = node.querySelector(`.img-play`);
        let audio = node.querySelector(`.audio`);
        let progress = node.querySelector(`.progress`);
        node.addEventListener(`click`, function () {
            if (track.isPlaying) {
                track.isPlaying = false;
                audio.pause();
                impause.classList.remove(`d-none`);
                implay.classList.add(`d-none`);
            } else {
                track.isPlaying = true;
                audio.play();
                impause.classList.add(`d-none`);
                implay.classList.remove(`d-none`);
                updateProgress();
         }
     });

     function updateProgress() {
         let time = getTime(audio.currentTime);
         if (timeNode.innerHTML != time) {
             timeNode.innerHTML = time;
             progress.value= audio.currentTime * 100 /(audio.duration);
         }
         if (track.isPlaying) {
             requestAnimationFrame(updateProgress);
         }

     }
     }
 }
function getTime(time){
    let currentSeconds = Math.floor(time);
    let minutes = Math.floor(currentSeconds/60);
    let seconds = Math.floor(currentSeconds%60);
    if (minutes < 10){
        minutes=`0`+ minutes;
    }
    if (seconds < 10){
        seconds =`0`+ seconds;
    }
    return `${minutes}:${seconds}`
}









