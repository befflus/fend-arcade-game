'use strict';

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor (y,speed) {
        this.width = 50;
        this.height = 50;
        this.sprite = 'images/enemy-bug.png';
        this.x = 0;
        this.y = y;
        this.speed = speed;
    }

    // Update the enemy's position, required method for game
    // Parameter: dt, a time delta between ticks
    update (dt) {
        // You should multiply any movement by the dt parameter
        // which will ensure the game runs at the same speed for
        // all computers.
        this.x += dt * this.speed;

        //when enemies get across, put the bug back to start.
            if (this.x > 500) {
            this.x = 1;
            this.speed = Math.floor(((Math.random()*100) + 50)); //based on https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
        }

        //collision detection
        //based on https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
        if ((this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y) ||
            (player.y == -60)) {  //reset player when it reaches the water.
            player.x = 200;
            player.y = 380;
        }
    }

    // Draw the enemy on the screen, required method for game
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
class Player {
    constructor () {
        
        this.sprite = 'images/char-boy.png';
        this.x = 200;
        this.y = 380;
        this.width = 50;
        this.height = 50;

    }

    update () { }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (keyCode) {
        if (keyCode === 'left') {
            this.x = this.x - 50;
        } else if (keyCode === 'up') {
            this.y = this.y - 40;
        } else if (keyCode === 'right') {
            this.x = this.x + 50;
        } else if (keyCode === 'down') {
            this.y = this.y + 40;
        }

        //player cannot move off screen
        if (this.x > 400) {
            this.x = 400;
        } else if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 380) {
            this.y = 380;
        } else if (this.y < -50) {
            this.y = -50;
        }

        //win
        if (this.y <= -30) {
            window.alert('Please add modal here');
        }
    }
}

class PickupItem {
    constructor (x, y) {
        
        this.sprite = 'images/key.png';
        this.x = Math.random() * (400 - 10) + 10; 
        this.y = Math.random() * (400 - 10) + 10; 
        this.width = 5;
        this.height = 5;
        this.keyCounter = 0;

    }
    
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    gotKey () {

        
        if ((this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y)) {      

                this.keyCounter++; // add key to collected keys
                this.resetPlayer();
                this.nextKey();
                console.log(this.keyCounter);

                }        
        }
    nextKey () {
        this.x = Math.random() * (400 - 10) + 10;
        this.y = Math.random() * (400 - 10) + 10;
        }
    resetPlayer () {
        player.x = 200;
        player.y = 380;
    }
}
// Now instantiate your objects.
const enemy1 = new Enemy(100,300);
const enemy2 = new Enemy(140,200);
const enemy3 = new Enemy(225,150);
const enemy4 = new Enemy(325,50);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player
const player = new Player();

const pickupItem1 = new PickupItem(200, 200);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    const allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});