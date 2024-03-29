

// Enemy Class. Enemies behavior
class Enemy {
    constructor(game){
        this.game = game;

        // Enemies' Coordinates
        this.x = Math.random() * this.game.width;
        this.y = -this.height;

        // Enemies' Speed
        this.speedX;
        this.speedY;

        // Sprites
        this.spriteWidth = 100;
        this.spriteHeight = 100;

        // Size of enemy. 
        this.sizeModifier = Math.random() * 0.9 + 0.3;

        // Enemies' Size
        this.width = this.spriteWidth * this.sizeModifier;
        this.height = this.spriteHeight * this.sizeModifier;

        // Sprite's frame. Help to randomize image of spawned enemies
        this.frameY;
        this.frameX;
        // Serves to show sprite of destroyed enemy. Last horizontal frame of the image
        this.lastFrame;

        this.minFrame;
        this.maxFrame;


        // Enemy status. If this status === true then it can be used again. If === false then this object is currently active int he game
        this.free = true;

        // Enemies' health points
        this.lives;
        
    }

    // Spawn Enemy
    start(){
        this.x = Math.random() * this.game.width;
        this.y = 0;
        this.frameY = Math.floor(Math.random() * 3);
        this.frameX = 0;
        this.free = false;
    }

    // Delete(Remove to Object Pool) Enemy
    reset(){
        this.free = true;
    }

    // Check is enemy alive
    isAlive(){
        return this.lives >= 1;
    }

    // Hits to enemies
    hit(){
        // Check Collision
        if(this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired){
            // Decrease enemy lives
            this.lives--;

            this.game.mouse.fired = true;
        }
    }

    // Update Enemy's data(coordinates position)
    update(){

        if(!this.free){

            this.x += this.speedX;
            this.y += this.speedY;

            // Enemy Succesfully(Alive) moved from top of the screen to the bottom
            if(this.y > this.game.height){
                // Return Object to the Enemy Pool
                this.reset();

                if(!this.game.gameOver){

                    // If Enemy Succesfully(Alive) moved from top of the screen to the bottom decrease player's health by 1
                    this.game.lives--;
                }

            }

            if(this.y < 0){
                this.y += 6;
            }
    
            // Make sure always visible
            if(this.x > this.game.wight - this.width){
                this.x = this.game.wigth - this.width;
            }

            // Show frame of destroyed enemy
            if(!this.isAlive()){

                if(this.game.spriteUpdate){
                    this.frameX++;

                    if(this.frameX > this.lastFrame){
                        // Reset enemy(return to the object pool) if we have collision and mouse is pressed
                        this.reset();
    
                        if(!this.game.gameOver){
    
                            // When enemy is destroyed increase score by 1;
                            this.game.score++;
                        }
                    }
                }
                
            }


        }

    }

    // Render(draw) an enemy
    draw(){
        if(!this.free){

            // Draw Enemy Image
            this.game.context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)

            // If debug modes is activated => show hitboxes and heath points
            if(this.game.debug){
                
            this.game.context.strokeRect(this.x, this.y, this.width, this.height);

            // Show enemies lives
            this.game.context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5)
            }

        }
    }
    

}


// Different Enemy Types

// Beetlemorph Enemy Class
class Beetlemorph extends Enemy {
    constructor(game){
        super(game);
        this.image = document.querySelector('#beetlemorph');
    }

    // Spawn Enemy
    start(){
        super.start();
        this.speedX = 0;
        this.speedY = Math.random() * 2 + 1;
        this.lives = 2;
        this.lastFrame = 3;
    }

    update(){
        super.update();
        if(!this.free){
            if(this.isAlive()){
                this.hit();
            }
        }
    }

}

// Lobstermorph Enemy Class
class Lobstermorph extends Enemy {
    constructor(game){
        super(game);
        this.image = document.querySelector('#lobstermorph');
        this.lastFrame = 14;
    }

