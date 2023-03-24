const game = {
  canvas: undefined,
  ctx: undefined,
  width: config.game.width,
  height: config.game.height,
  playersNb: undefined,
  animationFrameId: undefined,
  players: [],
  enemies: [],
  walls: [],
  bombs: [],
  artifacts: [],
  flames: [],
  background: undefined,
  remainingArtifacts: undefined,
  time: config.timer.main,
  timerId: undefined,
  start(playersNb = 1) {
    this.checkIfGameRun();
    this.playersNb = playersNb;
    this.reset();
    this.timerId = this.timer("#time");
    this.animate();
  },
  animate() {
    this.clear();
    this.updateAll();
    if (!this.checkGameOver()) this.animationFrameId = requestAnimationFrame(() => this.animate());
    else this.gameIsOver();
  },
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  reset() {
    this.canvas = document.querySelector("canvas");
    this.canvas.width = this.width;
    this.canvas.height = this.height;
    this.ctx = this.canvas.getContext("2d");
    this.time = config.timer.main;
    this.walls = [];
    this.bombs = [];
    this.artifacts = [];
    this.flames = [];
    this.players = [];
    this.enemies = [];
    if (this.playersNb == 1) this.createEnemies();
    this.createPlayers();
    this.background = new Background();
    this.generateWalls();
    this.remainingArtifacts = config.artifact.defaultQty;
  },
  updateAll() {
    this.background.update();
    this.walls.forEach((wall) => wall.update());
    this.bombs.forEach((bomb) => bomb.update());
    this.flames.forEach((flame) => flame.update());
    this.artifacts.forEach((artifact) => artifact.update());
    this.enemies = this.enemies.filter((enemy) => !enemy.isDead);
    this.enemies.forEach((enemy) => enemy.update());
    this.players.forEach((player) => player.update());
  },
  gameIsOver() {
    clearInterval(this.timerId);
    showGameOver(this.getWinner(), this.time, this.playersNb);
  },
  checkGameOver() {
    return this.players.some((player) => player.isDead) || this.time == 0;
  },
  checkIfGameRun() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
  createPlayers() {
    for (let i = 0; i <= this.playersNb - 1; i++) {
      this.players.push(new Player(keyboard[i].keys, config.players[i]));
    }
  },
  createEnemies() {
    this.enemies.push(new Enemy());
    setInterval(() => this.enemies.push(new Enemy()), 5000);
  },
  getWinner() {
    let player = this.players.filter((player) => !player.isDead)[0];
    if (!player) {
      player = this.players.sort((a, b) => a.score > b.score)[0];
    }
    return { winner: player.id, score: player.score };
  },
  generateWalls() {
    map.forEach((row, i) => {
      row.forEach((element, j) => {
        switch (element) {
          case "x":
            this.walls.push(new Wall(j * config.wall.width, i * config.wall.height, false));
            break;
          case "o":
            this.walls.push(new Wall(j * config.wall.width, i * config.wall.height, true));
            break;
        }
      });
    });
  },
  timer(htmlId) {
    return setInterval(() => {
      if (htmlId) document.querySelector(htmlId).innerHTML = --this.time;
    }, 1000);
  },
};
