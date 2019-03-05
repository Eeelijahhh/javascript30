window.addEventListener('keydown', playSound);

const keys = document.querySelectorAll('.key');
keys.forEach(key => key.addEventListener('transitionend', removeTransition));

function playSound(e) {
  const key = document.querySelector(`.key[data-key="${e.keyCode}"]`);
  const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  if (!audio) return; // stop the function from run all together
  audio.currentTime = 0; // rewind to the start
  audio.play();
  key.classList.add('playing');
}

function removeTransition(e) {
  if (e.propertyName !== 'transform') return; // skip if it is not a transform
  this.classList.remove('playing');
}