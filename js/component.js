class Component {
  constructor(x, y, width, height, velocity = { x: 0, y: 0 }, velocityMax = { x: 0, y: 0 }) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.velocity = velocity;
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
  setVelocity(velocity) {
    this.velocity = velocity;
  }
  isCollisionWith(obstacle, isPaddingNeeded = false) {
    const padding = isPaddingNeeded ? (obstacle.width - this.width) / 2 - 1 : 0;
    return (
      this.right() + this.velocity.x >= obstacle.left() - padding &&
      this.top() + this.velocity.y <= obstacle.bottom() + padding &&
      this.bottom() + this.velocity.y >= obstacle.top() - padding &&
      this.left() + this.velocity.x <= obstacle.right() + padding
    );
  }
  decreaseTimerBeforeRemove(position, arr, timer, callback) {
    setTimeout(() => {
      this.removeComponentAtPosition(position, arr);
      if (callback) callback();
    }, timer);
  }
  removeComponentAtPosition(position, arr) {
    const index = arr.findIndex((element) => element.x == position.x && element.y == position.y);
    arr.splice(index, 1);
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
    animate = true,
    imageWidth = width,
    imageHeight = height
  ) {
    super(x, y, width, height, imageSrc);
    this.framesMax = framesMax;
    this.framesCurrent = 0;
    this.framesElapsed = 0;
    this.framesHold = framesHold;
    this.offset = offset;
    this.animate = animate;
    this.imageWidth = imageWidth;
    this.imageHeight = imageHeight;
  }
  draw() {
    game.ctx.drawImage(
      this.image,
      this.framesCurrent * (this.image.width / this.framesMax) + this.offset.x,
      0 + this.offset.y,
      this.image.width / this.framesMax - this.offset.x,
      this.image.height - this.offset.y,
      this.x,
      this.y - (this.imageHeight - this.imageWidth),
      this.imageWidth,
      this.imageHeight
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
class ComponentMovingAnimation extends ComponentImageAnimation {
  constructor(x, y, movingElement) {
    super(
      x,
      y,
      movingElement.characteristics.width,
      movingElement.characteristics.height,
      movingElement.animations.down.stop.src,
      movingElement.animations.down.stop.framesMax,
      movingElement.characteristics.image.offset,
      10,
      true,
      movingElement.characteristics.image.width,
      movingElement.characteristics.image.height
    );
    this.animations = movingElement.animations;
    this.lastAnimation = movingElement.animations.down.stop;
    this.isDead = false;
    this.characteristics = movingElement.characteristics;
    this.audios = movingElement.audios;
    this.velocityMax = {
      x: this.characteristics.defaultVelocity.x,
      y: this.characteristics.defaultVelocity.y,
    };
  }
  update() {
    this.checkCollision();
    this.updatePostion();
    this.draw();
    if (this.animate) this.animateFrames();
  }
  updatePostion() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }
  stop() {
    this.velocity.x = 0;
    this.velocity.y = 0;
  }
  moveUp() {
    this.velocity.y = -this.velocityMax.y;
    this.switchAnimation(this.animations.up.run);
  }
  moveDown() {
    this.velocity.y = this.velocityMax.y;
    this.switchAnimation(this.animations.down.run);
  }
  moveLeft() {
    this.velocity.x = -this.velocityMax.x;
    this.switchAnimation(this.animations.left.run);
  }
  moveRight() {
    this.velocity.x = this.velocityMax.x;
    this.switchAnimation(this.animations.right.run);
  }
  switchAnimation(animation) {
    if (this.lastAnimation !== animation) {
      this.framesCurrent = 0;
      this.lastAnimation = animation;
      this.image.src = animation.src;
      this.framesMax = animation.framesMax;
    }
  }
  /*filterObstaclesAround() {
    return game.obstacles.filter(
      (obstacle) =>
        obstacle.left() >= this.left() - config.wall.width - (this.left() % config.wall.width) &&
        obstacle.right() <=
          this.right() +
            config.wall.width +
            (config.wall.width - (this.right() % config.wall.width)) &&
        obstacle.top() >= this.top() - (this.top() % config.wall.height) - config.wall.height &&
        obstacle.bottom() <=
          this.bottom() +
            config.wall.height +
            (config.wall.height - (this.bottom() % config.wall.height))
    );
  }*/

  dies() {
    this.stop();
    playAudio(this.audios.dies.src);
    this.isDead = true;
  }
}
