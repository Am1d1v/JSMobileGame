

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
            width: 1,
            height: 1,
            pressed: false,
            fired: false
        }

        // Game Score
        this.score = 0;

        // Player's Lives. If we lose them => game over
        this.lives;

        // Crew Mmebers Image
        this.crewImage = document.querySelector('#crew');

        // How many score player have to get to win
        this.winningScore = 3;

        this.message1 = 'Run!';
        this.message2 = 'Press "Enter" or "R" to start';

        // Is game over boolean status
        this.gameOver = true;

        this.resize(window.innerWidth, window.innerHeight);
        // Restart Game Button
        this.resetButton = document.querySelector('#resetButton');

        this.resetButton.addEventListener('click', (event) => {
            this.start();
        })

        this.createEnemyPool();

        window.addEventListener('resize', (event) => {
            this.resize(event.target.innerWidth, event.target.innerHeight);
        })

        // Pressed Mouse Controll Event Listener
        window.addEventListener('mousedown', (event) => {
            event.preventDefault();

            // Set Mouse position and pressed status
            this.mouse.x = event.x;
            this.mouse.y = event.y;
            this.mouse.pressed = true;

            // 'Reload' mouse fire
            this.mouse.fired = false;
        })

        // Mouse up Event Listener
        window.addEventListener('mouseup', (event) => {

            // Set Mouse position and pressed status
            this.mouse.x = event.x;
            this.mouse.y = event.y;
            this.mouse.pressed = false;
        });

        // Mobile Touch. Do the same thing as mouse down event
        window.addEventListener('touchstart', (event) => {

            // Set Mouse position and pressed status
            this.mouse.x = event.changedTouches[0].pageX;
            this.mouse.y = event.changedTouches[0].pageY;
            this.mouse.pressed = true;

            // 'Reload' mouse fire
            this.mouse.fired = false;

        });


        // Mobile Touch. Do the same thing as mouse up event
        window.addEventListener('touchend', (event) => {

            // Set Mouse position and pressed status
            this.mouse.x = event.changedTouches[0].pageX;
            this.mouse.y = event.changedTouches[0].pageY;
            this.mouse.pressed = false;
        });

        // Select fullscreen button element
        this.fullScreenButton = document.querySelector('#fullScreenButton');

        this.fullScreenButton.addEventListener('click', (event) => {
            this.toggleFullScreen();
        });

        // Start the game keys
        window.addEventListener('keyup', (event) => {
            if (event.key === 'Enter' || event.key.toLowerCase() === 'r'){
                this.start();
                // Activate fullscreen
            } else if (event.key === ' ' || event.key.toLowerCase() === 'f'){
                this.toggleFullScreen();
            }
        });
        
    }

    // Set initial values when game starts or restarts 
    start(){
        this.resize(window.innerWidth, window.innerHeight);

        // Set score to 0;
        this.score = 0;

        // Set Player's Lives
        this.lives = 15;

        // Set game over status
        this.gameOver = false;

        // Reset all active enemies
        this.enemyPool.forEach(enemy => {
            enemy.reset();
        })
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
        this.context.strokeStyle = 'white';
        this.context.font = '50px Bangers';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
    }

    // Toggle fullscreen
    toggleFullScreen(){
        if(!document.fullscreenElement){
            document.documentElement.requestFullscreen()
        } else if (document.exitFullscreen){
            document.exitFullscreen();
        }
        
    }

    // Fill the Enemy Pool
    createEnemyPool(){
        for(let i = 0; i < this.numberOfEnemies; i++){
            this.enemyPool.push(new Beetlemorph(this));
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

    // Game Over 
    triggerGameOver(){
        if(!this.gameOver){
            // Set geame over status
            this.gameOver = true;

            // Player is dead
            if(this.lives < 1){
                this.message1 = 'You Lost';
                this.message2 = 'Game Over';

                // Player win
            } else if (this.score += this.winningScore){
                this.message1 = 'Well Done';
                this.message2 = 'Game Over';
            }
        }
    }

    // Game Test Status. Show Total Scores
    drawStatusText(){
        this.context.save();
        this.context.textAlign = 'left';
        this.context.fillText('Score: ' + this.score, 20, 30);

        // Playe's Health Bars
        for(let i = 0; i < this.lives; i++){
            this.context.drawImage(this.crewImage, 15 + 20 * i, 60, 15, 30)
        }

        // Call game over trigger
        if(this.lives < 1 || this.score >= this.winningScore){
            this.triggerGameOver();
        }

        // Game Over === true
        if(this.gameOver){
            this.context.textAlign = 'center';
            this.context.font = '60px Bangers'
            this.context.fillText(this.message1, this.width * 0.5, this.height * 0.5);
            this.context.fillText(this.message2, this.width * 0.5, this.height * 0.55);
        }

        this.context.restore();
    }

    // Draw all enemies
    render(deltaTime){
        // Enemies will not spawn untill the game starts
        if(!this.gameOver) {
            this.handleEnemy(deltaTime);
        };

        this.drawStatusText();

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