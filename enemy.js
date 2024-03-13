

// Enemy Class. Enemies behavior
class Enemy {
    constructor(game){
        this.game = game;

        // Enemies' Coordinates
        this.x;
        this.y;

        // Enemies' Speed
        this.speedX;
        this.speedY;

        // Enemies' Size
        this.width = 50;
        this.height = 50;
    }

    // Render(draw) an enemy
    draw(){
        this.game.context.fillRect(this.x, this.y, this.width, this.height);
    }
}