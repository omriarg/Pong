import React, { useRef, useEffect } from 'react';
import { paddleLeft, paddleRight, paddle_Left_X, paddle_Right_X } from './Paddle.jsx';
import { ball } from './Ball.jsx';

const Board = () => {
    const canvasRef = useRef(null);
    const yleftRef = useRef(170); // Store left paddle Y position using ref
    const yrightRef = useRef(170); // Store right paddle Y position using ref
    const userScoreRef = useRef(0); // Store left paddle Y position using ref
    const computerScoreRef = useRef(0); // Store right paddle Y position using ref
    let isLeftTurn = true;
    let isPaused = false;
    let gameInProgress = false;

    const animate = () => {
        if (isPaused || !gameInProgress) {
            return;
        }
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');
        if (canvas && context) {
            drawBoard(context, canvas);
            updateComputerPlayerPosition();
            paddleRight.updatePosition(context, paddle_Right_X, yrightRef.current);
            paddleLeft.updatePosition(context, paddle_Left_X, yleftRef.current);
            ball.updatePosition(context);
            checkforCollisonOrScore();
            showScore(context);
        }
        // Request the next frame
        requestAnimationFrame(animate);
    };
    const updateComputerPlayerPosition = () => {
        const aiSpeed = 2; // Speed of the AI paddle
        const ballCenterY = ball.currentPosition.y;
        const paddleCenterY = yleftRef.current + 30; // Center of the paddle
        // Move the paddle only if the ball is outside a small "dead zone"
        const threshold = 10;
        if (Math.abs(ballCenterY - paddleCenterY) > threshold) {
            if (ballCenterY < paddleCenterY) {
                yleftRef.current = Math.max(10, yleftRef.current - aiSpeed); // Move up
            } else if (ballCenterY > paddleCenterY) {
                yleftRef.current = Math.min(330, yleftRef.current + aiSpeed); // Move down
            }
        }
    };
    const drawBoard = (context, canvas) => {
        // Clear the canvas
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);
        // Draw the board and walls
        context.fillStyle = 'grey';
        context.fillRect(0, 0, 800, 10); // Top wall
        context.fillRect(0, 390, 800, 10); // Bottom wall
        context.fillStyle = 'white';
        context.fillRect(400, 10, 10, 380); // Middle wall
        // Update and draw the ball and paddles using the refs for y positions
    };

    const addPointToUser = () => {
        userScoreRef.current += 1;
        if (userScoreRef.current == 10) {
            gameOver('User Wins');
        }
    };

    const addPointToComputer = () => {
        computerScoreRef.current += 1;
        if (computerScoreRef.current == 10) {
            gameOver('Computer Wins');
        }
    };

    const gameOver = winner => {
        const canvas = canvasRef.current;
        const context = canvas.getContext('2d');

        // Clear the canvas
        context.fillStyle = 'black';
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Display the winner text
        context.fillStyle = 'white';
        context.font = '50px Arial';
        context.textAlign = 'center';
        context.fillText(winner, canvas.width / 2, canvas.height / 2 - 40);
        context.font = '20px Arial';
        context.fillText('Click screen to start new game...', canvas.width / 2, canvas.height / 2 - 40 + 50);
        gameInProgress = false;
        //game over
    };

    const checkforCollisonOrScore = async () => {
        //function to check for collision or scores each frame.
        const ballRadius = ball.ball_Radius;
        const topWall = 10 + ball.ball_Radius;
        const bottomWall = 390 - ball.ball_Radius;
        if (ball.currentPosition.y <= topWall || ball.currentPosition.y >= bottomWall) {
            ball.handleWallCollision();
            return;
            // collision with the top or bottom wall
        } else if (
            ball.currentPosition.x >= 780 - ballRadius &&
            ball.currentPosition.y > yrightRef.current - ballRadius &&
            ball.currentPosition.y < yrightRef.current + 60 + ballRadius
        ) {
            ball.handlePadleCollision(yrightRef.current);
            ball.currentPosition.x = 780 - ballRadius - 1; // Push ball back into play
            return;
            //collision with right paddle
        } else if (
            ball.currentPosition.x <= 20 + ballRadius &&
            ball.currentPosition.y > yleftRef.current - ballRadius &&
            ball.currentPosition.y < yleftRef.current + ballRadius + 60
        ) {
            ball.handlePadleCollision(yleftRef.current);
            ball.currentPosition.x = 20 + ballRadius + 1; // Push ball back into play
            return;
            //collision with left paddle
        } else if (ball.currentPosition.x >= 810) {
            //computer scored, add point to computer
            handleScore('Computer');
            return;
        } else if (ball.currentPosition.x <= -10) {
            // user scored, add point to user
            handleScore('User');
            return;
        }
    };

    const handleScore = Scorer => {
        isPaused = true; // Pause the game for critical section
        isLeftTurn ^= true; // Toggle the turn
        Scorer === 'User' ? addPointToUser() : addPointToComputer();
        // delay to execute critical commands
        setTimeout(() => {
            ball.resetBallPosition(); // Reset the ball position
            ball.initBall(isLeftTurn); // Initialize the ball with the new turn direction
            isPaused = false; // Resume the game
            animate();
        }, 400); // Delay for 0.1 seconds (100 milliseconds)
    };

    const startGame = () => {
        // Start the game
        isPaused = false; // Ensure it's not paused
        gameInProgress = true; // Reset game over state
        userScoreRef.current = 0; // Reset scores
        computerScoreRef.current = 0;
        ball.initBall(true); // Initialize ball direction
        animate(); // Start animation loop
    };

    const showScore = context => {
        context.font = '25px Arial';
        context.fillStyle = 'white';
        context.fillText(userScoreRef.current, 600, 50);
        context.fillText(computerScoreRef.current, 200, 50);
    };

    const handleMouseMove = e => {
        if (gameInProgress) {
            const canvas = canvasRef.current;
            const rect = canvas.getBoundingClientRect(); // Get canvas bounds
            const mouseY = e.clientY - rect.top; // Mouse position relative to canvas
            // Constrain paddle movement within the canvas (y-axis)
            yrightRef.current = mouseY >= 10 && mouseY <= 330 ? mouseY : yrightRef.current;
        }
    };

    const handleCanvasClick = e => {
        if (!gameInProgress) {
            gameInProgress = true;
            startGame(); // Call the startGame function to begin the game
        }
    };

    return (
        <canvas
            ref={canvasRef}
            width="800"
            height="400"
            style={{
                display: 'block',
                margin: '0 auto',
                border: '2px solid white',
                backgroundColor: 'black',
            }}
            onClick={handleCanvasClick}
            onMouseMove={handleMouseMove}
        ></canvas>
    );
};

export default Board;
