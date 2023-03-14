class Player extends Component {
  constructor(x, y) {
    super(x, y, 20, 20);
    this.vx = 15;
    this.vy = 15;

    this.setListeners();
  }
  draw() {
    game.ctx.fillStyle = "red";
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
    this.hitBoundaries();
  }
  moveUp() {
    this.y -= this.vy;
  }
  moveDown() {
    this.y += this.vy;
  }
  moveLeft() {
    this.x -= this.vx;
  }
  moveRight() {
    this.x += this.vx;
  }
  hitBoundaries() {
    if (this.x < context.wall.width) {
      this.x = context.wall.width;
    }
    if (this.x > game.width - this.width - context.wall.width) {
      this.x = game.width - this.width - context.wall.width;
    }
    if (this.y < context.wall.height) {
      this.y = context.wall.height;
    }
    if (this.y > game.height - this.height - context.wall.height) {
      this.y = game.height - this.height - context.wall.height;
    }
  }
  hitWall() {
    if (this.x < context.wall.width) {
      this.x = context.wall.width;
    }
    if (this.x > game.width - this.width - context.wall.width) {
      this.x = game.width - this.width - context.wall.width;
    }
    if (this.y < context.wall.height) {
      this.y = context.wall.height;
    }
    if (this.y > game.height - this.height - context.wall.height) {
      this.y = game.height - this.height - context.wall.height;
    }
  }
  setListeners() {
    document.onkeydown = (e) => {
      switch (e.code) {
        case "ArrowUp":
          this.moveUp();
          break;

        case "ArrowDown":
          this.moveDown();
          break;

        case "ArrowLeft":
          this.moveLeft();
          break;

        case "ArrowRight":
          this.moveRight();
          break;
      }
    };
  }
}
