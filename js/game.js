const game = {
  canvas: document.querySelector("#canvas"),
  ctx: this.canvas.getContext("2d"),
  width: this.canvas.width,
  height: this.canvas.height,
  animationFrameId: undefined,
  gameOver: false,
  player: undefined,
  background: undefined,
  obstacles: [],
  timer: config.timer.main,
  start() {
    this.checkIfGameRun();
    this.reset();
    timer(game.timer, "#main-timer");
    this.animate();
  },
  animate() {
    this.clear();
    this.updateAll();
    if (!this.checkGameOver()) this.animationFrameId = requestAnimationFrame(() => this.animate());
  },
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  reset() {
    this.obstacles = [];
    this.gameOver = false;
    this.player = new Player(config.wall.width, config.wall.height);
    this.background = new Background();
    this.generateWalls();
    this.timer = config.timer.main;
  },
  generateWalls() {
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        switch (element) {
          case "x":
            this.obstacles.push(new Wall(j * config.wall.width, i * config.wall.height, false));
            break;
          case "o":
            this.obstacles.push(new Wall(j * config.wall.width, i * config.wall.height, true));
            break;
        }
      });
    });
  },

  updateAll() {
    this.background.update();
    this.obstacles.forEach((obstacle) => obstacle.update());
    this.player.move();
    this.checkCollision();
    this.player.update();
  },
  checkGameOver() {
    return this.player.isDead;
  },
  checkIfGameRun() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  checkCollision() {
    // Filtre uniquement sur le carré de 3x3 pour réduire les collisions à tester
    this.obstacles
      .filter(
        (obstacle) =>
          obstacle.left() >=
            this.player.left() - config.wall.width - (this.player.left() % config.wall.width) &&
          obstacle.right() <=
            this.player.right() +
              config.wall.width +
              (config.wall.width - (this.player.right() % config.wall.width)) &&
          obstacle.top() >=
            this.player.top() - (this.player.top() % config.wall.height) - config.wall.height &&
          obstacle.bottom() <=
            this.player.bottom() +
              config.wall.height +
              (config.wall.height - (this.player.bottom() % config.wall.height))
      )
      .forEach((obstacle) => {
        this.player.hitWith(obstacle);
      });
  },
};
