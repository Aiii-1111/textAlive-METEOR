import { Player } from "textalive-app-api";

//Get HTML objects
const play_button = document.querySelector("#play-button");
const pause_button = document.querySelector("#play-button");
const restart_button = document.querySelector("#play-button");

const song_name_display = document.querySelector("#song-name");
const song_producer_display = document.querySelector("#producer-name");

play_button.disabled = true;
pause_button.disabled = true;
restart_button.disabled = true;

//create methods & listeners
function OnAppReady(app)
{
    createFromSongUrl("http://www.nicovideo.jp/watch/sm33334184");
}

function onTimerReady(timer)
{
    // add button event listeners and enable them
    play_button.addEventListener("click", ()=> player.requestPlay());
    pause_button.addEventListener("click", ()=> player.requestPause());
    restart_button.addEventListener("click", ()=> player.requestMediaSeek(0));

    play_button.disabled = false;
    pause_button.disabled = false;
    restart_button.disabled = false;

}

function onTimeUpdate(t)
{
    const current_word = " ";

    
}

//Initialise player
const player = new Player({app:{token:"ToQM0IhgEahcXQEo"},
mediaElement: document.querySelector("#media")});

player.addListener({OnAppReady, onTimerReady, onTimeUpdate});