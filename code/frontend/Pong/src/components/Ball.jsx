class Ball {
    currentPosition = { x: 400, y: 200 }; //start position
    velocity = { vx: 1, vy: 1 }; //starting velocity
    ball_Angle = 0;
    ball_Radius = 10;
    ball_Speed = 10; //default speed , may be changed later

    setDirection = Angle_Radians => {
        this.ball_Angle = Angle_Radians;
    };

    handleWallCollision = () => {
        let return_angle = Math.atan2(-this.velocity.vy, this.velocity.vx);
        this.setDirection(return_angle);
    };

    handlePadleCollision = paddleY => {
        const paddleCenter = paddleY + 30; // Center of the paddle
        const offset = this.currentPosition.y - paddleCenter; // Distance from center
        const spin = offset / 30; // Normalize to add spin effect

        // Adjust the angle based on spin
        let return_angle = Math.atan2(this.velocity.vy + spin, -this.velocity.vx);
        this.setDirection(return_angle);
    };

    initBall = isLeftTurn => {
        // randomize direction (left side of screen or right) , alternating
        let startAngle = this.getRandomAngle(210, 150); // Angle between 210° and 150° for left
        if (!isLeftTurn) {
            // then it is right player turn to start now
            // Angle between 40 and -30 for right
            startAngle -= 180;
        } // Flip direction
        const angleInRadians = startAngle * (Math.PI / 180); // Convert to radians
        this.setDirection(angleInRadians);
        this.velocity.vx = 1;
        this.velocity.vy = 1;
    };

    getRandomAngle = (max, min) => {
        return Math.random() * (max - min) + min;
    };

    updatePosition = ctx => {
        // update ball position based on current Angle and Speed
        this.velocity.vx = this.ball_Speed * Math.cos(this.ball_Angle);
        this.velocity.vy = this.ball_Speed * Math.sin(this.ball_Angle); //calculate change in position (dx,dy)
        this.currentPosition.x += this.velocity.vx; // add to current position
        this.currentPosition.y += this.velocity.vy;
        //draw ball
        ctx.beginPath();
        ctx.arc(this.currentPosition.x, this.currentPosition.y, this.ball_Radius, 0, Math.PI * 2); // starting position
        ctx.fillStyle = 'red'; // Ball color
        ctx.fill();
        ctx.closePath();
    };

    resetBallPosition = () => {
        //reset ball position to middle after each turn.
        this.currentPosition.x = 400;
        this.currentPosition.y = 200;
    };
}
export const ball = new Ball();
