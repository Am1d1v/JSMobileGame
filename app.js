


// Enemy Class. Enemies behavior
class Enemy {

}

// Game Class. Logic of the game
class Game {
    constructor(canvas){
        this.canvas = canvas;
        this.width = this.canvas.width;
        this.height = this.canvas.height;

        window.addEventListener('resize', (event) => {
            this.resize(event.target.width, event.target.innerHeight);
        })
    }

    // Resize window
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1');
    const context = canvas.getContext('2d');

    // Set Full width and Height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const game = new Game(canvas)

})