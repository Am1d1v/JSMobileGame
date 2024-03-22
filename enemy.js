

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

        // Sprite's frame. Help to randomize image of spawned enemies
        this.frameY;
        this.frameX;
        // Serves to show sprite of destroyed enemy
        this.lastFrame;

        // Enemies' Size
        this.width = this.spriteWidth;
        this.height = this.spriteHeight;

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

                // If Enemy Succesfully(Alive) moved from top of the screen to the bottom decrease player's health by 1
                this.game.lives--;
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

    // Render(draw) an enemy
    draw(){
        if(!this.free){

            // Draw Enemy Image
            this.game.context.drawImage(this.image, this.frameX * this.spriteWidth, this.frameY * this.spriteHeight, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height)

            this.game.context.strokeRect(this.x, this.y, this.width, this.height);

            // Show enemies lives
            this.game.context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5)
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