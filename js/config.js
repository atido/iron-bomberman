const dictionary = {
  artifact: { bomb: "bomb", flame: "flame", roller: "roller" },
  direction: { N: "N", S: "S", E: "E", W: "W" },
};
const config = {
  background: {
    imageSrc: "../images/background-empty.png",
  },
  player: {
    width: 40,
    height: 40,
    bombQty: 3,
    velocity: {
      x: 5,
      y: 5,
    },
  },
  wall: {
    width: 50,
    height: 50,
    imageBreakable: { src: "../images/wall-breakable.png", framesMax: 7 },
    imageUnbreakable: { src: "../images/wall-unbreakable.png", framesMax: 1 },
    timer: 2000,
  },
  artifact: {
    timer: 5000,
  },
  artifacts: [
    {
      code: dictionary.artifact.bomb,
      width: 50,
      height: 50,
      image: { src: "../images/artifact-bomb.png", framesMax: 2 },
    },
    {
      code: dictionary.artifact.flame,
      width: 50,
      height: 50,
      image: { src: "../images/artifact-flame.png", framesMax: 2 },
    },
    {
      code: dictionary.artifact.roller,
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
      N: {
        top: { src: "../images/flame-topN.png", framesMax: 3 },
        middle: { src: "../images/flame-middleNS.png", framesMax: 3 },
      },
      S: {
        top: { src: "../images/flame-topS.png", framesMax: 3 },
        middle: { src: "../images/flame-middleNS.png", framesMax: 3 },
      },
      E: {
        top: { src: "../images/flame-topE.png", framesMax: 3 },
        middle: { src: "../images/flame-middleWE.png", framesMax: 3 },
      },
      W: {
        top: { src: "../images/flame-topW.png", framesMax: 3 },
        middle: { src: "../images/flame-middleWE.png", framesMax: 3 },
      },
    },
  },

  timer: {
    main: 60,
  },

  bomb: {
    timer: 2000,
    imageSrc: "../images/bomb.png",
    power: 2,
  },
};
