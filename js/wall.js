class Wall extends ComponentImageAnimation {
  constructor(x, y, breakable) {
    const image = breakable ? config.wall.imageBreakable : config.wall.imageUnbreakable;
    super(
      x,
      y,
      config.wall.width,
      config.wall.height,
      image.src,
      image.framesMax,
      breakable ? { x: 1, y: 0 } : { x: 0, y: 0 },
      Math.ceil(config.bomb.timer / (16 * image.framesMax)),
      false
    );
    this.breakable = breakable;
  }
  breakWall(wall) {
    this.animate = true;
    this.decreaseTimerBeforeRemove({ x: wall.x, y: wall.y }, Wall, config.wall.timer, () => {
      if (
        randomLuck(
          game.remainingArtifacts,
          game.obstacles.filter((obstacle) => obstacle.constructor === Wall && obstacle.breakable)
            .length + 1
        )
      ) {
        const artifact = new Artifact(wall.x, wall.y);
        game.obstacles.push(artifact);
        this.decreaseTimerBeforeRemove(
          { x: artifact.x, y: artifact.y },
          Artifact,
          config.artifact.timer
        );
        game.remainingArtifacts--;
      }
    });
  }
}
