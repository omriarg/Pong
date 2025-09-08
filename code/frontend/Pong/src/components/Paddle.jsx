class Paddle {
    constructor() {
        this.width = paddleWidth;
        this.height = paddleHeight;
    }

    updatePosition(context, x, y) {
        if (context) {
            context.fillStyle = 'white';
            context.fillRect(x, y, this.width, this.height);
        }
    }
}
const paddleWidth = 10;
const paddleHeight = 60;
export const paddle_Right_X = 780;
export const paddle_Left_X = 10;
export const paddleLeft = new Paddle();
export const paddleRight = new Paddle();
