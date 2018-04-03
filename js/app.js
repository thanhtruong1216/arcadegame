// Render player's score on screen
let score = 0;
document.getElementById('score').innerHTML = `Your score is ${score}`;

// Define function enemies player must avoid
let Enemy = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;

// Use image/sprite to load images
  this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
// Multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
  this.x += this.speed * dt;
  if (this.x > 550) {
    this.x = -100;
    this.speed = 100 + Math.floor(Math.random() * 512);
  }

// If the enemy and the player collide.
  if (player.x < this.x + 60 &&
    player.x + 37 > this.x &&
    player.y < this.y + 25 &&
    30 + player.y > this.y) {
    player.x = 200;
    player.y = 380;
    score = 0;
    document.getElementById('score').innerHTML = `Your score is ${score}`;
  }
};

// Render enemies on the screen
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Define player class with update(), render() and a handleInput() method.
let Player = function(x, y, speed) {
  this.x = x;
  this.y = y;
  this.speed = speed;
// Use image/sprite to load images
  this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function() {
  if(this.y > 380) {
    this.y = 380;
  }
  if(this.x > 400) {
    this.x = 400;
  }
  if(this.x < 0) {
    this.x = 0;
  }
  // When the player reached the water, add one point to score and layer return start position
  if(this.y < 0) {
    this.x = 200;
    this.y = 380;
    score++;
    document.getElementById('score').innerHTML = `Your score is ${score}`;
  }
};

// Render player on the screen
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Set up keyPress action(up, down, left, right)
Player.prototype.handleInput = function(keyPress) {
  switch (keyPress) {
    case 'left':
      this.x -= this.speed + 60;
      break;
    case 'up':
      this.y -= this.speed + 30;
      break;
    case 'right':
      this.x += this.speed + 60;
      break;
    case 'down':
      this.y += this.speed + 30;
      break;
  }
};

// Instantiate objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let allEnemies = [];
let enemyPosition = [60, 140, 220];
let player = new Player(200, 380, 50);
let enemy;

enemyPosition.forEach(function(arg) {
  enemy = new Enemy(0, arg, 100 + Math.floor(Math.random() * 512));
  allEnemies.push(enemy);
});

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  let allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});