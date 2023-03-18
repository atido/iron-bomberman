class Component {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = { x: 0, y: 0 };
  }
  top() {
    return this.y;
  }
  right() {
    return this.x + this.width;
  }
  left() {
    return this.x;
  }
  bottom() {
    return this.height + this.y;
  }
  isCollisionWith(obstacle) {
    return (
      this.right() + this.velocity.x > obstacle.left() &&
      this.top() + this.velocity.y < obstacle.bottom() &&
      this.bottom() + this.velocity.y > obstacle.top() &&
      this.left() + this.velocity.x < obstacle.right()
    );
  }
  decreaseTimerBeforeRemove(position, type, timer, callback) {
    setTimeout(() => {
      this.removeComponentAtPosition(position, type);
      if (callback) callback();
    }, timer);
  }
  removeComponentAtPosition(position, type) {
    const index = game.obstacles.findIndex(
      (obstacle) =>
        obstacle.x == position.x && obstacle.y == position.y && obstacle.constructor === type
    );
    game.obstacles.splice(index, 1);
  }
}

class ComponentImage extends Component {
  constructor(x, y, width, height, imageSrc) {
    super(x, y, width, height);
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
  update() {
    this.draw();
  }
}
class ComponentImageAnimation extends ComponentImage {
  constructor(
    x,
    y,
    width,
    height,
    imageSrc,
    framesMax = 1,
    offset = { x: 0, y: 0 },
    framesHold = 10,
    animate = true
  ) {
    super(x, y, width, height, imageSrc);
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
    this.animate = animate;
  }
  draw() {
    game.ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax) + this.offset.x,
      0 + this.offset.y,
      this.image.width / this.framesMax - this.offset.x,
      this.image.height - this.offset.y,
      this.x,
      this.y,
      this.width,
      this.height
    );
  }
  animateFrames() {
    this.framesElapsed++;

    if (!(this.framesElapsed % this.framesHold)) {
      if (this.framesCurrent < this.framesMax - 1) {
        this.framesCurrent++;
      } else {
        this.framesCurrent = 0;
      }
    }
  }
  update() {
    this.draw();
    if (this.animate) this.animateFrames();
  }
}
