const ScreenPadding = 10;
const PaddleSpeed = 200;

let paddles;
let ball;

function setup() {
  createCanvas(600, 400);
  paddles = [];
  paddles[0] = new Paddle(Side.Left, Type.Player1);
  paddles[1] = new Paddle(Side.Right, Type.Player2);
  ball = new Ball();
}

function draw() {
  background(0);

  for (let paddle of paddles) {
    paddle.step();
    paddle.draw();
  }
  
  ball.draw();
}