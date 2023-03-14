const game = {
  canvas: document.querySelector("#canvas"),
  ctx: this.canvas.getContext("2d"),
  width: this.canvas.width,
  height: this.canvas.height,
  animationFrameId: undefined,
  gameOver: false,
  player: undefined,
  background: undefined,
  walls: [],
  timer: context.timer.main,
  start() {
    this.checkIfRun();
    this.reset();
    timer(game.timer, "#main-timer");
    this.animate();
  },
  animate() {
    this.clear();
    this.generateWalls();
    this.drawAll();
    if (!this.gameOver) this.animationFrameId = requestAnimationFrame(() => this.animate());
  },
  clear() {
    this.ctx.clearRect(0, 0, this.width, this.height);
  },
  reset() {
    this.gameOver = false;
    this.player = new Player(10, 10);
    this.background = new Background();
    this.walls = [];
    this.timer = context.timer.main;
  },
  generateWalls() {
    for (let i = 1; i <= 6; i++) {
      for (let j = 1; j <= 5; j++) {
        this.walls.push(new Wall(100 * i, 100 * j, false));
      }
    }
  },
  drawAll() {
    this.background.draw();
    this.player.draw();
    this.walls.forEach((wall) => wall.draw());
  },
  checkIfRun() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  },
};
