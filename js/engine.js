/**
 * This hosts the engine/controllers for the game.
 * This will be where we host our GLOBAL update function.
 * This is here we will be checking keystrokes.
 */

console.log("%cChocolate V0.01", "color:white;background-color:#401E03;font-size:24px;");
console.log("%cVersion: Andy", "font-size:18px;background-color:black;color:white;");
var game;

// GLOBAL UPDATE FUNCTIONS TIES INTO THE DIFFERENT LOOPS
/**
 * Loops are within the helpers.js file
 */
function draw(){
  $(document).trigger('draw');
};

function update(){
  $(document).trigger('update');
};

function animate(){
  $(document).trigger('animate');
};

// function action(){
//   $(document).trigger('action');
// };

//GLOBAL CONFIGURATIONS

var gameConfig = {
	screen: {
		canvas: 'gameFrame',
		tileSize: 32,
    vW: 13,
    vH: 9
	}
}

var levelConfig = {
  startPos:{
    x: 1,
    y: 1
  },
 level: level,
}

//START THE GAME ENGINE!!!
function Game(config, level){
  this.config = gameConfig;
  this.context;
  this.level = levelConfig.level;
  this.player;
  //this.timer = new Timer(Date.now());

  this.init = function(){
    //DEBUG
    //console.log(this.config);

    var canvas = $('#gameFrame')[0];
    this.context = canvas.getContext("2d");
    this.timer = new Timer(Date.now());
    var tileSize = this.config.screen.tileSize;

    this.mapWidth = this.level[0].length;
    this.mapHeight = this.level.length;
    canvas.width = tileSize*this.config.screen.vW;
    canvas.height = tileSize*this.config.screen.vH;

    this.enemy = new EnemyObject(6, 3);
    this.player = new PlayerObject(5, 5);

    //DEBUG
    //console.log(tileSize);

    this.start();

  }

    /**
     * Start, intiates the engine and starts the gameLoop
     * @return {loop} game.draw, and game.timer.tick(game)
     */
    this.start = function(){
      //Save this function within a constant to call upon
      //itself
      var that = this;

      (function gameLoop(){
        that.draw();
        that.timer.tick(that);
        requestAnimationFrame(gameLoop);
      })();

      console.info("%cStarting engine!", "color: blue;");
    }



    /**
     * ReDraws for every frame the canvas.
     * Draws the map.
     */

    this.draw = function(update){

      var drawX = 0; //Where to draw X from
      var drawY = 0; //Where to draw Y from

      var tileSize = this.config.screen.tileSize

      /**
       * Viewport
       * Defines the viewport that is drawn on the canvas
       */
      var vW = this.config.screen.vW;
      var vH = this.config.screen.vH;
      var startX = this.player.pos.x - Math.round(vW/2);
      var endX = startX + vW;
      var startY = this.player.pos.y - Math.round(vH/2);
      var endY = startY + vH;


      for(y=startY; y<endY; y++){

        for(x=startX; x<endX; x++){

          if(x>=0 && x<this.level[0].length && y>=0 && y<this.level.length){
            //paint block
            var tile = this.level[y][x];
            if(tile == 0){
              this.context.fillStyle = "#000000";
              this.context.fillRect(drawX, drawY, tileSize, tileSize);

            } else if(tile == 1){
              this.context.fillStyle = "#00FF00";
              this.context.fillRect(drawX, drawY, tileSize, tileSize);
            }

            
          } else {
            this.context.fillStyle = "#CCCCCC";
            this.context.fillRect(drawX, drawY, tileSize, tileSize);
          }

          
          drawX = drawX+tileSize;
        }

        drawY = drawY+tileSize;
        drawX = 0;

      }
      draw();
    }

  //KEYBOARD INPUTS
  /**
   * Triggers player movement by tying into the keyStates.
   * Triggers the player "action" by tying into the keyStates.
   */

  this.initInput = function(){
    $(document).bind('keydown' ,function(e){
      //console.log(e.which);
      if (e.which == 38){
        e.preventDefault();
        game.player.keyStates.up = true;
      } 
      if (e.which == 40){
        e.preventDefault();
        game.player.keyStates.down = true;
      }
      if (e.which == 37){
        e.preventDefault();
        game.player.keyStates.left = true;
      }
      if (e.which == 39){
        e.preventDefault();
        game.player.keyStates.right = true;
      }
      if (e.which == 32){
        e.preventDefault();
        game.player.keyStates.hit = true;
      }
    }); 

    $(document).bind('keyup' ,function(e){

      if (e.which == 38){
        e.preventDefault();
        game.player.keyStates.up = false;

      } 
      if (e.which == 40){
        e.preventDefault();
        game.player.keyStates.down = false;
      }
      if (e.which == 37){
        e.preventDefault();
        game.player.keyStates.left = false;

      }
      if (e.which == 39){
        e.preventDefault();
        game.player.keyStates.right = false;
      }
      if (e.which == 32){
        e.preventDefault();
        game.player.keyStates.hit = false;
      }
    }); 
  }
}

//preload tiles
    // for(i=0; i < tiles.length; i++){
    //   if(tiles[i].image){
    //     var img = new Image();
    //     img.src = tiles[i].image;
    //     tiles[i].image = img;
    //   }
    // }

    //console.log("tiles preloaded!")

  //preload sprites
  for(i=0; i < sprites.length; i++){
    if(sprites[i].image){
      var img = new Image();
      img.src = sprites[i].image;
      sprites[i].image = img;
    }
  }

  console.log("%cSprites preloaded!", "color:orange;")
