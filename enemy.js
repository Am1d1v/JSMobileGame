

// Enemy Class. Enemies behavior
class Enemy {
    constructor(game){
        this.game = game;

        // Enemies' Coordinates
        this.x = Math.random() * this.game.width;
        this.y = -this.height;

        // Enemies' Speed
        this.speedX = 0;
        this.speedY = Math.random() * 5 + 1;

        // Enemies' Size
        this.width = 50;
        this.height = 50;

        // Enemy status. If this status === true then it can be used again. If === false then this object is currently active int he game
        this.free = true;

        // Enemies' health points
        this.lives;
        
    }

    // Spawn Enemy
    start(){
        this.x = Math.random() * this.game.width;
        this.y = 0;
        this.free = false;
        this.lives = 2;
    }

    // Delete(Remove to Object Pool) Enemy
    reset(){
        this.free = true;
    }

    // Check is enemy alive
    isAlive(){
        return this.lives >= 1;
    }

    // Update Enemy's data(coordinates position)
    update(){

        if(!this.free){

            this.x += this.speedX;
            this.y += this.speedY;

            if(this.y > this.game.height){
                // Return Object to the Enemy Pool
                this.reset();

                this.x = Math.random() * this.game.width;
                this.y = -this.height;
            }

            if(this.y < 0){
                this.y += 6;
            }

            // Check Collision
            if(this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed && !this.game.mouse.fired){
                // Decrease enemy lives
                this.lives--;

                this.game.mouse.fired = true;
            }

            // Reset enemy if it's dead
            if(!this.isAlive()){
                // Reset enemy(return to the object pool) if we have collision and mouse is pressed
                this.reset();

                // When enemy is destroyed increase score by 1;
                this.game.score++;
            }
    
            // Make sure always visible
            if(this.x > this.game.wight - this.width){
                this.x = this.game.wigth - this.width;
            }
        }

    }

    // Render(draw) an enemy
    draw(){
        if(!this.free){
            this.game.context.strokeRect(this.x, this.y, this.width, this.height);
            // Show enemies lives
            this.game.context.fillText(this.lives, this.x + this.width * 0.5, this.y + this.height * 0.5)
        }
    }
    
    




}