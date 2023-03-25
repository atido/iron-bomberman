const dictionary = {
  element: { score: "score", bomb: "bomb", flame: "flame", roller: "roller" },
  direction: { up: "up", down: "down", right: "right", left: "left" },
  action: {
    up: { run: "run-up", stop: "stop-up" },
    down: { run: "run-down", stop: "stop-down" },
    right: { run: "run-right", stop: "stop-right" },
    left: { run: "run-left", stop: "stop-left" },
  },
  gameMode: { solo: 1, battle: 2 },
};
const config = {
  game: { width: 750, height: 650 },
  background: {
    imageSrc: "../images/background-empty.png",
  },
  players: [
    {
      id: 1,
      defaultPosition: { x: 655, y: 55 },
      characteristics: {
        width: 40,
        height: 40,
        bombQty: 13,
        bombPower: 2,
        defaultVelocity: { x: 5, y: 5 },
        image: {
          width: 40,
          height: 60,
          offset: { x: 1, y: 0 },
        },
      },
      audios: {
        dies: { src: "../sounds/playerDies.mp3" },
      },
      avatar: { src: "../images/player1-avatar.png" },
      animations: {
        up: {
          run: { src: "../images/player1-runUp.png", framesMax: 2 },
          stop: { src: "../images/player1-stopUp.png", framesMax: 1 },
        },
        down: {
          run: { src: "../images/player1-runDown.png", framesMax: 2 },
          stop: { src: "../images/player1-stopDown.png", framesMax: 1 },
        },
        right: {
          run: { src: "../images/player1-runRight.png", framesMax: 2 },
          stop: { src: "../images/player1-stopRight.png", framesMax: 1 },
        },
        left: {
          run: { src: "../images/player1-runLeft.png", framesMax: 2 },
          stop: { src: "../images/player1-stopLeft.png", framesMax: 1 },
        },
        health: {
          dead: { src: "../images/player2-dies.png", framesMax: 6 },
        },
      },
    },
    {
      id: 2,
      defaultPosition: { x: 55, y: 55 },
      characteristics: {
        width: 40,
        height: 40,
        bombQty: 13,
        bombPower: 2,
        defaultVelocity: { x: 5, y: 5 },
        image: {
          width: 40,
          height: 60,
          offset: { x: 1, y: 0 },
        },
      },
      audios: {
        dies: { src: "../sounds/playerDies.mp3" },
      },
      avatar: { src: "../images/player2-avatar.png" },
      animations: {
        up: {
          run: { src: "../images/player2-runUp.png", framesMax: 2 },
          stop: { src: "../images/player2-stopUp.png", framesMax: 1 },
        },
        down: {
          run: { src: "../images/player2-runDown.png", framesMax: 2 },
          stop: { src: "../images/player2-stopDown.png", framesMax: 1 },
        },
        right: {
          run: { src: "../images/player2-runRight.png", framesMax: 2 },
          stop: { src: "../images/player2-stopRight.png", framesMax: 1 },
        },
        left: {
          run: { src: "../images/player2-runLeft.png", framesMax: 2 },
          stop: { src: "../images/player2-stopLeft.png", framesMax: 1 },
        },
        health: {
          dead: { src: "../images/player2-dies.png", framesMax: 6 },
        },
      },
    },
  ],
  enemies: [
    {
      defaultPosition: { x: 65, y: 55 },
      characteristics: {
        width: 40,
        height: 40,
        defaultVelocity: { x: 2, y: 2 },
        image: {
          width: 40,
          height: 60,
          offset: { x: 2, y: 0 },
        },
      },
      audios: {
        dies: { src: "../sounds/enemyDies.mp3" },
      },
      animations: {
        up: {
          run: { src: "../images/enemy1-runUp.png", framesMax: 4 },
          stop: { src: "../images/enemy1-stopUp.png", framesMax: 1 },
        },
        down: {
          run: { src: "../images/enemy1-runDown.png", framesMax: 4 },
          stop: { src: "../images/enemy1-stopDown.png", framesMax: 1 },
        },
        right: {
          run: { src: "../images/enemy1-runRight.png", framesMax: 4 },
          stop: { src: "../images/enemy1-stopRight.png", framesMax: 1 },
        },
        left: {
          run: { src: "../images/enemy1-runLeft.png", framesMax: 4 },
          stop: { src: "../images/enemy1-stopLeft.png", framesMax: 1 },
        },
        health: {
          dead: { src: "../images/enemy1-stopDown.png", framesMax: 1 },
        },
      },
    },
  ],
  wall: {
    width: 50,
    height: 50,
    imageBreakable: { src: "../images/wall-breakable.png", framesMax: 7 },
    imageUnbreakable: { src: "../images/wall-unbreakable.png", framesMax: 1 },
    timer: 2000,
  },
  artifact: {
    timer: 10000,
    defaultQty: 6,
  },
  score: {
    wall: 5,
    explosion: 1,
    artifact: 10,
    enemy: 15,
  },
  artifacts: [
    {
      code: dictionary.element.bomb,
      width: 50,
      height: 50,
      image: { src: "../images/artifact-bomb.png", framesMax: 2 },
    },
    {
      code: dictionary.element.flame,
      width: 50,
      height: 50,
      image: { src: "../images/artifact-flame.png", framesMax: 2 },
    },
    {
      code: dictionary.element.roller,
      width: 50,
      height: 50,
      image: { src: "../images/artifact-roller.png", framesMax: 2 },
    },
  ],
  flame: {
    width: 50,
    height: 50,
    image: {
      center: { src: "../images/flame-center.png", framesMax: 3 },
      up: {
        top: { src: "../images/flame-topUp.png", framesMax: 3 },
        middle: { src: "../images/flame-middleUD.png", framesMax: 3 },
      },
      down: {
        top: { src: "../images/flame-topDown.png", framesMax: 3 },
        middle: { src: "../images/flame-middleUD.png", framesMax: 3 },
      },
      right: {
        top: { src: "../images/flame-topRight.png", framesMax: 3 },
        middle: { src: "../images/flame-middleRL.png", framesMax: 3 },
      },
      left: {
        top: { src: "../images/flame-topLeft.png", framesMax: 3 },
        middle: { src: "../images/flame-middleRL.png", framesMax: 3 },
      },
    },
  },

  timer: {
    main: 60,
  },

  bomb: {
    timer: 2000,
    imageSrc: "../images/bomb.png",
  },
};
