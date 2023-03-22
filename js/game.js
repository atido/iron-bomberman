const game = {
  canvas: document.querySelector("#canvas"),
  ctx: this.canvas.getContext("2d"),
  width: this.canvas.width,
  height: this.canvas.height,
  animationFrameId: undefined,
  gameOver: false,
  player: undefined,
  enemies: [],
  background: undefined,
  obstacles: [],
  remainingArtifacts: undefined,
  timer: config.timer.main,
  start() {
    this.checkIfGameRun();
    this.reset();
    timer(game.timer, timerId);
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
    this.enemies = [];
    this.gameOver = false;
    this.player = new Player(config.wall.width + 5, config.wall.height + 5);
    /*this.enemies.push(new Enemy(205, 55));
    this.enemies.push(new Enemy(225, 55));
    this.enemies.push(new Enemy(205, 55));
    this.enemies.push(new Enemy(225, 55));*/
    this.background = new Background();
    this.generateWalls();
    //this.obstacles.push(new Bomb(500, 55));
    //this.obstacles.push(new Bomb(400, 55));
    this.timer = config.timer.main;
    this.remainingArtifacts = config.artifact.defaultQty;
  },
  updateAll() {
    this.background.update();
    this.obstacles.forEach((obstacle) => obstacle.update());
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead);
    this.enemies.forEach((enemy) => enemy.update());
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
};
