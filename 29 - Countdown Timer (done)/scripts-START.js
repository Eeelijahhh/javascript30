const displayTimer = document.querySelector('.display__time-left');
const displayEnd = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time]');

let countdown;

function timer(seconds) {
  // clear any existing timers 
  clearInterval(countdown);

  const now = Date.now();
  const then = now + seconds * 1000;
  // start with the first second
  displayTimeLeft(seconds);
  // timestamp of end
  displayTimeEnd(then);

  countdown = setInterval(() => {
    let secondsLeft = Math.round((then - Date.now()) / 1000);
    if (secondsLeft < 0) {
      clearInterval(countdown);
      return;
    }
    // display it
    displayTimeLeft(secondsLeft);
  }, 1000);
}

function displayTimeLeft(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainderSeconds = seconds % 60;
  const display = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;

  document.title = display;
  displayTimer.textContent = display;
}

function displayTimeEnd(timestamp) {
  const end = new Date(timestamp);
  const hours = end.getHours();
  const minutes = end.getMinutes();
  displayEnd.textContent = `Timer Ends At: ${hours < 10 ? '0' : 0}${hours}:${minutes < 10 ? '0' : ''}${minutes}`
}

function startTimer() {
  const seconds = this.dataset.time;
  timer(seconds);
}

buttons.forEach(button => button.addEventListener('click', startTimer));

document.customForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const minutes = this.minutes.value;
  const seconds = minutes * 60;
  timer(seconds);
  this.reset();
});