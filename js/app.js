// Define initial player score of 0.
let score = 0;
document.getElementById('score').innerHTML = `Your score is ${score}`;

// Define function enemies player must avoid
let Enemy = function(x, y, speed) {
    // Use image/sprite to load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;
};

// Update the enemies position
Enemy.prototype.update = function(dt) {
// Multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    this.x < 600 ? this.x += (150 * dt) : this.x = -90;

// If the enemy and the player collide.
    if(this.x < player.x + 30 &&
        this.x + 60 > player.x &&
        this.y < player.y + 60 &&
        this.y + 40 > player.y) {
        score = 0;
        document.getElementById('score').innerHTML = `Your score is ${score}`;
        player.reset();
    }

};

// Render enemies on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define player class with update(), render() and a handleInput() method.
let Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 320;
};

// Each time position is updated, call player function
Player.prototype.update = function() {
    // When the player reached the water, add 1 to score and reset player position
    if (player.y < 20) {
    score++;
    document.getElementById('score').innerHTML = `Your score is ${score}`;
    this.reset();
}
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(keyPress) {
    if(keyPress == 'left' && this.x > 0) {
        this.x -= 60;
    }
    if(keyPress == 'right' && this.x < 400) {
        this.x += 60;
    }
    if(keyPress == 'up' && this.y > 3) {
        this.y -= 60;
    }
    if(keyPress == 'down' && this.y < 400) {
        this.y += 60;
    }
};

// Player return start position
Player.prototype.reset = function() {
    this.x = 200;
    this.y = 320;
};

// Instantiate Enemies objects.
let firstEnemy = new Enemy(-65, 95);
let secondEnemy = new Enemy(-215, 175);
let thirdEnemy = new Enemy(-375, 215);
let lastEnemy = new Enemy(-565, 215);

// Place all enemy objects in an array called allEnemie
let allEnemies = [firstEnemy, secondEnemy, thirdEnemy, lastEnemy]
// Place the player object in a letiable called player
let player = new Player();

// This listens for key presses and sends the keys to Player.handleInput() method
document.addEventListener('keyup', function(event) {
    let permissionKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(permissionKeys[event.keyCode]);
});
