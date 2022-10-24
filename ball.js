class Ball {
  constructor() {
    this.size = 20;
    this.x = width / 2 - (this.size / 2);
    this.y = height / 2 - (this.size / 2);
  }

  draw() {
    rect(this.x, this.y, this.size, this.size);
  }
}
