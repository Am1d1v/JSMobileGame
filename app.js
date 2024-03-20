

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

        this.enemyTimer = 0;
        this.enemyInterval = 1000; 

        this.mouse = {
            x: undefined,
            y: undefined,
            pressed: false
        }


        this.start();
        this.createEnemyPool();

        window.addEventListener('resize', (event) => {
            this.resize(event.target.innerWidth, event.target.innerHeight);
        })

        // Mouse Controll Event Listener
        window.addEventListener('mousedown', (event) => {
            event.preventDefault();

            // Set Mouse position
            this.mouse.x = event.x;
            this.mouse.y = event.y;

        })


        console.log(this.enemyPool);
    }

    // Set initial values when game starts or restarts 
    start(){
        this.resize(window.innerWidth, window.innerHeight);
    }

    // Check Collision between enemy and mouse
    checkCollision(objectOne, objectTwo){
        // If all are true we have collision
        return(
            objectOne.x < objectTwo.x + objectTwo.width &&
            objectOne.x + objectOne.width > objectTwo.x &&
            objectOne.y < objectTwo.y + objectTwo.height &&
            objectOne.y + objectOne.height > objectTwo.y 
        )
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

    // Get Enemy
    getEnemy(){
        for (let i = 0; i < this.enemyPool.length; i++) {
            if(this.enemyPool[i].free){
                return this.enemyPool[i];
            }
        }
    }

    // Handle Enemy
    handleEnemy(deltaTime){
        if(this.enemyTimer < this.enemyInterval){
            this.enemyTimer += deltaTime;
        } else {
            this.enemyTimer = 0;
            const enemy = this.getEnemy();
            
            if(enemy){
                enemy.start();
            }

        }
    }


    // Draw all enemies
    render(deltaTime){
        this.handleEnemy(deltaTime);

        this.enemyPool.forEach((enemy) => {
            enemy.draw();
            enemy.update();
        })
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


    let lastTime = 0;

    // Redraw Objects. Objects movement
    function animate(timeStamp){
        const deltaTime = timeStamp - lastTime;
        lastTime = timeStamp;
        context.clearRect(0, 0, canvas.width, canvas.height);
        game.render(deltaTime);
        requestAnimationFrame(animate);
    }
    requestAnimationFrame(animate);

})