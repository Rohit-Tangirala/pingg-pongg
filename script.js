// script.js - Ping Pong Game Logic

// Set up canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Game variables
a let ballRadius = 10;
a let x = canvas.width / 2;
a let y = canvas.height / 2;
a let dx = 2;
a let dy = -2;
a let paddleHeight = 75;
a let paddleWidth = 10;
a let playerPaddleY = (canvas.height - paddleHeight) / 2;
a let aiPaddleY = (canvas.height - paddleHeight) / 2;
a let upPressed = false;
a let downPressed = false;
a let aiSpeed = 4;
a let playerSpeed = 5;

// Event listeners for paddle controls
document.addEventListener('keydown', keyDownHandler);
document.addEventListener('keyup', keyUpHandler);

function keyDownHandler(e) {
    if (e.key === 'ArrowUp') {
        upPressed = true;
    } else if (e.key === 'ArrowDown') {
        downPressed = true;
    }
}

function keyUpHandler(e) {
    if (e.key === 'ArrowUp') {
        upPressed = false;
    } else if (e.key === 'ArrowDown') {
        downPressed = false;
    }
}

function drawBall() {
    ctx.beginPath();
    ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
    ctx.fillStyle = '#0095DD';
    ctx.fill();
    ctx.closePath();
}

function drawPaddle(x, y) {
    ctx.fillStyle = '#0095DD';
    ctx.fillRect(x, y, paddleWidth, paddleHeight);
}

function collisionDetection() {
    if (x + ballRadius > canvas.width - paddleWidth && y > aiPaddleY && y < aiPaddleY + paddleHeight) {
        dx = -dx;
    } else if (x - ballRadius < paddleWidth && y > playerPaddleY && y < playerPaddleY + paddleHeight) {
        dx = -dx;
    } else if (x + ballRadius > canvas.width) {
        // Player loses a point
        resetBall();
    } else if (x - ballRadius < 0) {
        // AI loses a point
        resetBall();
    }
}

function resetBall() {
    x = canvas.width / 2;
    y = canvas.height / 2;
    dx = 2;
    dy = -2;
}

function aiMovement() {
    if (aiPaddleY + paddleHeight / 2 < y) {
        aiPaddleY += aiSpeed;
    } else {
        aiPaddleY -= aiSpeed;
    }
}

function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawBall();
    drawPaddle(0, playerPaddleY);
    drawPaddle(canvas.width - paddleWidth, aiPaddleY);
    collisionDetection();

    if (upPressed && playerPaddleY > 0) {
        playerPaddleY -= playerSpeed;
    }
    if (downPressed && playerPaddleY < canvas.height - paddleHeight) {
        playerPaddleY += playerSpeed;
    }

    aiMovement();

    x += dx;
    y += dy;
    if (y + dy > canvas.height - ballRadius || y + dy < ballRadius) {
        dy = -dy;
    }
    requestAnimationFrame(draw);
}

draw();