import { Player } from "textalive-app-api";
import p5 from "p5";

//get HTML objects
const play_button = document.querySelector("#play-button");
const pause_button = document.querySelector("#pause-button");
const restart_button = document.querySelector("#restart-button");

const song_name_display = document.querySelector("#song-name");
const song_producer_display = document.querySelector("#song-producer");
const song_info_display = document.querySelector("#extra-song-info");

play_button.disabled = true;
pause_button.disabled = true;
restart_button.disabled = true;

//create methods & listeners for textalive player
function onAppReady(app)
{
    player.createFromSongUrl("http://www.nicovideo.jp/watch/sm33334184");
}

function onTimerReady(timer)
{
    //display song info
    song_name_display.textContent = "Song Name: " + player.data.song.name
    song_producer_display.textContent = "Producer: " + player.data.song.artist.name;
    song_info_display.textContent = "Published: " + player.data.song.created_at + " (" + player.video.duration + "ms)";

    //add button event listeners and enable them
    play_button.addEventListener("click", ()=> player.requestPlay());
    pause_button.addEventListener("click", ()=> player.requestPause());
    restart_button.addEventListener("click", ()=> player.requestMediaSeek(0));

    play_button.disabled = false;
    pause_button.disabled = false;
    restart_button.disabled = false;

}

function onTimeUpdate(position)
{
    //const current_word =;

    
}

//methods for drawing with p5
function setup()
{
}

//initialise player
const player = new Player({app:{token:"ToQM0IhgEahcXQEo"},
    mediaElement: document.querySelector("#media")});

player.addListener({onAppReady, onTimerReady, onTimeUpdate});