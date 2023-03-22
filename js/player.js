class Player extends ComponentMovingAnimation {
  constructor(x, y, keysConfig = keys[0], player = config.players[0]) {
    super(x, y, player);
    this.id = player.id;
    this.keysConfig = keysConfig;
    this.lastKeyPressed = "";
    this.isDropBomb = false;
    this.characteristics = player.characteristics;
    this.score = 0;
    this.bombQty = this.characteristics.bombQty;
    this.bombPower = this.characteristics.bombPower;
    this.pageElements = undefined;

    this.setPageElements();
    this.setListeners();
  }
  update() {
    this.move();
    super.update();
  }
  move() {
    this.velocity = { x: 0, y: 0 };
    const obstacles = game.obstacles;
    if (this.keysConfig.up.keyPressed && this.lastKeyPressed === this.keysConfig.up.code) {
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const component = new Component(this.x, this.y, this.width, this.height);
        component.setVelocity({ x: 0, y: -this.velocityMax.y });
        if (obstacle.constructor !== Artifact && component.isCollisionWith(obstacle)) {
          this.velocity.y = 0;
          break;
        } else {
          this.velocity.y = -this.velocityMax.y;
          this.moveUp();
        }
      }
    } else if (
      this.keysConfig.down.keyPressed &&
      this.lastKeyPressed === this.keysConfig.down.code
    ) {
      const obstacles = game.obstacles;
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const component = new Component(this.x, this.y, this.width, this.height);
        component.setVelocity({ x: 0, y: this.velocityMax.y });
        if (obstacle.constructor !== Artifact && component.isCollisionWith(obstacle)) {
          this.velocity.y = 0;
          break;
        } else {
          this.moveDown();
        }
      }
    } else if (
      this.keysConfig.left.keyPressed &&
      this.lastKeyPressed === this.keysConfig.left.code
    ) {
      const obstacles = game.obstacles;
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const component = new Component(this.x, this.y, this.width, this.height);
        component.setVelocity({ x: -this.velocityMax, y: 0 });
        if (obstacle.constructor !== Artifact && component.isCollisionWith(obstacle)) {
          this.velocity.x = 0;
          break;
        } else {
          this.moveLeft();
        }
      }
    } else if (
      this.keysConfig.right.keyPressed &&
      this.lastKeyPressed === this.keysConfig.right.code
    ) {
      const obstacles = game.obstacles;
      for (let i = 0; i < obstacles.length; i++) {
        const obstacle = obstacles[i];
        const component = new Component(this.x, this.y, this.width, this.height);
        component.setVelocity({ x: this.velocityMax.x, y: 0 });
        if (obstacle.constructor !== Artifact && component.isCollisionWith(obstacle)) {
          this.velocity.x = 0;
          break;
        } else {
          this.moveRight();
        }
      }
    } else {
      this.moveStop();
    }
  }
  dropBomb() {
    if (this.bombQty > 0) {
      //TODO revoir le placement de bombe
      const position = {
        x:
          this.x -
          (this.x % config.wall.width) -
          10 *
            Math.min(
              Math.max(this.velocity.x, -this.characteristics.defaultVelocity.x),
              this.characteristics.defaultVelocity.x
            ),
        y:
          this.y -
          (this.y % config.wall.height) -
          10 *
            Math.min(
              Math.max(this.velocity.y, -this.characteristics.defaultVelocity.y),
              this.characteristics.defaultVelocity.y
            ),
      };
      const bomb = new Bomb(position.x, position.y, this.bombPower);
      game.obstacles.push(bomb);
      --this.bombQty;
      this.updatePageElement(dictionary.element.bomb, this.bombQty);
      dropBombAudio.play();
      this.isDropBomb = true;
      this.decreaseTimerBeforeRemove(position, Bomb, config.bomb.timer, () => {
        this.bombQty++;
        this.updatePageElement(dictionary.element.bomb, this.bombQty);
        const wallExplodedCounter = bomb.explosion();
        console.log(wallExplodedCounter);
        this.score += config.score.explosion + wallExplodedCounter * config.score.wall;
        this.updatePageElement(dictionary.element.score, this.score);
      });
    }
  }
  catchArtifact(obstacle) {
    this.removeComponentAtPosition({ x: obstacle.x, y: obstacle.y }, Artifact);
    artifactCatchAudio.play();
    this.score += config.score.artifact;
    this.updatePageElement(dictionary.element.score, this.score);
    switch (obstacle.code) {
      case dictionary.element.bomb:
        this.bombQty++;
        this.updatePageElement(dictionary.element.bomb, this.bombQty);
        break;

      case dictionary.element.flame:
        this.bombPower++;
        this.updatePageElement(dictionary.element.flame, this.bombPower);
        break;

      case dictionary.element.roller:
        this.velocityMax.x++;
        this.velocityMax.y++;
        this.updatePageElement(dictionary.element.roller, this.velocityMax.x);
        break;
    }
  }
  moveStop() {
    switch (this.lastKeyPressed) {
      case this.keysConfig.up.code:
        this.switchAnimation(this.animations.up.stop);
        break;
      case this.keysConfig.down.code:
        this.switchAnimation(this.animations.down.stop);
        break;
      case this.keysConfig.right.code:
        this.switchAnimation(this.animations.right.stop);
        break;
      case this.keysConfig.left.code:
        this.switchAnimation(this.animations.left.stop);
        break;
    }
  }

  hitWith(obstacle) {
    if (this.isCollisionWith(obstacle)) {
      switch (obstacle.constructor) {
        case Wall:
          this.stop();
          break;
        case Bomb:
          if (!this.isDropBomb) {
            this.stop();
          }
          break;
        case Flame:
        case Enemy:
          this.dies();
          break;
        case Artifact:
          this.catchArtifact(obstacle);
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

  updateScore() {}

  setPageElements() {
    this.pageElements = {
      [dictionary.element.score]: document.getElementById(`score-player${this.id}`),
      [dictionary.element.flame]: document.getElementById(`flame-qty-player${this.id}`),
      [dictionary.element.bomb]: document.getElementById(`bomb-qty-player${this.id}`),
      [dictionary.element.roller]: document.getElementById(`roller-qty-player${this.id}`),
    };
    this.updatePageElement(dictionary.element.bomb, this.bombQty);
    this.updatePageElement(dictionary.element.flame, this.bombPower);
    this.updatePageElement(dictionary.element.roller, this.velocityMax.x);
    this.updatePageElement(dictionary.element.score, this.score);
  }
  updatePageElement(pageElement, value) {
    this.pageElements[pageElement].innerHTML = value;
  }
}
