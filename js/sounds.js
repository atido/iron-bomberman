class Channel {
  constructor(audio_uri) {
    this.audio_uri = audio_uri;
    this.resource = new Audio(audio_uri);
  }
  play() {
    this.resource.play();
  }
}

class Switcher {
  constructor(audio_uri, num) {
    this.channels = [];
    this.num = num;
    this.index = 0;

    for (var i = 0; i < num; i++) {
      this.channels.push(new Channel(audio_uri));
    }
  }
  play() {
    this.channels[this.index++].play();
    this.index = this.index < this.num ? this.index : 0;
  }
}

const dropBombAudio = new Switcher("../sounds/bombDrop.mp3", 10);
const artifactCatchAudio = new Switcher("../sounds/artifactCatch.mp3", 5);
const bombExplodesAudio = new Switcher("../sounds/bombExplodes.mp3", 10);

function playAudio(src) {
  const audio = new Switcher(src, 5);
  audio.play();
}
