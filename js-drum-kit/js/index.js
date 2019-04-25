'use strict';

(function() {
  const removeTransition = e => {
    if (e.propertyName !== 'transform') return;
    e.target.classList.remove('playing');
  };

  const onKeyDown = e => {
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    playSound(key, audio);
  };

  const onMouseDown = e => {
    const key = e.target;
    const audio = document.querySelector(
      'audio[data-key="' + e.target.getAttribute('data-key') + '"]'
    );
    playSound(key, audio);
  };

  const playSound = (key, audio) => {
    if (!audio) return;
    key.classList.add('playing');
    audio.currentTime = 0;
    audio.play();
  };

  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => {
    key.addEventListener('transitionend', removeTransition);
    key.addEventListener('click', onMouseDown);
  });
  window.addEventListener('keydown', onKeyDown);
})();
