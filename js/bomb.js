class Bomb extends ComponentImageAnimation {
  constructor(x, y) {
    super(x, y, config.wall.width, config.wall.height, config.bomb.imageSrc, 3, {
      x: 1,
      y: 0,
    });
    this.power = config.bomb.power;
    this.timer = config.bomb.timer;
  }
  explosion() {
    const directions = {
      N: { isWall: false, image: config.flame.image.N },
      S: { isWall: false, image: config.flame.image.S },
      E: { isWall: false, image: config.flame.image.E },
      W: { isWall: false, image: config.flame.image.W },
    };
    this.createFlame({ x: this.x, y: this.y }, config.flame.image.center);
    for (let i = 1; i <= this.power; i++) {
      let position = {};
      for (let direction in directions) {
        switch (direction) {
          case dictionary.direction.E:
            position = { x: this.x + config.wall.width * i, y: this.y };
            break;
          case dictionary.direction.W:
            position = { x: this.x + config.wall.width * -i, y: this.y };
            break;
          case dictionary.direction.S:
            position = { x: this.x, y: this.y + config.wall.height * i };
            break;
          case dictionary.direction.N:
            position = { x: this.x, y: this.y + config.wall.height * -i };
            break;
        }

        if (!directions[direction].isWall) {
          let wall = this.checkWallPresence(position);
          if (!wall) {
            this.createFlame(
              position,
              i === this.power
                ? directions[direction].image.top
                : directions[direction].image.middle
            );
          } else {
            if (wall.breakable) wall.breakWall(wall);
            directions[direction].isWall = true;
          }
        }
      }
    }
  }

  checkWallPresence(position) {
    return game.obstacles.find(
      (obstacle) =>
        obstacle.x == position.x && obstacle.y == position.y && obstacle.constructor === Wall
    );
  }

  createFlame(position, imageType) {
    game.obstacles.push(new Flame(position.x, position.y, imageType));
    this.decreaseTimerBeforeRemove(position, Flame, config.bomb.timer);
  }
}
