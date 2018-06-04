'use strict';

let modal = document.querySelector('#showModal'); // Selector for the modal
let closeModal = document.querySelector('#play'); // Selector for the button to close the modal
let showStats = document.querySelector('#show-stats');// Selector for the span element to show counter for keys picked up
let winModal = document.querySelector('#winModal'); // Selector for the win modal that will show up in a win condition
let playAgain = document.querySelector('#playAgain'); // Selector for the paly again button

// Enemies our player must avoid
class Enemy {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    constructor (y,speed) {
        this.width = 75;
        this.height = 75;
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
            this.speed = Math.floor((Math.random() * 60) + 60); //based on https://www.w3schools.com/Jsref/jsref_random.asp
        }

        //collision detection
        //based on https://developer.mozilla.org/en-US/docs/Games/Techniques/2D_collision_detection#Axis-Aligned_Bounding_Box
        if ((this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y))  {
            
            //reset player when hit by bugs
            player.x = 200;
            player.y = 400;
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
        this.y = 400;
        this.width = 75;
        this.height = 75;

    }

    update () { }

    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput (keyCode) {
        if (keyCode === 'left') {
            this.x = this.x - 50;
        } else if (keyCode === 'up') {
            this.y = this.y - 50;
        } else if (keyCode === 'right') {
            this.x = this.x + 50;
        } else if (keyCode === 'down') {
            this.y = this.y + 50;
        }

        //player cannot move off screen
        if (this.x > 400) {
            this.x = 400;
        } else if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 400) {
            this.y = 400;
        } else if (this.y < -50) {
            this.y = -50;
        }

        //win modal shows when player reach the river with the princess
        if ((this.y <= 0) && (myLady.showPrincess === true)) {
            console.log('winner');
            winModal.style.display = 'block';
            
        }
    }
    
}

// Class for the keys to be picked up by player

class PickupItem {
    constructor (x, y) {
        
        this.sprite = 'images/key.png';
        this.x = Math.floor((Math.random() * 400) + 25);
        console.log(this.x); 
        this.y = Math.floor((Math.random() * 400) + 25);
        console.log(this.y); 
        this.width = 40;
        this.height = 40;
        this.keyCounter = 0;
        this.showPrincess = false;
        this.chest = 'images/Good_Treasure_Chest_04.png';

    }
    
    render () {
            ctx.drawImage(Resources.get(this.chest), 75, 450);
            ctx.drawImage(Resources.get(this.sprite), this.x, this.y);         
    }

    gotKey () {

        
        if ((this.x < player.x + player.width &&
            this.x + this.width > player.x &&
            this.y < player.y + player.height &&
            this.height + this.y > player.y && 
            this.keyCounter <= 10 )) {      
                
                this.nextKey();                      
                }

        // Set key pos out of reach when the princess shows         
        else if (this.keyCounter >= 10) {
            this.x = - 100;
            this.y = - 100;
            }        
        }
    nextKey () {
        
        this.keyCounter++;
        this.x = Math.floor((Math.random() * 400) + 1);
        console.log(this.x);
        this.y = Math.floor((Math.random() * 400) + 1);
        console.log(this.y);
        showStats.innerHTML = '<strong>Keys collected: ' + this.keyCounter +'</strong>';
        if (this.keyCounter === 10) {
            myLady.showPrincess = true;
            }
    }    
}

// Class for the princess

class Princess {
    constructor (x, y) {
        
        this.sprite = 'images/char-princess-girl.png';
        this.x = x;
        this.y = y;
        this.width = 100;
        this.height = 100;
        //The princess is hidden in the chest
        this.showPrincess = false;

    
    }

    update () { }
    
    render () {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
        
    }

    //this will move the princess togheter with the player

    handleInput (keyCode) {
        if (keyCode === 'left') {
            this.x = this.x - 50;
        } else if (keyCode === 'up') {
            this.y = this.y - 50;
        } else if (keyCode === 'right') {
            this.x = this.x + 50;
        } else if (keyCode === 'down') {
            this.y = this.y + 50;
        }

        //princess cannot move off screen
        if (this.x > 400) {
            this.x = 400;
        } else if (this.x < 0) {
            this.x = 0;
        } else if (this.y > 400) {
            this.y = 400;
        } else if (this.y < -50) {
            this.y = -50;
        }
    }

 // this will keep the princess close to the player
    gotCaught (x,y) {

        this.y = player.y;
        this.x = player.x - 50;

        }

}

// Now instantiate your objects.
const enemy1 = new Enemy(100,300);
const enemy2 = new Enemy(140,200);
const enemy3 = new Enemy(225,150);
const enemy4 = new Enemy(300,50);

// Place all enemy objects in an array called allEnemies
const allEnemies = [enemy1, enemy2, enemy3, enemy4];

// Place the player object in a variable called player
const player = new Player();

const pickupItem1 = new PickupItem(200, 200);

// The princess shows after 10 keys is picked up
const myLady = new Princess(200, 200);

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


// Eventlistener for the clicks on the X button on modal  
closeModal.addEventListener('click', function close(event) {
modal.style.display = 'none';
})

playAgain.addEventListener('click', function newGame(event) {
    location.reload();
})