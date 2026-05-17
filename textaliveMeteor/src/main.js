import { Player, Ease} from "textalive-app-api";
import { s } from "/src/sketch.js";
import p5 from "p5";

//get HTML objects
const play_button = document.querySelector("#play-button");
const pause_button = document.querySelector("#pause-button");
const restart_button = document.querySelector("#restart-button");

const song_name_display = document.querySelector("#song-name");
const song_producer_display = document.querySelector("#song-producer");
const song_info_display = document.querySelector("#extra-song-info");

const current_text_display = document.querySelector("#text");

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
    song_info_display.textContent = "Published: " + player.data.song.created_at + " (" + player.video.duration/1000 + "s)";

    //add button event listeners and enable them
    play_button.addEventListener("click", ()=> {player.requestPlay()});
    pause_button.addEventListener("click", ()=> {player.requestPause()});
    restart_button.addEventListener("click", ()=> {player.requestMediaSeek(0);
        current_text_display.textContent = "";
    });

    play_button.disabled = false;
    pause_button.disabled = false;
    restart_button.disabled = false;

}

function onTimeUpdate(pos)
{

    //get current word, position & chorus (if applicable)
    const position = player.timer.position;
    const current_word = player.video.findWord(position);
    const chorus = player.findChorus(position)
    //chorus&&(console.log(chorus));

    //animate (text fade in)
    const wordAnim = Ease.cubicOut(current_word.progress(position));
    
    //update text with animations
    current_word && (current_text_display.textContent = current_word?.text);
    current_text_display.style.opacity = String(wordAnim);
    
    //experiment with detecting chorus repetitive segments
    if(chorus && position > chorus.startTime && position < chorus.endTime )
    {
        document.getElementById("lyric-app-bg").style.animation = "chorusBgAnim 3s infinite";
    }
    else
    {
        document.getElementById("lyric-app-bg").style.animation = "bgGradientAnim 5s infinite";
    }


}

//initalise p5 sketch
let p5sketch = new p5(s);

//initialise player
const player = new Player({app:{token:"ToQM0IhgEahcXQEo"},
    mediaElement: document.querySelector("#media")});

player.addListener({onAppReady, onTimerReady, onTimeUpdate});