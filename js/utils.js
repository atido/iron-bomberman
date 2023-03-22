function timer(time, htmlId) {
  const timerId = setInterval(() => {
    time--;
    if (htmlId) document.querySelector(htmlId).innerHTML = time;
    if (time == 0) clearInterval(timerId);
  }, 1000);
}

function randomLuck(winCondition, length) {
  return Math.floor(Math.random() * length) < winCondition;
}
