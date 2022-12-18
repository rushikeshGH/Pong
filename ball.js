class Ball {
  constructor() {
    this.position = createVector();
    this.size = 15;
    this.heading = createVector();

    this.position.x = (width / 2) - (this.size / 2);
    this.position.y = (height / 2) - (this.size / 2);

    angleMode(DEGREES);
    let angle = random(0, 45);
    this.heading.x = cos(angle) * random([1, -1]);
    this.heading.y = sin(angle) * random([1, -1]);
  }

  step() {
    this.position.x += this.heading.x * BallSpeed * (deltaTime / 1000);
    this.position.y += this.heading.y * BallSpeed * (deltaTime / 1000);

    if (this.position.y < 0) {
      this.position.y = 0;
      this.heading.y *= -1;
    }
    else if (this.position.y + this.size > height) {
      this.position.y = height - this.size;
      this.heading.y *= -1;
    }
    else if (this.position.x + this.size < 0 || this.position.x > width) {
      reset();
    }
  }

  draw() {
    rect(this.position.x, this.position.y, this.size, this.size);
  }

  reset() {
    this.position.x = (width / 2) - (this.size / 2);
    this.position.y = (height / 2) - (this.size / 2);

    let angle = random(0, 60);
    this.heading.x = cos(angle) * random([1, -1]);
    this.heading.y = sin(angle) * random([1, -1]);
  }
}