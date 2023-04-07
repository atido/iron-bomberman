class Player extends ComponentMovingAnimation {
  constructor(keysConfig = keyboard[0].keys, player = config.players[0]) {
    super(player.defaultPosition.x, player.defaultPosition.y, player);
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
    const obstacles = game.walls;
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
      const position = {
        x: this.x - (this.x % config.wall.width),
        y: this.y - (this.y % config.wall.height),
      };
      const bomb = new Bomb(position.x, position.y, this.bombPower);
      game.bombs.push(bomb);
      --this.bombQty;
      this.updatePageElement(dictionary.element.bomb, this.bombQty);
      dropBombAudio.play();
      this.isDropBomb = true;
      this.decreaseTimerBeforeRemove(position, game.bombs, config.bomb.timer, () => {
        this.bombQty++;
        this.updatePageElement(dictionary.element.bomb, this.bombQty);
        const wallExplodedCounter = bomb.explosion();
        this.score += config.score.explosion + wallExplodedCounter * config.score.wall;
        this.updatePageElement(dictionary.element.score, this.score);
      });
    }
  }
  catchArtifact(artifact) {
    this.removeComponentAtPosition({ x: artifact.x, y: artifact.y }, game.artifacts);
    artifactCatchAudio.play();
    this.score += config.score.artifact;
    this.updatePageElement(dictionary.element.score, this.score);
    switch (artifact.code) {
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

  checkCollision() {
    if (game.walls.some((wall) => this.isCollisionWith(wall))) {
      this.stop();
    } else if (
      game.flames.some((flame) => this.isCollisionWith(flame)) ||
      game.enemies.some((enemy) => this.isCollisionWith(enemy))
    ) {
      this.dies();
    } else if (
      game.players
        .filter((player) => player.id !== this.id)
        .some((player) => this.isCollisionWith(player))
    ) {
      this.stop();
    } else {
      if (game.bombs.some((bomb) => this.isCollisionWith(bomb))) {
        if (!this.isDropBomb) {
          this.stop();
        }
      } else {
        this.isDropBomb = false;
      }
    }
    game.artifacts.forEach((artifact) => {
      if (this.isCollisionWith(artifact)) {
        this.catchArtifact(artifact);
      }
    });
  }

  setListeners() {
    document.addEventListener("keydown", (e) => {
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
    });
    document.addEventListener("keyup", (e) => {
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
    });
  }

  setPageElements() {
    this.pageElements = {
      [dictionary.element.score]: document.querySelector(`#player${this.id} #player__score`),
      [dictionary.element.flame]: document.querySelector(`#player${this.id} #player__flame-qty`),
      [dictionary.element.bomb]: document.querySelector(`#player${this.id} #player__bomb-qty`),
      [dictionary.element.roller]: document.querySelector(`#player${this.id} #player__roller-qty`),
    };
    this.updatePageElement(dictionary.element.bomb, this.bombQty);
    this.updatePageElement(dictionary.element.flame, this.bombPower);
    this.updatePageElement(dictionary.element.roller, this.velocityMax.x);
    this.updatePageElement(dictionary.element.score, this.score);
  }
  updatePageElement(pageElement, value) {
    this.pageElements[pageElement].innerHTML = value;
    0;
  }
}
