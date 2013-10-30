function Point(x,y){
  this.x = x;
  this.y = y;
}


function Timer(now){
  this.updateTime = now; 
  this.animTime = now;
  this.actionTime = now;

  this.tick = function(game){
    var newTime = Date.now();
    var updateDelta = newTime - this.updateTime;
    var animDelta = newTime - this.animTime;
    // var actionDelta = newTime - this.actionTime;


    if (updateDelta > 100){
      this.updateTime = newTime;
      update();
    }

    if (animDelta > 1000){
      this.animTime = newTime;
      animate();
    }

    // if (actionDelta > 500){
    //   this.actionTime = newTime;
    //   action(); 
    // }

  }
}

function collision(o1, o2){ 

  if(o1.pos.x+1 == o2.pos.x && o1.pos.y == o2.pos.y){
      return true;
  }

  if(o1.pos.x-1 == o2.pos.x && o1.pos.y == o2.pos.y){
      return true;
  }

  if(o1.pos.y+1 == o2.pos.y && o1.pos.x == o2.pos.x){
      return true;
  }

  if(o1.pos.y-1 == o2.pos.y && o1.pos.x == o2.pos.x){
      return true;
  }

  return false;

}


function getSpriteByName(name){
  if(sprites.length){
      for(i=0; i<sprites.length; i++){
        if(sprites[i].name == name){
          return i;
        }
      }
  }
  return false;
}


