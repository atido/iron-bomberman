class Bomb extends ComponentImageAnimation {
  constructor(x, y, power) {
    super(x, y, config.wall.width, config.wall.height, config.bomb.imageSrc, 3, {
      x: 1,
      y: 0,
    });
    this.power = power;
    this.timer = config.bomb.timer;
  }
  explosion() {
    let wallExplodedCounter = 0;
    const directions = {
      up: { isWall: false, image: config.flame.image.up },
      down: { isWall: false, image: config.flame.image.down },
      right: { isWall: false, image: config.flame.image.right },
      left: { isWall: false, image: config.flame.image.left },
    };
    this.createFlame({ x: this.x, y: this.y }, config.flame.image.center);
    for (let i = 1; i <= this.power; i++) {
      let position = {};
      for (let direction in directions) {
        switch (direction) {
          case dictionary.direction.up:
            position = { x: this.x, y: this.y + config.wall.height * -i };
            break;
          case dictionary.direction.down:
            position = { x: this.x, y: this.y + config.wall.height * i };
            break;
          case dictionary.direction.right:
            position = { x: this.x + config.wall.width * i, y: this.y };
            break;
          case dictionary.direction.left:
            position = { x: this.x + config.wall.width * -i, y: this.y };
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
            if (wall.breakable) {
              wall.breakWall(wall);
              wallExplodedCounter++;
            }
            directions[direction].isWall = true;
          }
        }
      }
    }
    bombExplodesAudio.play();
    return wallExplodedCounter;
  }

  checkWallPresence(position) {
    return game.walls.find((wall) => wall.x == position.x && wall.y == position.y);
  }

  createFlame(position, imageType) {
    game.flames.push(new Flame(position.x, position.y, imageType));
    this.decreaseTimerBeforeRemove(position, game.flames, config.bomb.timer);
  }
}
