const Side = {
  Left: 'left',
  Right: 'right',
};

const Type = {
  Player1: 'player1',
  Player2: 'player2',
  AI: 'ai',
}

class Player1Behavior {
  constructor(paddle) {
    this.paddle = paddle;
  }

  step() {
    if (keyIsDown(KeyCode.W)) {
      this.paddle.position.y -= PaddleSpeed * (deltaTime / 1000);
    }
    else if (keyIsDown(KeyCode.S)) {
      this.paddle.position.y += PaddleSpeed * (deltaTime / 1000);
    }
  }
}

class Player2Behavior {
  constructor(paddle) {
    this.paddle = paddle;
  }

  step() {
    if (keyIsDown(KeyCode.Up)) {
      this.paddle.position.y -= PaddleSpeed * (deltaTime / 1000);
    }
    else if (keyIsDown(KeyCode.Down)) {
      this.paddle.position.y += PaddleSpeed * (deltaTime / 1000);
    }
  }
}

class AIBehaviour {
  constructor(paddle) {
    this.paddle = paddle;
    this.pointOfIntersection = paddle.position;

    EventHandler.addEventListener('gameStart', this.calculatePointOfIntersection);
    EventHandler.addEventListener('ballHit', this.calculatePointOfIntersection);
  }

  step() {
    if (getSideFromHeading(ball.heading) != this.paddle.side)
      return;

    if (this.pointOfIntersection === undefined)
      return;

    let difference = p5.Vector.sub(this.pointOfIntersection, this.paddle.position);
    if (abs(difference.y) > 2)
      this.paddle.position.y += difference.normalize().y * PaddleSpeed * (deltaTime / 1000);
  }

  calculatePointOfIntersection() {
    let paddle = getPaddleFromSide(getSideFromHeading(ball.heading));

    paddle.behaviour.pointOfIntersection = getPointIntersection(ball.position, p5.Vector.mult(ball.heading, 5));
    paddle.behaviour.pointOfIntersection.sub(0, (paddle.size.y / 2) - (ball.size / 2));
    paddle.behaviour.pointOfIntersection.add(0, random(-paddle.size.y / 2, paddle.size.y / 2));
  }
}

class Paddle {
  constructor(side, type) {
    this.position = createVector();
    this.size = createVector(15, 80);
    this.type = type.toLowerCase();
    this.side = side.toLowerCase();

    // set behaviour based on type
    switch (this.type) {
      case Type.Player1:
        this.behaviour = new Player1Behavior(this);
        break;
      case Type.Player2:
        this.behaviour = new Player2Behavior(this);
        break;
      case Type.AI:
        this.behaviour = new AIBehaviour(this);
        break;
      default:
        throw 'Enter a valid type';
    }

    // set x position based on side
    switch (this.side) {
      case Side.Left:
        this.position.x = ScreenPadding;
        break;
      case Side.Right:
        this.position.x = width - this.size.x - ScreenPadding;
        break;
      default:
        throw 'Enter a valid side';
    }

    this.position.y = (height / 2) - (this.size.y / 2);
  }

  step() {
    this.behaviour.step();

    // strike the ball if it collides with the paddle
    if (this.ballColliding())
      this.hitBall();

    // stop paddle from moving beyond screen
    if (this.position.y + this.size.y > height)
      this.position.y = height - this.size.y;
    else if (this.position.y < 0)
      this.position.y = 0
  }

  draw() {
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
  }

  reset() {
    switch (this.side) {
      case Side.Left:
        this.position.x = ScreenPadding;
        break;
      case Side.Right:
        this.position.x = width - this.size.x - ScreenPadding;
        break;
      default:
        throw 'Enter a valid side';
    }

    this.position.y = (height / 2) - (this.size.y / 2);
  }

  hitBall() {
    let angle = 0;
    angleMode(DEGREES);
    if (ball.position.y > this.position.y + (this.size.y / 2)) {
      angle = map(ball.position.y, this.position.y + (this.size.y / 2), this.position.y + this.size.y, 0, 45);
      angle = Mathematics.clamp(angle, 0, 45);
      ball.heading.x = cos(angle);
      ball.heading.y = sin(angle);
    }
    else if (ball.position.y < this.position.y + (this.size.y / 2)) {
      angle = 45 - map(ball.position.y, this.position.y, this.position.y + (this.size.y / 2), 0, 45);
      angle = Mathematics.clamp(angle, 0, 45);
      ball.heading.x = cos(angle);
      ball.heading.y = -sin(angle);
    }
    else {
      ball.heading.x = cos(angle);
      ball.heading.y = sin(angle);
    }

    if (this.side == Side.Left) {
      ball.heading.x = abs(ball.heading.x);

      if (ball.position.x < this.position.x + this.size.x) {
        if (ball.position.y < this.position.y) {
          ball.position.y = this.position.y - ball.size;
        }
        else if (ball.position.y + ball.size > this.position.y + this.size.y) {
          ball.position.y = this.position.y + this.size.y;
        }
      }
      else {
        ball.position.x = this.position.x + this.size.x;
      }
    }
    else if (this.side == Side.Right) {
      ball.heading.x = -abs(ball.heading.x);

      if (ball.position.x + ball.size > this.position.x) {
        if (ball.position.y < this.position.y) {
          ball.position.y = this.position.y - ball.size;
        }
        else if (ball.position.y + ball.size > this.position.y + this.size.y) {
          ball.position.y = this.position.y + this.size.y;
        }
      }
      else {
        ball.position.x = this.position.x - ball.size;
      }
    }

    EventHandler.dispatchEvent(new CustomEvent('ballHit'));
  }

  ballColliding() {
    return (
      this.position.x < ball.position.x + ball.size &&
      this.position.x + this.size.x > ball.position.x &&
      this.position.y < ball.position.y + ball.size &&
      this.position.y + this.size.y > ball.position.y
    );
  }
}


