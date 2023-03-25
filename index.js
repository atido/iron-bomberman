const gameAreaElement = document.getElementById("game-area");
const welcomeElement = document.getElementById("welcome");
const instructionsElement = document.getElementById("instructions");
const gameOverElement = document.getElementById("game-over");

function generateGameHeader(playersNb) {
  const template = document.querySelector("#player-template");
  const headerElement = document.createElement("header");
  const timerElement = document.querySelector("#timer-template").content.cloneNode(true);
  for (let i = playersNb; i >= 1; i--) {
    const playerElement = template.content.cloneNode(true);
    playerElement.querySelector(".player").id = `player${i}`;
    playerElement.querySelector(".player__img").src = config.players[i - 1].avatar.src;
    headerElement.appendChild(playerElement);
    if (i == 1) headerElement.appendChild(timerElement);
  }
  return headerElement;
}

function generateInstructionsKeys(playersNb) {
  const templateInstructionsKeys = document.querySelector("#instructions__keys-template");
  const instructionsCommandsElement = instructionsElement.querySelector(".instructions__commands");

  for (let i = 1; i <= playersNb; i++) {
    const instructionsKeysElement = templateInstructionsKeys.content.cloneNode(true);
    instructionsKeysElement.querySelector(
      ".instructions__keys"
    ).id = `instructions-keys-player${i}`;
    instructionsKeysElement.querySelector(".instructions__keys-img").src =
      keyboard[i - 1].image.move.src;
    instructionsKeysElement.querySelector(".instructions__drop-img").src =
      keyboard[i - 1].image.dropBomb.src;
    instructionsKeysElement.querySelector(
      ".instructions__keys-text"
    ).innerHTML = `Move player ${i} with these keys`;
    instructionsKeysElement.querySelector(".instructions__drop-text").innerHTML = "Drop Bomb";
    instructionsCommandsElement.insertBefore(
      instructionsKeysElement,
      instructionsCommandsElement.children[0]
    );
  }
}

function showGame(playersNb) {
  const canvasElement = document.createElement("canvas");
  gameAreaElement.appendChild(generateGameHeader(playersNb));
  gameAreaElement.appendChild(canvasElement);
}

function showGameOver(gameEnd, time, playersNb) {
  gameOverElement.style.display = "block";
  const textElement = gameOverElement.querySelector(".game-over__text");
  const scoreElement = gameOverElement.querySelector(".game-over__scores");
  const imgElement = gameOverElement.querySelector(".game-over__winner-img");

  if (playersNb > 1) {
    imgElement.src = config.players[gameEnd.winner - 1].avatar.src;
    if (time == 0) {
      textElement.innerHTML = `Wins on Score`;
      scoreElement.innerHTML = gameEnd.score;
    } else {
      textElement.innerHTML = `Wins`;
    }
  } else {
    textElement.innerHTML = `Your Score`;
    scoreElement.innerHTML = gameEnd.score;
  }
}

function showInstructions(playersNb) {
  instructionsElement.style.display = "block";
  const titleElement = instructionsElement.querySelector(".instructions__title");
  const textElement = instructionsElement.querySelector(".instructions__text");
  const startElement = instructionsElement.querySelector("#start-button");

  switch (playersNb) {
    case "1":
      titleElement.innerHTML = "SOLO GAME";
      textElement.innerHTML = "Fight against terrible bots";
      generateInstructionsKeys(1);
      startElement.value = "1";
      break;

    case "2":
      titleElement.innerHTML = "BATTLE GAME";
      textElement.innerHTML = "Two Players needed";
      generateInstructionsKeys(2);
      startElement.value = "2";
      break;
  }
}

window.onload = () => {
  document.querySelectorAll("#game-choice button").forEach((button) => {
    button.addEventListener("click", (event) => {
      showInstructions(event.currentTarget.value);
      welcomeElement.style.display = "none";
    });
  });
  document.querySelector("#start-button").addEventListener("click", (event) => {
    showGame(event.currentTarget.value);
    instructionsElement.style.display = "none";
    game.start(event.currentTarget.value);
  });
};