    start(){
        super.start();
        this.speedX = 0;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.lives = 3;
    }

    update(){
        super.update();

        if(!this.free){
            // Handle Sprite State
            if(this.lives >= 3){
                this.maxFrame = 0;
            } else if (this.lives === 2){
                this.maxFrame = 3;
            } else if (this.lives === 1){
                this.maxFrame = 7;
            }

            if(this.isAlive()){
                this.hit();
                if(this.frameX < this.maxFrame && this.game.spriteUpdate){
                    this.frameX++;
                }
            }
        }
    }

}

// Phantommorph Enemy Class
class Phantommorph extends Enemy {
    constructor(game){
        super(game)
        this.image = document.querySelector('#phantommorph');
        this.lastFrame = 14;

        // All possible states
        this.states = [new Flying(game, this), new Phasing(game, this), new Imploding(game, this)];

        this.currentState;

        this.switchTimer = 0;
        this.switchInterval = Math.random() * 1800 + 1000;
    }
    
    start(){
        super.start();
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * 0.5 + 0.2;
        this.lives = 1;

        // Certain Frame Range
        this.minFrame = 0;
        this.maxFrame = 2;

        // Set current state
        this.setState( Math.floor(Math.random() * 2) );
    }

    // Set Different State
    setState(state){
        this.currentState = this.states[state];
        this.currentState.start();
    }

    handleAnimationFrame(){
        if(this.game.spriteUpdate){
            if(this.frameX < this.maxFrame){
                this.frameX++;
            } else {
                this.frameX = this.minFrame
            }
        }
    }

    // Switch state
    switch(){
        if(this.currentState === this.states[0]){
            // Set Phasing State
            this.setState(1);
        } else {
            // Set Imploding State
            this.setState(0);
        }
    }

    // Check collision between mouse and enemy object
    hit(){
        super.hit();
        if(!this.isAlive()){
            // If enemy is not alive set Impoding state
            this.setState(2);
        }
    }

    update(deltaTime){
        super.update();
        if(!this.free){

            this.handleAnimationFrame();
            this.currentState.update();

            // Bounce left/right so enemies cannot move off screen
            if(this.x <= 0 || this.x >= this.game.width - this.width){
                this.speedX *= -1;
            }

            // Check is enemy got hit
            if(this.isAlive()){
                this.hit();
            }

            // Switch Enemy States
            if(this.isAlive()){
                if(this.switchTimer < this.switchInterval){
                    this.switchTimer += deltaTime;
                } else {
                    this.sizeModifier = 0;
                    this.switch();
                }
            }
        }
    }
    
}


// Enemy State Design Pattern
class EnemyState{
    constructor(game, enemy) {
        this.game = game;
        this.enemy = enemy;
    }
}


// State Subclasses
// Flying - default enemy state, while it is existing in this "dimension"
// Phasing
// Imploding 

class Flying extends EnemyState {

    start(){
        this.enemy.minFrame = 0;
        this.enemy.maxFrame = 2;

        // Make enemy immediately invisible
        this.enemy.frameX = this.enemy.minFrame;
    }

    update(){
        this.enemy.hit();
        this.enemy.handleAnimationFrame();
    }
}


class Phasing extends EnemyState {

    start(){
        this.enemy.minFrame = 3;
        this.enemy.maxFrame = 5;
        // Make enemy immediately invisible
        this.enemy.frameX = this.enemy.minFrame;
    }

    update(){
        // Check Collision
        if(this.game.checkCollision(this.enemy, this.game.mouse) && this.game.mouse.pressed){

            // When we attack enemy in Phasing state we give it speed boost
            this.enemy.y += 30;
        }
    }
}


class Imploding extends EnemyState {

    start(){
        this.enemy.minFrame = 6;
        this.enemy.maxFrame = this.enemy.lastFrame + 1;

        // Make enemy immediately invisible
        this.enemy.frameX = this.enemy.minFrame;
    }

    update(){

    }
}