class Enemy extends ComponentMovingAnimation {
  constructor(enemy = config.enemies[0]) {
    super(enemy.defaultPosition.x, enemy.defaultPosition.y, enemy);
    this.lastCollisions = [];
    this.collisions = [];
    this.velocity = { x: 5, y: 0 };
    this.directions = {
      up: { x: 0, y: -this.velocityMax.y },
      down: { x: 0, y: this.velocityMax.y },
      right: { x: this.velocityMax.x, y: 0 },
      left: { x: -this.velocityMax.x, y: 0 },
    };
  }

  checkCollision() {
    this.collisions = [];

    if (game.flames.some((flame) => this.isCollisionWith(flame, true))) {
      game.players[0].score += config.score.enemy;
      this.dies();
    }
    for (let direction in this.directions) {
      const component = new Component(this.x, this.y, this.width, this.height);
      component.setVelocity(this.directions[direction]);
      game.walls.forEach((obstacle) => {
        if (!this.collisions.includes(direction) && component.isCollisionWith(obstacle, true)) {
          this.collisions.push(direction);
        }
      });
    }
    this.updateDirection();
  }

  updateDirection() {
    if (this.collisions.length > this.lastCollisions.length) {
      this.lastCollisions = this.collisions;
    }

    if (JSON.stringify(this.collisions) !== JSON.stringify(this.lastCollisions)) {
      if (!this.lastCollisions.includes(dictionary.direction.right) && this.velocity.x > 0) {
        this.lastCollisions.push(dictionary.direction.right);
      } else if (!this.lastCollisions.includes(dictionary.direction.left) && this.velocity.x < 0) {
        this.lastCollisions.push(dictionary.direction.left);
      } else if (!this.lastCollisions.includes(dictionary.direction.down) && this.velocity.y > 0) {
        this.lastCollisions.push(dictionary.direction.down);
      } else if (!this.lastCollisions.includes(dictionary.direction.up) && this.velocity < 0) {
        this.lastCollisions.push(dictionary.direction.up);
      }
      const pathways = this.lastCollisions.filter((collision) => {
        return !this.collisions.includes(collision);
      });

      const direction = pathways[Math.floor(Math.random() * pathways.length)];
      switch (direction) {
        case dictionary.direction.right:
          this.moveRight();
          this.velocity.y = 0;
          break;
        case dictionary.direction.left:
          this.moveLeft();
          this.velocity.y = 0;
          break;
        case dictionary.direction.up:
          this.moveUp();
          this.velocity.x = 0;
          break;
        case dictionary.direction.down:
          this.moveDown();
          this.velocity.x = 0;
          break;
      }
      this.lastCollisions = [];
    }
  }
}
