//constants
var X = 101;
var Y = 83;
var player_start_x = X * 2;
var player_start_y = Y * 5;
var max_speed = 750;
var min_speed = 100;

// Enemies----------------------------------------------------------------------------------------------------
var Enemy = function(x, y) {
    //stores score of the player
    this.score = 0;
    this.x = x;
    this.y = y;
    //Random speed to the enemy
    this.speed = Math.random() * (max_speed - min_speed) + min_speed;
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    if (this.x > X * 5) {
        this.x = 0;
        this.speed = Math.random() * (max_speed - min_speed) + min_speed;
    }
    this.x += this.speed * dt;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//Player-------------------------------------------------------------------------------------------------------

var Player = function(x, y) {
    this.score = 0;
    this.x = x;
    this.y = y;
    this.sprite = 'images/char-boy.png';
};

//checks wether the Player is colliding with the enemy or not
Player.prototype.collision = function(enemy) {
    var dx = this.x - enemy.x;
    var dy = this.y - enemy.y;
    //for logical collision
    var distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 50) {
        return true;
    } else {
        return false;
    }
};

//Input handling
Player.prototype.handleInput = function(key) {
    switch (key) {
        case "left":
            if (this.x != 0) {
                this.x = this.x - X;

            }
            break;
        case "up":
            if (this.y != 0) {
                this.y = this.y - Y;
                if (this.y == 0) {
                    this.score += 10;
                    this.y = Y * 5;
                    this.x = X * 2;
                }
            }
            break;
        case "right":
            if (this.x != 5 * X - X) {
                this.x = this.x + X;
            }
            break;
        case "down":
            if (this.y != 5 * Y) {
                this.y = this.y + Y;
            }
            break;
    }
};

Player.prototype.update = function() {
    //if there is a collision the player is reset to the start square
    for (var i = 0; i < allEnemies.length; i++) {
        if (this.collision(allEnemies[i])) {
            this.y = player_start_y;
            this.x = player_start_x;
            this.score = 0;
            return true;
        }
    }
};


Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    //Score display
    ctx.font = "30px Sans";
    ctx.fillStyle = "white";
    ctx.textAlign = "right";
    ctx.fillText("Score: " + this.score, 450, 450);
};

//instantiating
var allEnemies = [new Enemy(0, Y * 3), new Enemy(0, Y * 2), new Enemy(0, Y * 1), new Enemy(0, Y * 2)];
var player = new Player(player_start_x, player_start_y);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
