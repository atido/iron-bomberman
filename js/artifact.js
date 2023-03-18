class Artifact extends ComponentImageAnimation {
  constructor(x, y) {
    const artifact = this.random();
    super(
      x,
      y,
      config.wall.width,
      config.wall.height,
      artifact.image.src,
      artifact.image.framesMax,
      {
        x: 1,
        y: 0,
      },
      Math.ceil(config.artifact.timer / (16 * artifact.image.framesMax))
    );
  }
  random() {
    return config.artifacts[Math.floor(Math.random() * config.artifacts.length)];
  }
}
