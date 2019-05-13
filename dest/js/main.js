"use strict";

/* Resources.js
 * This is simply an image loading utility. It eases the process of loading
 * image files so that they can be used within your game. It also includes
 * a simple "caching" layer so it will reuse cached images if you attempt
 * to load the same image multiple times.
 */
(function () {
  var resourceCache = {};
  var readyCallbacks = [];
  /* This is the publicly accessible image loading function. It accepts
   * an array of strings pointing to image files or a string for a single
   * image. It will then call our private image loading function accordingly.
   */

  function load(urlOrArr) {
    if (urlOrArr instanceof Array) {
      /* If the developer passed in an array of images
       * loop through each value and call our image
       * loader on that image file
       */
      urlOrArr.forEach(function (url) {
        _load(url);
      });
    } else {
      /* The developer did not pass an array to this function,
       * assume the value is a string and call our image loader
       * directly.
       */
      _load(urlOrArr);
    }
  }
  /* This is our private image loader function, it is
   * called by the public image loader function.
   */


  function _load(url) {
    if (resourceCache[url]) {
      /* If this URL has been previously loaded it will exist within
       * our resourceCache array. Just return that image rather than
       * re-loading the image.
       */
      return resourceCache[url];
    } else {
      /* This URL has not been previously loaded and is not present
       * within our cache; we'll need to load this image.
       */
      var img = new Image();

      img.onload = function () {
        /* Once our image has properly loaded, add it to our cache
         * so that we can simply return this image if the developer
         * attempts to load this file in the future.
         */
        resourceCache[url] = img;
        /* Once the image is actually loaded and properly cached,
         * call all of the onReady() callbacks we have defined.
         */

        if (isReady()) {
          readyCallbacks.forEach(function (func) {
            func();
          });
        }
      };
      /* Set the initial cache value to false, this will change when
       * the image's onload event handler is called. Finally, point
       * the image's src attribute to the passed in URL.
       */


      resourceCache[url] = false;
      img.src = url;
    }
  }
  /* This is used by developers to grab references to images they know
   * have been previously loaded. If an image is cached, this functions
   * the same as calling load() on that URL.
   */


  function get(url) {
    return resourceCache[url];
  }
  /* This function determines if all of the images that have been requested
   * for loading have in fact been properly loaded.
   */


  function isReady() {
    var ready = true;

    for (var k in resourceCache) {
      if (resourceCache.hasOwnProperty(k) && !resourceCache[k]) {
        ready = false;
      }
    }

    return ready;
  }
  /* This function will add a function to the callback stack that is called
   * when all requested images are properly loaded.
   */


  function onReady(func) {
    readyCallbacks.push(func);
  }
  /* This object defines the publicly accessible functions available to
   * developers by creating a global Resources object.
   */


  window.Resources = {
    load: load,
    get: get,
    onReady: onReady,
    isReady: isReady
  };
})();
"use strict";

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

var Enemy =
/*#__PURE__*/
function () {
  function Enemy() {
    _classCallCheck(this, Enemy);

    this.sprite = 'dest/images/enemy-bug.png';
    this.speed = Math.floor(Math.random() * 200) + 100;
    this.reset();
  }

  _createClass(Enemy, [{
    key: "update",
    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    value: function update(dt) {
      this.x += this.speed * dt;

      if (this.x > 510) {
        this.reset();
      }

      ;
    }
  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }, {
    key: "reset",
    value: function reset() {
      // These are the possible position properties for each enemy
      var startingX = [-100, -75, -50, -25];
      var startingY = [60, 140, 220]; //Starts enemy at random location relative to determined x and y positions

      this.x = startingX[Math.floor(Math.random() * startingX.length)];
      this.y = startingY[Math.floor(Math.random() * startingY.length)];
    }
  }]);

  return Enemy;
}();

;

