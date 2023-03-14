function timer(time, htmlId) {
  const timerId = setInterval(() => {
    document.querySelector(htmlId).innerHTML = --time;
    if (time == 0) clearInterval(timerId);
  }, 1000);
}
