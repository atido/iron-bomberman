class Component {
  constructor(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
}

class ComponentImage extends Component {
  constructor(x, y, width, height, imageSrc) {
    super(x, y, width, height);
    this.image = new Image();
    this.image.src = imageSrc;
  }
  draw() {
    game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