var Player =
/*#__PURE__*/
function () {
  function Player() {
    _classCallCheck(this, Player);

    _defineProperty(this, "lifeCounter", 3);

    _defineProperty(this, "counter", 1);

    this.sprite = 'dest/images/char-boy.png';
    this.reset();
  }

  _createClass(Player, [{
    key: "update",
    value: function update() {
      //Check if player reached the end
      if (this.y === -20) {
        this.levelCounter();
        this.reset();
      }

      this.checkCollision();
    }
  }, {
    key: "checkCollision",
    value: function checkCollision() {
      // Check whether enemy hits player
      for (var i = 0; i < allEnemies.length; i++) {
        var enemy = allEnemies[i];

        if (enemy.y === this.y) {
          if (enemy.x >= this.x - 70 && enemy.x <= this.x + 50) {
            this.lifeCounter;
            this.lifeCounter--;
            document.querySelector('.lives').textContent = "Lives: ".concat(this.lifeCounter);
            this.reset();
          }

          ;
        }

        ;
      }

      ;
    }
  }, {
    key: "render",
    value: function render() {
      ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
  }, {
    key: "handleInput",
    value: function handleInput(keyPress) {
      // Tiles are spaced 100 by 80
      // top left is 0, -20
      // Max x range is 400
      var maxX = [0, 400]; // Max y range is 380

      var maxY = [-20, 380]; // Calculate movement amount based on borders

      var moveUp = this.y - 80 >= maxY[0] ? 80 : 0;
      var moveRight = this.x + 100 <= maxX[1] ? 100 : 0;
      var moveDown = this.y + 80 <= maxY[1] ? 80 : 0;
      var moveLeft = this.x - 100 >= maxX[0] ? 100 : 0;

      if (keyPress === 'up') {
        this.y -= moveUp;
      } else if (keyPress === 'right') {
        this.x += moveRight;
      } else if (keyPress === 'left') {
        this.x -= moveLeft;
      } else if (keyPress === 'down') {
        this.y += moveDown;
      }
    }
  }, {
    key: "levelCounter",
    value: function levelCounter() {
      if (this.y === -20) {
        this.counter;
        this.counter++;
        document.querySelector('.level').textContent = "Level ".concat(this.counter);
      }
    }
  }, {
    key: "lifeCount",
    value: function lifeCount() {
      this.lifeCounter;
      this.lifeCounter--;
      document.querySelector('.lives').textContent = "Lives: ".concat(this.lifeCounter);
    }
  }, {
    key: "resetGame",
    value: function resetGame() {
      if (document.querySelector('.level').textContent === "Lives: 0") {
        document.querySelector('.lives').textContent = "Lives: 3";
        document.querySelector('.level').textContent = "Level 1";
      }

      ;
    }
  }, {
    key: "reset",
    value: function reset() {
      //starts character at determined location
      this.x = 200;
      this.y = 380;
    }
  }]);

  return Player;
}();

;
var enemy1 = new Enemy();
var enemy2 = new Enemy();
var enemy3 = new Enemy();
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(); // This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.

document.addEventListener('keyup', function (e) {
  var allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };
  player.handleInput(allowedKeys[e.keyCode]);
});
"use strict";

/* Engine.js
 * This file provides the game loop functionality (update entities and render),
 * draws the initial game board on the screen, and then calls the update and
 * render methods on your player and enemy objects (defined in your app.js).
 *
 * A game engine works by drawing the entire game screen over and over, kind of
 * like a flipbook you may have created as a kid. When your player moves across
 * the screen, it may look like just that image/character is moving or being
 * drawn but that is not the case. What's really happening is the entire "scene"
 * is being drawn over and over, presenting the illusion of animation.
 *
 * This engine makes the canvas' context (ctx) object globally available to make
 * writing app.js a little simpler to work with.
 */
