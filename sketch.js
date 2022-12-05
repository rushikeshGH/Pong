const ScreenPadding = 10;
const PaddleSpeed = 200;
const BallSpeed = 250;

let paddles;
let ball;

function setup() {
  createCanvas(600, 400);
  paddles = [];
  paddles[0] = new Paddle(Side.Left, Type.Player1);
  paddles[1] = new Paddle(Side.Right, Type.AI);
  ball = new Ball();
}

function draw() {
  background(0);

  process();
  render();

  function process() {
    ball.step();

    for (let paddle of paddles) {
      paddle.step();
    }
  }

  function render() {
    ball.draw();

    for (let paddle of paddles) {
      paddle.draw();
    }
  }
}
  
function reset() {
  ball.reset();
  
  for (let paddle of paddles) {
    paddle.reset();
  }
}