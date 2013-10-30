var GameObject = function(){
	this.sprite = "assets/sprite.png",
	this.defaultDirection = "down";
}
var gameObject = new GameObject();

var EntityObject = function(type, x, y){
	this.health = 100;
	this.damage = 10;
	this.pos = new Point(x, y);
	this.dir = 0;

	this.draw = function(game){

		var vW = game.config.screen.vW;
		var vH = game.config.screen.vH;
		var tileSize = game.config.screen.tileSize
		var image = sprites[getSpriteByName("player")].image;

		var playerX = game.player.pos.x;
		var playerY = game.player.pos.y;

		var startX = playerX - Math.round(vW/2);
      	var startY = playerY - Math.round(vH/2);


		var thisX = this.pos.x-startX;
		var thisY = this.pos.y-startY;



		game.context.drawImage(image,0, this.dir*tileSize, tileSize, tileSize, thisX*tileSize,thisY*tileSize,tileSize,tileSize);

		
		//game.context.drawImage(image,0, this.dir*tileSize, tileSize, tileSize, this.pos.x*tileSize,this.pos.y*tileSize,tileSize,tileSize);
	}

	$.extend(this, gameObject);
}
var entityObject = new EntityObject();


//AN IDEA
//
//new Entity("player", x, y);
//$.extend(this, entities[type]);
//var entities = {}


var PlayerObject = function(x,y){
	$.extend(this, entityObject);
	this.type = 'player';
	this.health = 200;
	this.pos = new Point(x, y)
	this.sprite = 0;

	this.keyStates = {
		up: false,
		left: false,
		right: false,
		down: false,
		hit: false
	}
	
	this.move = function(game){

		if (this.keyStates.up == true){
			if(game.level[this.pos.y-1][this.pos.x]==1){
				this.pos.y -= 1;
				this.dir = 2;
			}
		} else if (this.keyStates.left == true){
			if(game.level[this.pos.y][this.pos.x-1]==1){
				this.pos.x -= 1;
				this.dir = 1;
			}
		} else if (this.keyStates.right == true){ 
			if(game.level[this.pos.y][this.pos.x+1]==1){
				this.pos.x += 1;
				this.dir = 3;
			}
		} else if (this.keyStates.down == true){ 
			if(game.level[this.pos.y+1][this.pos.x]==1){
				this.pos.y += 1;
				this.dir = 0;
			}
	
		}
	}

	this.attack = function(game){

		if (this.keyStates.hit == false) {
			var isHitting = false;
		}

		if (this.keyStates.hit == true){
			console.log("ATTACK BUTTON");
			if (collision(game.player, game.enemy) && isHitting == false){
				game.enemy.health -= game.player.damage;
				console.log(game.enemy.health);
				isHitting = true;
			} else {
				console.log("Cool down buddy");
			}
		}

		return false;


		// if (this.keyStates.hit == true && collision(game.player, game.enemy)){
		// 	console.log("timer hit the spot");

//				console.log("YES IM HERE!")
				// window.setInterval(function(){
				// 	game.enemy.health -= game.player.damage;
				// 	console.log(game.enemy.health);
				// }, 5000);
			}

	// function DirectionUpdate(){
	// 	//Update direction based on movement
	// 	//var = direction;
	// }
	// 
	var that = this;

	$(document).bind('draw',
		function PlayerDraw() {
			that.draw(game);
			//console.log("Player Draw"); //Debugging
		}
	);

	$(document).bind('update',
		function PlayerMove(){
			that.move(game);
			that.attack(game);
		}	
	);

	// $(document).bind('action',
	// 	function PlayerAction(){
	// 		that.attack(game);
	// 	}
	// );
	// 

}
var playerObject = new PlayerObject();


var EnemyObject = function(x,y){
	$.extend(this, entityObject);
	this.type = 'enemy';
	this.damage = 5;
	this.pos = new Point(x, y);
	this.sprite = 0;

	this.hit = function(){
		game.player.health -= this.damage
	}

	var that = this;

	$(document).bind('draw',
		function EnemyDraw(){
			that.draw(game);
		}
	);

	$(document).bind('update',
		function(){
			// var col = new Collision(that, playerObject);
			// col.checkTile(); 
			// Collision(that, playerObject).checkTile()	
		
			// if(collision(game.enemy, game.player)){
			// 	that.hit();
			// 	console.log(game.player.health);
			// }

		}
		
	);
}

var enemyObject = new EnemyObject();




