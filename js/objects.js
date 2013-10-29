var GameObject = function(){
	this.sprite = "assets/sprite.png",
	this.defaultDirection = "down";
}
var gameObject = new GameObject();

var EntityObject = function(type, x, y){
	this.health = 100;
	this.damage = 10;
	this.type = type;
	this.pos = new Point(x, y);
	this.dir = 0;

	$.extend(this, gameObject);
}
var entityObject = new EntityObject();


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


	this.draw = function(game){
		var tileSize = game.config.screen.tileSize
		// game.context.fillStyle="#44601A";
		// game.context.fillRect();
		var image = sprites[getSpriteByName("player")].image;
		game.context.drawImage(image,  0, this.dir*tileSize, tileSize, tileSize, this.pos.x*tileSize,this.pos.y*tileSize,tileSize,tileSize);

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
		// if (this.keyStates.hit == true){
		// 	console.log("ATTACK BUTTON");
		// 	if (collision(game.player, game.enemy)){
		// 		game.enemy.health -= game.player.damage;
		// 		console.log(game.enemy.health);
		// 	}
		// }

		// return false;

		var time = Date.now();
		var cooldown = 1000;
		var attackCount = -1000;
		if (this.keyStates.hit == true && time > (cooldown + attackCount) ){
			console.log("timer hit the spot");
			if (collision(game.player, game.enemy)){
				game.enemy.health -= game.player.damage;
				console.log(game.enemy.health);
			}
		}

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
	this.xPos = x;
	this.yPos = y;
	this.sprite = 0;

	this.draw = function(game){
		var tileSize = game.config.screen.tileSize
		var image = sprites[getSpriteByName("player")].image;
		game.context.drawImage(image,0, this.dir*tileSize, tileSize, tileSize, this.xPos*tileSize,this.yPos*tileSize,tileSize,tileSize);
	}


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
			//var col = new Collision(that, playerObject);
			//col.checkTile(); 
			//Collision(that, playerObject).checkTile()	
		
			// if(collision(game.enemy, game.player)){
			// 	that.hit();
			// 	console.log(game.player.health);
			// }

		}
		
	);
}

var enemyObject = new EnemyObject();