var Engine = function (global) {
  /* Predefine the variables we'll be using within this scope,
   * create the canvas element, grab the 2D context for that canvas
   * set the canvas element's height/width and add it to the DOM.
   */
  var doc = global.document,
      win = global.window,
      canvas = doc.createElement('canvas'),
      ctx = canvas.getContext('2d'),
      lastTime;
  canvas.width = 505;
  canvas.height = 606;
  doc.body.appendChild(canvas);
  /* This function serves as the kickoff point for the game loop itself
   * and handles properly calling the update and render methods.
   */

  function main() {
    /* Get our time delta information which is required if your game
     * requires smooth animation. Because everyone's computer processes
     * instructions at different speeds we need a constant value that
     * would be the same for everyone (regardless of how fast their
     * computer is) - hurray time!
     */
    var now = Date.now(),
        dt = (now - lastTime) / 1000.0;
    /* Call our update/render functions, pass along the time delta to
     * our update function since it may be used for smooth animation.
     */

    update(dt);
    render();
    /* Set our lastTime variable which is used to determine the time delta
     * for the next time this function is called.
     */

    lastTime = now;
    /* Use the browser's requestAnimationFrame function to call this
     * function again as soon as the browser is able to draw another frame.
     */

    win.requestAnimationFrame(main);
  }
  /* This function does some initial setup that should only occur once,
   * particularly setting the lastTime variable that is required for the
   * game loop.
   */


  function init() {
    reset();
    lastTime = Date.now();
    main();
  }
  /* This function is called by main (our game loop) and itself calls all
   * of the functions which may need to update entity's data. Based on how
   * you implement your collision detection (when two entities occupy the
   * same space, for instance when your character should die), you may find
   * the need to add an additional function call here. For now, we've left
   * it commented out - you may or may not want to implement this
   * functionality this way (you could just implement collision detection
   * on the entities themselves within your app.js file).
   */


  function update(dt) {
    updateEntities(dt); // checkCollisions();
  }
  /* This is called by the update function and loops through all of the
   * objects within your allEnemies array as defined in app.js and calls
   * their update() methods. It will then call the update function for your
   * player object. These update methods should focus purely on updating
   * the data/properties related to the object. Do your drawing in your
   * render methods.
   */


  function updateEntities(dt) {
    allEnemies.forEach(function (enemy) {
      enemy.update(dt);
    });
    player.update();
  }
  /* This function initially draws the "game level", it will then call
   * the renderEntities function. Remember, this function is called every
   * game tick (or loop of the game engine) because that's how games work -
   * they are flipbooks creating the illusion of animation but in reality
   * they are just drawing the entire screen over and over.
   */


  function render() {
    /* This array holds the relative URL to the image used
     * for that particular row of the game level.
     */
    var rowImages = ['dest/images/water-block.png', // Top row is water
    'dest/images/stone-block.png', // Row 1 of 3 of stone
    'dest/images/stone-block.png', // Row 2 of 3 of stone
    'dest/images/stone-block.png', // Row 3 of 3 of stone
    'dest/images/grass-block.png', // Row 1 of 2 of grass
    'dest/images/grass-block.png' // Row 2 of 2 of grass
    ],
        numRows = 6,
        numCols = 5,
        row,
        col; // Before drawing, clear existing canvas

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    /* Loop through the number of rows and columns we've defined above
     * and, using the rowImages array, draw the correct image for that
     * portion of the "grid"
     */

    for (row = 0; row < numRows; row++) {
      for (col = 0; col < numCols; col++) {
        /* The drawImage function of the canvas' context element
         * requires 3 parameters: the image to draw, the x coordinate
         * to start drawing and the y coordinate to start drawing.
         * We're using our Resources helpers to refer to our images
         * so that we get the benefits of caching these images, since
         * we're using them over and over.
         */
        ctx.drawImage(Resources.get(rowImages[row]), col * 101, row * 83);
      }
    }

    renderEntities();
  }
  /* This function is called by the render function and is called on each game
   * tick. Its purpose is to then call the render functions you have defined
   * on your enemy and player entities within app.js
   */


  function renderEntities() {
    /* Loop through all of the objects within the allEnemies array and call
     * the render function you have defined.
     */
    allEnemies.forEach(function (enemy) {
      enemy.render();
    });
    player.render();
  }
  /* This function does nothing but it could have been a good place to
   * handle game reset states - maybe a new game menu or a game over screen
   * those sorts of things. It's only called once by the init() method.
   */


  function reset() {} // noop

  /* Go ahead and load all of the images we know we're going to need to
   * draw our game level. Then set init as the callback method, so that when
   * all of these images are properly loaded our game will start.
   */


  Resources.load(['dest/images/stone-block.png', 'dest/images/water-block.png', 'dest/images/grass-block.png', 'dest/images/enemy-bug.png', 'dest/simages/char-boy.png']);
  Resources.onReady(init);
  /* Assign the canvas' context object to the global variable (the window
   * object when run in a browser) so that developers can use it more easily
   * from within their app.js files.
   */

  global.ctx = ctx;
}(void 0);