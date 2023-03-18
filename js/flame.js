class Flame extends ComponentImageAnimation {
  constructor(x, y, imageType) {
    super(
      x,
      y,
      config.flame.width,
      config.flame.height,
      imageType.src,
      imageType.framesMax,
      {
        x: 1,
        y: 0,
      },
      Math.floor(config.bomb.timer / (16 * imageType.framesMax))
    );
  }
}
