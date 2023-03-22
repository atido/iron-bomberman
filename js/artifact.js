class Artifact extends ComponentImageAnimation {
  constructor(x, y) {
    const artifact = config.artifacts[Math.floor(Math.random() * config.artifacts.length)];
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
      }
    );
    this.code = artifact.code;
  }
}
