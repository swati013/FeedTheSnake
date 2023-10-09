// Variables and constants
let snake_dir = {x:0, y:0};
let speed = 5;
let score = 0;
let highscore = 0;
let lastPaintTime = 0;
let snake_arr = [{x:13, y:15}];
food = {x:6, y:7};
const gameOverSound = new Audio("gameover.mp3");
const foodSound = new Audio("food.mp3");
const moveSound = new Audio("move.mp3"); 
const music = new Audio("music.mp3");

// Game functions
function main(ctime){
    window.requestAnimationFrame(main);

    if((ctime - lastPaintTime)/1000 < 1/speed){
        return;
    }
    lastPaintTime = ctime;
    gameEngine();
}

// Function to check the collision
function isCollide(snake_arr){
    if(snake_arr[0].x<=0 || snake_arr[0].x>=18 || snake_arr[0].y<=0 || snake_arr[0].y>=18){
        return true;
    }

    for(let i = 1;i<snake_arr.length;i++){
        if(snake_arr[0].x === snake_arr[i].x && snake_arr[0].y === snake_arr[i].y){
            return true;
        }
    }

    return false;
}

function gameEngine(){
    // Display score and highscore
    document.getElementById("score").innerHTML = score;
    document.getElementById("highscore").innerHTML = highscore;

    // Update snakeArr
    if(isCollide(snake_arr)){
        gameOverSound.play();
        snake_dir = {x:0, y:0};
        alert("Game Over!!");
        snake_arr = [{x:13, y:15}];
        if(highscore < score) {highscore = score};
        score = 0;
    }

    // Food regeneration
    if(snake_arr[0].x == food.x && snake_arr[0].y == food.y){
        foodSound.play();
        score = score + 1;
        let a = 2;
        let b = 16;
        food = {x : Math.round(a + (b-a)*Math.random()), y : Math.round(a + (b-a)*Math.random())};
        snake_arr.unshift({x: snake_arr[0].x + snake_dir.x , y: snake_arr[0].y + snake_dir.y});
    }

    // Moving the snake
    for(let i = snake_arr.length - 2;i>=0;i--){
        snake_arr[i+1] = {...snake_arr[i]};
    }

    snake_arr[0].x += snake_dir.x;
    snake_arr[0].y += snake_dir.y;

    
    // Display the snake
    board.innerHTML = "";
    snake_arr.forEach((e,index)=>{
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    // Display the food
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

// Game logic
window.requestAnimationFrame(main);
window.addEventListener('keydown', e => {
    moveSound.play();
    snake_dir = {x:0, y:1};
    switch (e.key) {
        case "ArrowUp":
            console.log("Up");
            snake_dir.x = 0;
            snake_dir.y = -1;          
            break;
        case "ArrowDown":
            console.log("Down");
            snake_dir.x = 0;
            snake_dir.y = 1;          
            break;
        case "ArrowLeft":
            console.log("Left");
            snake_dir.x = -1;
            snake_dir.y = 0;          
            break;
        case "ArrowRight":
            console.log("Right");
            snake_dir.x = 1;
            snake_dir.y = 0;          
            break;
        default:
            break;
    }
});