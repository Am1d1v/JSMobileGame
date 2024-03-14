

// Game Class. Logic of the game
class Game {
    constructor(canvas, context){
        this.canvas = canvas;
        this.context = context;
        this.width = this.canvas.width;
        this.height = this.canvas.height;
    
        // Enemy Pool
        this.enemyPool = [];
        this.numberOfEnemies =  10;

        this.start();
        this.createEnemyPool();

        window.addEventListener('resize', (event) => {
            this.resize(event.target.innerWidth, event.target.innerHeight);
        })


        console.log(this.enemyPool);
    }

    // Set initial values when game starts or restarts 
    start(){
        this.resize(window.innerWidth, window.innerHeight);
    }

    // Resize window
    resize(width, height){
        this.canvas.width = width;
        this.canvas.height = height;
        this.width = width;
        this.height = height;
        this.context.fillStyle = 'white';
    }

    // Fill the Enemy Pool
    createEnemyPool(){
        for(let i = 0; i < this.numberOfEnemies; i++){
            this.enemyPool.push(new Enemy(this));
        }
    }


    // Draw all enemies
    render(){
        
    }
}

window.addEventListener('load', () => {
    const canvas = document.querySelector('#canvas1');
    const context = canvas.getContext('2d');

    // Set Full width and Height
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    context.fillStyle = 'white';

    const game = new Game(canvas, context)

    // Redraw Objects. Objects movement
    function animate(){
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render(context);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

})