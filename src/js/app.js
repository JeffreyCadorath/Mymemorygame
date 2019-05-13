class Enemy  {
  constructor() {
    this.sprite = 'src/images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 200) + 100;   
    this.reset();
  };

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
  
  update = function(dt) {     
    this.x += this.speed * dt;
    if (this.x > 510) {
      this.reset();
    };
  };

  render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  reset = function() {
    // These are the possible position properties for each enemy
    let startingX = [-100, -75, -50, -25];
    let startingY = [60, 140, 220];
    //Starts enemy at random location relative to determined x and y positions
    this.x = startingX[Math.floor(Math.random() * startingX.length)];
    this.y = startingY[Math.floor(Math.random() * startingY.length)];
  };
};

class Player {
  constructor() {
    this.sprite = 'src/images/char-boy.png';
    this.reset();
  };

  lifeCounter = 3;
  
  update = function() {
    //Check if player reached the end
    if (this.y === -20) {
      this.levelCounter();
      this.reset();
    }
      this.checkCollision();
  };
  
  checkCollision = function() {
    // Check whether enemy hits player
    for (let i = 0; i < allEnemies.length; i++ ) {
      let enemy = allEnemies[i];
      if(enemy.y === this.y) {
        if(enemy.x >= this.x - 70 && enemy.x <= this.x + 50) {
          this.lifeCounter;
          this.lifeCounter--
          document.querySelector('.lives').textContent = 
          `Lives: ${this.lifeCounter}`
          this.reset();
        };
      };
    };
  };

  render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
  };

  handleInput = function(keyPress) {
    // Tiles are spaced 100 by 80
    
    // top left is 0, -20
    
    // Max x range is 400
    let maxX = [0, 400];

    // Max y range is 380
    let maxY = [-20, 380];

    // Calculate movement amount based on borders
    let moveUp = (this.y - 80 >= maxY[0]) ? 80 : 0;
    let moveRight = (this.x + 100 <= maxX[1]) ? 100 : 0;
    let moveDown = (this.y + 80 <= maxY[1]) ? 80 : 0;
    let moveLeft = (this.x - 100 >= maxX[0]) ? 100 : 0;

    if (keyPress === 'up') {
        this.y -= moveUp;
    } else if (keyPress === 'right') {
        this.x += moveRight;
    } else if (keyPress === 'left') {
        this.x -= moveLeft;
    } else if (keyPress === 'down') {
        this.y += moveDown;
    }
  };

  counter = 1;
  
  levelCounter = function() {
    if(this.y === -20) {
      this.counter;
      this.counter++;
      document.querySelector('.level').textContent = `Level ${this.counter}`
    }
  };

  lifeCount = function() {
    this.lifeCounter;
    this.lifeCounter--
    document.querySelector('.lives').textContent = 
    `Lives: ${this.lifeCounter}`
  };

  resetGame = function() {
      if(document.querySelector('.level').textContent === `Lives: 0`) {
        document.querySelector('.lives').textContent = `Lives: 3`;
        document.querySelector('.level').textContent = `Level 1`
    };
  };


  reset = function() {
    //starts character at determined location
    this.x = 200;
    this.y = 380;  
  };
};

let enemy1 = new Enemy();
let enemy2 = new Enemy();
let enemy3 = new Enemy();

let allEnemies = [enemy1, enemy2, enemy3];

let player = new Player();

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