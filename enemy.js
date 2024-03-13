

// Enemy Class. Enemies behavior
class Enemy {
    constructor(game){
        this.game = game;

        // Enemies' Coordinates
        this.x = Math.random() * this.game.width;
        this.y = 200;

        // Enemies' Speed
        this.speedX = 0;
        this.speedY = Math.random() * 4 + 1;

        // Enemies' Size
        this.width = 50;
        this.height = 50;
    }

    // Render(draw) an enemy
    draw(){
        this.game.context.fillStyle = 'red';
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }

    // Update Enemy's data(coordinates position)
    update(){
        this.x += this.speedX;
        this.y += this.speedY;

        if(this.y > this.game.height){
            this.x = Math.random() * this.game.width;
            this.y = 0;
        }
    }
}