

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

        
    }

    // Spawn Enemy
    start(){
        this.x = Math.random() * this.game.width;
        this.y = 0;
        this.free = false;
    }

    // Delete(Remove to Object Pool) Enemy
    reset(){
        this.free = true;
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
            if(this.game.checkCollision(this, this.game.mouse) && this.game.mouse.pressed){
                // Reset enemy if we have collision and mouse is pressed
                this.reset();
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
            this.game.context.fillStyle = 'red';
            this.game.context.fillRect(this.x, this.y, this.width, this.height);
        }
    }
    
    




}