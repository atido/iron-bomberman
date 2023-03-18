class Player extends Component {
  constructor(x, y, keysConfig = keys[0]) {
    super(x, y, config.player.width, config.player.height);
    this.keysConfig = keysConfig;
    this.lastKeyPressed = "";
    this.isDropBomb = false;
    this.isDead = false;
    this.bombQty = config.player.bombQty;

    this.setListeners();
  }
  draw() {
    game.ctx.fillStyle = "red";
    game.ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  move() {
    this.velocity = { x: 0, y: 0 };
    if (this.keysConfig.up.keyPressed && this.lastKeyPressed == this.keysConfig.up.code) {
      this.moveUp();
    } else if (
      this.keysConfig.down.keyPressed &&
      this.lastKeyPressed == this.keysConfig.down.code
    ) {
      this.moveDown();
    } else if (
      this.keysConfig.left.keyPressed &&
      this.lastKeyPressed == this.keysConfig.left.code
    ) {
      this.moveLeft();
    } else if (
      this.keysConfig.right.keyPressed &&
      this.lastKeyPressed == this.keysConfig.right.code
    ) {
      this.moveRight();
    }
  }
  dropBomb() {
    if (this.bombQty > 0) {
      const position = {
        x: this.x - (this.x % config.wall.width) - 10 * this.velocity.x,
        y: this.y - (this.y % config.wall.height) - 10 * this.velocity.y,
      };
      const bomb = new Bomb(position.x, position.y);
      game.obstacles.push(bomb);
      --this.bombQty;
      this.isDropBomb = true;
      this.decreaseTimerBeforeRemove(position, Bomb, config.bomb.timer, () => {
        this.bombQty++;
        bomb.explosion();
      });
    } else console.log("plus de bombes");
  }
  update() {
    this.x += this.velocity.x;
    this.y += this.velocity.y;
    this.draw();
  }
  moveUp() {
    /*let isCollision = false;
    let i = 0;
    while (!isCollision && i < game.walls.length) {
      if (
        isCollisionBetween({ ...this, velocity: { x: 0, y: -context.velocity.y } }, game.walls[i])
      ) {
        this.velocity.y = 0;
        isCollision = true;
      } else {
        this.velocity.y = -context.velocity.y;
      }
      i++;
    }*/
    this.velocity.y = -config.player.velocity.y;
  }

  moveDown() {
    this.velocity.y = config.player.velocity.y;
  }
  moveLeft() {
    this.velocity.x = -config.player.velocity.x;
  }
  moveRight() {
    this.velocity.x = config.player.velocity.x;
  }

  hitWith(obstacle) {
    if (this.isCollisionWith(obstacle)) {
      switch (obstacle.constructor) {
        case Wall:
          this.velocity.x = 0;
          this.velocity.y = 0;
          break;

        case Bomb:
          if (!this.isDropBomb) {
            this.velocity.x = 0;
            this.velocity.y = 0;
          }
          break;

        case Flame:
          this.velocity.x = 0;
          this.velocity.y = 0;
          this.isDead = true;
          break;
      }
    } else if (obstacle.constructor == Bomb) this.isDropBomb = false;
  }
  setListeners() {
    document.onkeydown = (e) => {
      switch (e.code) {
        case this.keysConfig.up.code:
          this.keysConfig.up.keyPressed = true;
          this.lastKeyPressed = this.keysConfig.up.code;
          break;

        case this.keysConfig.down.code:
          this.keysConfig.down.keyPressed = true;
          this.lastKeyPressed = this.keysConfig.down.code;
          break;

        case this.keysConfig.left.code:
          this.keysConfig.left.keyPressed = true;
          this.lastKeyPressed = this.keysConfig.left.code;
          break;

        case this.keysConfig.right.code:
          this.keysConfig.right.keyPressed = true;
          this.lastKeyPressed = this.keysConfig.right.code;
          break;

        case this.keysConfig.bomb.code:
          this.dropBomb();
          break;
      }
    };
    document.onkeyup = (e) => {
      switch (e.code) {
        case this.keysConfig.up.code:
          this.keysConfig.up.keyPressed = false;
          break;

        case this.keysConfig.down.code:
          this.keysConfig.down.keyPressed = false;
          break;

        case this.keysConfig.left.code:
          this.keysConfig.left.keyPressed = false;
          break;

        case this.keysConfig.right.code:
          this.keysConfig.right.keyPressed = false;
          break;
      }
    };
  }
}
