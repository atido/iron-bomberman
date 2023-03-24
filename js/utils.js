function randomLuck(winCondition, length) {
  return Math.floor(Math.random() * length) < winCondition;
}
function timer(htmlId, time) {
  return setInterval(() => {
    if (htmlId) document.querySelector(htmlId).innerHTML = --time;
  }, 1000);
}
