class Wall extends Component {
  constructor(x, y, breakable) {
    super(x, y, 50, 50);
    this.image = new Image();
    this.image.src = breakable ? "../images/breakable-wall.png" : "../images/unbreakable-wall.png";
    this.breakable = breakable;
  }
  draw() {
    game.ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
  }
}
