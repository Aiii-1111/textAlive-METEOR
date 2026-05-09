// Implementing p5.js with namespacing

export const s = (sketch) =>
{
  //initialise variables
  const emoji_lst = ["⭐","🌟","✨"]
  const n_stars = 7;
  let star_arr = [];

  //update the opacity of a star and replace old invisible stars
  sketch.updateStar = (star_obj,index) =>
  {
    star_obj.alpha -= sketch.random([1,40]);
    
    //debugging
    //console.log(star_obj.alpha);

    if(star_obj.alpha <= 50)
    {
      star_arr[index] = sketch.createStar();

      //debugging
      //console.log("Star replaced");
    }
  }

  //function to initialise a star object
  sketch.createStar = () =>
  {
    let star = 
    {
      x:sketch.random(50,window.innerWidth*0.98),
      y:sketch.random(50,window.innerHeight*0.8),
      emoji:sketch.random(emoji_lst),
      size:sketch.random(25,100),
      alpha: 255,
    };

    //debugging
    //console.log(`X: ${star.x}, y: ${star.y}, star.emoji: ${star.emoji}, size: ${star.size}`)

    return star;
  }

  sketch.setup = () =>
  {
    //setup canvas
    const canvas = sketch.createCanvas(500,500, sketch.P2D);
    canvas.parent(document.querySelector("#lyric-app-bg"));
    sketch.resizeCanvas(window.innerWidth*0.98, window.innerHeight*0.8);
    sketch.frameRate(5);

    //setup stars
    for(let i = 0; i<n_stars;i++)
    {
      star_arr[i] = sketch.createStar();
    }
  }

  sketch.draw = () =>
  {
    sketch.clear();

    for(let i = 0; i<n_stars; i++)
    {
      sketch.fill(255, 204, 0,star_arr[i].alpha);
      sketch.textSize(star_arr[i].size);
      sketch.text(star_arr[i].emoji, star_arr[i].x, star_arr[i].y);

      sketch.updateStar(star_arr[i],i);
    }
  }
};
