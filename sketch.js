const ScreenPadding = 10;
const PaddleSpeed = 200;
const BallSpeed = 250;

const EventHandler = new EventTarget();

let paddles;
let ball;

function setup() {
  createCanvas(600, 400);
  paddles = [];
  paddles[0] = new Paddle(Side.Left, Type.AI);
  paddles[1] = new Paddle(Side.Right, Type.AI);
  ball = new Ball();

  EventHandler.dispatchEvent(new CustomEvent('gameStart'));
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

function getSideFromHeading(heading) {
  if (heading.x < 0)
    return Side.Left;
  else
    return Side.Right
}

function getPaddleFromSide(side) {
  for (paddle of paddles) {
    if (paddle.side === side)
      return paddle;
  }
}

function getPointIntersection(position, heading) {
  let p1, p2, p3, p4;
  let intersection;
  let side;

  side = getSideFromHeading(heading);

  p1 = position;
  p2 = p5.Vector.add(p1, p5.Vector.mult(heading, 5));
  if (side === Side.Left) {
    p3 = createVector(0, 0);
    p4 = createVector(0, height);
  }
  else {
    p3 = createVector(width, 0);
    p4 = createVector(width, height);
  }

  intersection = Mathematics.calculateIntersection(p1, p2, p3, p4);
  if (intersection.u < 0) {
    p3 = createVector(0, 0);
    p4 = createVector(width, 0);
    intersection = Mathematics.calculateIntersection(p1, p2, p3, p4);
    if (intersection.u > 0 && intersection.u < 1) {
      return getPointIntersection(intersection.point, createVector(heading.x, -heading.y));
    }
  }
  else if (intersection.u > 1) {
    p3 = createVector(0, height);
    p4 = createVector(width, height);
    intersection = Mathematics.calculateIntersection(p1, p2, p3, p4);
    if (intersection.u > 0 && intersection.u < 1) {
      return getPointIntersection(intersection.point, createVector(heading.x, -heading.y));
    }
  }
  else {
    return intersection.point
  }
}