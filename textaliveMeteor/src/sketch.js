// Implementing p5.js with namespacing

export const s = (sketch) =>
{
  const emoji_lst = ["⭐","🌟","✨"]
  
  sketch.createStar = () =>
  {
    const star = 
    {
      x:sketch.random(50,window.innerWidth*0.98),
      y:sketch.random(50,window.innerHeight*0.8),
      emoji:sketch.random(emoji_lst),
      size:sketch.random(25,100),
      lifespan:sketch.random(255, 300)
    };

    return star;
  }

  sketch.setup = () =>
  {
    const canvas = sketch.createCanvas(500,500, sketch.P2D);
    canvas.parent(document.querySelector("#lyric-app-bg"));
    sketch.resizeCanvas(window.innerWidth*0.98, window.innerHeight*0.8);
    sketch.frameRate(1);
  }

  sketch.draw = () =>
  {
    sketch.clear()
    sketch.fill(255);

    let new_star = sketch.createStar();
    sketch.textSize(new_star.size);
    sketch.text(new_star.emoji, new_star.x, new_star.y)

  }
};
