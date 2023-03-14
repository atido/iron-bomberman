class Background extends Component {
  constructor() {
    super(0, 0, game.width, game.height);

    this.image = new Image();
    this.image.src = "../images/background-empty.png";
  }
  draw() {
    game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
