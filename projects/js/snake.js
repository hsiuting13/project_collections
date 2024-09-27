const canvas = document.querySelector("#myCanvas");
const ctx = canvas.getContext("2d");

// snake object (array of segments)
let snake = [{ x: 50, y: 50 }];
// Size of each segment
const segmentSize = 30;
// Initial direction
let snakeDirection = "right";
// apple object
const APPLE = {
  x: Math.floor(Math.random() * (canvas.width / segmentSize)) * segmentSize,
  y: Math.floor(Math.random() * (canvas.height / segmentSize)) * segmentSize,
  width: segmentSize,
  height: segmentSize,
};


// Game state variable
let gameStarted = false; // Flag to check if the game has started
let inputLocked = false; // Lock to prevent multiple key presses
let gameOver = false; // Game over flag
let wallHit = false; // Flag to detect wall hit
// Timing variables to control speed
let lastRenderTime = 0;
const snakeSpeed = 5;
// create a snake (green dot)
function drawSnake() {
  ctx.fillStyle = "green";
  snake.forEach((segment) => {
    ctx.fillRect(segment.x, segment.y, segmentSize, segmentSize);
  });
}
// create an apple (red dot)
function drawApple() {
  ctx.fillStyle = "red";
  ctx.fillRect(APPLE.x, APPLE.y, APPLE.width, APPLE.height);
}

// Get a random position within canvas, ensuring it fits within boundaries
function getRandomPosition(max, size) {
  return Math.floor(Math.random() * ((max - size) / size)) * size;
}

// After the apple is eaten, update its position
function updateApplePosition() {
  APPLE.x = getRandomPosition(canvas.width, segmentSize);
  APPLE.y = getRandomPosition(canvas.height, segmentSize);
}

// Move the snake by adding a new head and removing the tail
function moveSnake() {
  if (gameOver) return;

  // copy the head of the snake
  let head = { ...snake[0] };
  if (snakeDirection === "left") head.x -= segmentSize;
  if (snakeDirection === "right") head.x += segmentSize;
  if (snakeDirection === "up") head.y -= segmentSize;
  if (snakeDirection === "down") head.y += segmentSize;

  // Check for collision with walls
  if (checkWallCollision(head)) {
    wallHit = true;
    handleGameOver(); // Immediately handle game over
    return;
  }
  // Check for self-collision
  if (checkSelfCollision(head)) {
    handleGameOver(); // Handle game over for self-collision
    return; // Prevent further movement
  }
  // Add the new head to the snake array
  snake.unshift(head);
  // If no apple was eaten, remove the tail of the snake to maintain size
  if (!checkAppleCollision(head)) {
    snake.pop();
  }

  // Unlock input after moving the snake
  inputLocked = false;
}
// Function to check collision with apple
function checkAppleCollision(head) {
  if (
    head.x < APPLE.x + APPLE.width &&
    head.x + segmentSize > APPLE.x &&
    head.y < APPLE.y + APPLE.height &&
    head.y + segmentSize > APPLE.y
  ) {
    // Apple eaten, move apple to a new random position
    APPLE.x = getRandomPosition(canvas.width, segmentSize);
    APPLE.y = getRandomPosition(canvas.height, segmentSize);
    return true;
  }
  return false;
}
// Function to check if the snake hits the wall
function checkWallCollision(head) {
  return (
    head.x < 0 || // Hits left wall
    head.x + segmentSize > canvas.width || // Hits right wall
    head.y < 0 || // Hits top wall
    head.y + segmentSize > canvas.height // Hits bottom wall
  );
}
// Function to check if the snake hits itself
function checkSelfCollision(head) {
  return snake.some((segment, index) => {
    // Ignore the head itself when checking for collision
    return index !== 0 && head.x === segment.x && head.y === segment.y;
  });
}

// Function to handle game over
function handleGameOver() {
  
     gameOver = true;
     
     resetGame();

}

// Reset game function (optional)
function resetGame() {
  gameOver = false;

  snake = [{ x: 50, y: 50 }];
  snakeDirection = "right";
  gameStarted = false;
  inputLocked = false;
  init(); // Re-initialize the game
}

//function to clear canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function update(currentTime) {
  // Only run the game loop if the game has started
  if (!gameStarted || gameOver) {
    return;
  }

  // Calculate time since last frame
  const secondsSinceLastRender = (currentTime - lastRenderTime) / 1000;

  // Only move the snake if enough time has passed
  if (secondsSinceLastRender < 1 / snakeSpeed) {
    requestAnimationFrame(update);
    return;
  }

  // Update the time of the last render
  lastRenderTime = currentTime;

  clearCanvas();
  moveSnake();
  drawSnake();
  drawApple();

  // request next frame
  requestAnimationFrame(update);
}
document.addEventListener("keydown", (e) => {
  e.preventDefault();

  if (!gameStarted) {
    gameStarted = true; // Change game state to started
    requestAnimationFrame(update); // Start the game loop only once
  }

  // Ignore input if it's locked or game is over(i.e., prevent multiple key presses before moving)
  if (inputLocked || gameOver ) return;
  // Handle direction change, preventing reverse direction
  if (e.key === "ArrowLeft" && snakeDirection !== "right")
  snakeDirection = "left";
  inputLocked = true; // Lock input after setting direction
  if (e.key === "ArrowRight" && snakeDirection !== "left")
  snakeDirection = "right";
  inputLocked = true;
  if (e.key === "ArrowUp" && snakeDirection !== "down") 
  snakeDirection = "up";
  inputLocked = true;
  if (e.key === "ArrowDown" && snakeDirection !== "up") 
  snakeDirection = "down";
  inputLocked = true;

  // Move the snake
  moveSnake();
});

// Initial rendering of the snake and apple without movement
function init() {
  clearCanvas();
  drawSnake();
  drawApple();
}

// Call the init function to render the initial snake and apple
init();
