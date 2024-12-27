console.log("welcome to spotify");

//Initialize the variable

let songIndex = 0;

let audioElement = new Audio('song/Heeriye.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from( document.getElementsByClassName("songItem"));

let songs = [
    {songName:"Gulabi-Sadi", filePath:"song/1.mp3", coverPath:"covers/Gulabi sari.jpg"},
    {songName:"Heeriye", filePath:"song/2.mp3", coverPath:"covers/heeriye.jpg"},
    {songName:"Hind-Ke-Sitara-Raja-Ji", filePath:"song/3.mp3", coverPath:"covers/raja ji.jpg"},
    {songName:"Illuminati", filePath:"song/4.mp3", coverPath:"covers/illuminati.jpg"},
  
    {songName:"Sajani-Re", filePath:"song/5.mp3", coverPath:"covers/sajani re.jpg"},
  

]
songItems.forEach((element, i) =>{
    console.log(element, i);
    element.getElementsByTagName("img")[0].src =songs[i].coverPath;
    element.getElementsByClassName("songName")[0].innerText=songs[i].songName;

})

//audioElement.play();

//handle play and pause click
masterPlay.addEventListener('click', ()=> {
    if(audioElement.paused || audioElement.currentTime<=0 ){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity=1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity=0;
    }
})
//Listen to Events
audioElement.addEventListener('timeupdate', ()=> {
    console.log("timeupdate");
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    console.log(progress);
    myProgressBar.value = progress;

})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;

})

const makeAllPlay =() => {
    Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>{
        
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    
    })

}

Array.from(document.getElementsByClassName("songItemPlay")).forEach((element) =>{
    element.addEventListener("click", (e)=>{
        console.log(e);
        
        makeAllPlay();
        masterSongName.innerText = songs[songIndex].songName;
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `song/${songIndex+1}.mp3`;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity=1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if (songIndex>=4) {
        songIndex = 0;
    } else {
        songIndex += 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})

document.getElementById('previous').addEventListener('click', ()=>{
    if (songIndex<=0) {
        songIndex = 0;
    } else {
        songIndex -= 1;
    }
    audioElement.src = `song/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})