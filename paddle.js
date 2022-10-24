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

class Paddle {
  constructor(side, type) {
    this.position = createVector(0, 0);
    this.size = createVector(20, 100);
    this.type = type;

    // set behaviour based on type
    switch (type.toLowerCase()) {
      case Type.Player1:
        this.behaviour = new Player1Behavior(this);
        break;
      case Type.Player2:
        this.behaviour = new Player2Behavior(this);
        break;
      default:
        throw 'Enter a valid type';
    }

    // set x position based on side
    switch (side.toLowerCase()) {
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

    if (this.position.y + this.size.y > height) {
      this.position.y = height - this.size.y;
    }
    else if (this.position.y < 0) {
      this.position.y = 0
    }
  }

  draw() {
    rect(this.position.x, this.position.y, this.size.x, this.size.y);
  }
}


