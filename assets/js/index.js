let inputDirection = { x: 0, y: 0 };  //direction initilizes with 0
let snakeArray = [
    { x: 10, y: 10 }           // snake body as array
];
snakeFood = { x: 18, y: 22 };  // food object
lastInputDirection = { x: 0, y: 0 };
score = 0;
speed = 5;
lastTime = 0;

// audios
// const foodSound = new Audio("../assets/audio/food.mp3")
// const backgroundMusic=new Audio("../assets/audio/music.mp3")
const gameEnd = new Audio("../assets/audio/gameover.mp3")

var foodSound = document.getElementById("food");
foodCount = 0;
var playpause = document.getElementById('playpause');
var audio = document.getElementById('audio');
var count = 0
function playSound() {
    if (count == 0) {
        count = 1;
        audio.play();
        playpause.innerHTML = "MUSIC &#9611;"
        if (snakeArray[0].y == snakeFood.y && snakeArray[0].x == snakeFood.x) {
            foodSound.play();
        }
    }
    else {
        count = 0;
        audio.pause();
        playpause.innerHTML = "MUSIC &#9658;"
    }
}

// collide with the snake itself
function isCollide(snake) {
    for (let i = 1; i < snakeArray.length; i++) {
        if (snake[i].x === snake[0].x && snake[i].y === snake[0].y) {
            return true;
        }
    }
    // hit the wall
    if (snake[0].x > 24 || snake[0].x < 0 || snake[0].y > 24 || snake[0].y < 0) {
        return true;
    }
}

// animation function   
function main(currentTime) {
    window.requestAnimationFrame(main);
    if ((currentTime - lastTime) / 1000 < 1 / speed) {
        return;
    }
    lastTime = currentTime;
    // console.log(currentTime) 
    gameStart();
}

// main functions

function gameStart() {
    // Display Snake
    field.innerHTML = "";
    snakeArray.forEach((e, index) => {
        snakeElement = document.createElement("div");
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if (index === 0) {
            snakeElement.classList.add('snakeHead');
        }
        else {
            snakeElement.classList.add('snake');
        }
        field.appendChild(snakeElement);
    })
    // Displaying Food
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = snakeFood.y;
    foodElement.style.gridColumnStart = snakeFood.x;
    foodElement.classList.add('food');
    field.appendChild(foodElement);
    //updating snake array and food
    if (isCollide(snakeArray)) {
        inputDirection = { x: 0, y: 0 };
        // backgroundMusic.pause();
        gameEnd.play();
        // alert("Game Over! Press any key to play again.");
        field.style.opacity = "0.6";
        gameCard.style.display = "block";
        gameCard.innerHTML = "Score : " + score + "<br><br>Game Over! <br> Press any key to play again.";
        snakeArray = [{ x: 10, y: 15 }];
        score = 0;
        scoreCard.innerHTML = "Score : " + score;
    }
    //After food eaten increment score and regenerate food again
    if (snakeArray[0].y == snakeFood.y && snakeArray[0].x == snakeFood.x) { //checking food location and snake head loction
        // foodSound.play();
        score += 2;
        scoreCard.innerHTML = "Score : " + score;
        // if same location then add element to snakeArray
        snakeArray.unshift({ x: snakeArray[0].x + inputDirection.x, y: snakeArray[0].y + inputDirection.y });
        let a = 2;
        let b = 22;
        // randomly generating new food location
        snakeFood = { x: Math.round(a + (b - a) * Math.random()), y: Math.round(a + (b - a) * Math.random()) }
    }
    //Moving the snake
    for (let i = snakeArray.length - 2; i >= 0; i--) {
        snakeArray[i + 1] = { ...snakeArray[i] };
    }
    snakeArray[0].x += inputDirection.x;
    snakeArray[0].y += inputDirection.y;
    lastInputDirection = inputDirection;
}
// EventListener
window.addEventListener("keydown", e => {
    gameCard.style.display = "none";
    field.style.opacity = "1";
    inputDirection = { x: 0, y: 1 };  //start the game
    switch (e.key) {
        case "ArrowUp":
            if (lastInputDirection.y !== 0) break
            inputDirection.x = 0;
            inputDirection.y = -1;
            console.log("ArrowUp");
            break;

        case "ArrowDown":
            if (lastInputDirection.y !== 0) break
            inputDirection.x = 0;
            inputDirection.y = 1;
            console.log("ArrowDown");
            break;

        case "ArrowLeft":
            if (lastInputDirection.x !== 0) break
            inputDirection.x = -1;
            inputDirection.y = 0;
            console.log("ArrowLeft");
            break;

        case "ArrowRight":
            if (lastInputDirection.x !== 0) break
            inputDirection.x = 1;
            inputDirection.y = 0;
            console.log("ArrowRight")
            break;

        default:
            break;
    }
})
// animation function
window.requestAnimationFrame(main);
