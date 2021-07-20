class Game {
  static TIMELIMIT = 10;
  static CARROTS = 10;
  static BUGS = 20;

  constructor() {
    this.timer = null;
    this.timeLimit = Game.TIMELIMIT;
    this.carrots = Game.CARROTS;
    this.result = null;

    this.divTime = document.querySelector('.game-time');
    this.divCarrots = document.querySelector('.game-carrots');
    this.divUnitArea = document.querySelector('.game-unitarea');
    this.divUnitArea.addEventListener('click', (e) => {
      if (!this.timer) return;

      if (e.target.classList.contains('carrot')) this.clickCarrot(e.target);
      else if (e.target.classList.contains('bug')) this.gameover();
    });
    this.divGameover = document.querySelector('.game-over');

    this.playBtn = document.querySelector('.game-play');
    this.stopBtn = document.querySelector('.game-stop');
    this.replayBtn = document.querySelector('.game-replay');
    this.playBtn.addEventListener('click', this.play.bind(this));
    this.stopBtn.addEventListener('click', this.stop.bind(this));
    this.replayBtn.addEventListener('click', this.replay.bind(this));
  }

  show(target) {
    target.removeAttribute('style');
    if (target.classList.contains('hide')) target.classList.remove('hide');
  }

  hide(target, asOpacity) {
    if (asOpacity) target.setAttribute('style', 'opacity: 0;');
    else if (!target.classList.contains('hide')) target.classList.add('hide');
  }

  stopTimer() {
    clearInterval(this.timer);
    this.timer = null;
  }

  start() {
    this.timeLimit = Game.TIMELIMIT;
    this.carrots = Game.CARROTS;

    const imgs = this.divUnitArea.querySelectorAll('img');
    imgs.forEach((img) => img.remove());

    this.setCarrots();
    this.setBugs();
  }

  play() {
    this.timer = setInterval(() => {
      this.timeLimit--;
      this.invalidate();

      if (this.timeLimit === 0) this.gameover();
    }, 1000);
    this.hide(this.playBtn);
    this.show(this.stopBtn);
  }

  stop() {
    this.stopTimer();
    this.hide(this.stopBtn, true);
    this.hide(this.playBtn);
    this.show(this.divGameover);
    this.divGameover.querySelector('.game-endtext').innerHTML = 'Replay?';
  }

  replay() {
    this.hide(this.divGameover);
    this.start();
    this.invalidate();
    this.play();
  }

  gameover() {
    this.stopTimer();
    this.hide(this.stopBtn, true);
    this.hide(this.playBtn);
    this.show(this.divGameover);
    this.divGameover.querySelector('.game-endtext').innerHTML = 'YOU LOST';
  }

  win() {
    this.stopTimer();
    this.hide(this.stopBtn, true);
    this.hide(this.playBtn);
    this.show(this.divGameover);
    this.divGameover.querySelector('.game-endtext').innerHTML = 'YOU WON';
  }

  invalidate() {
    this.divTime.innerHTML = `0:${this.timeLimit}`;
    this.divCarrots.innerHTML = this.carrots;
  }

  setCarrots() {
    const width = this.divUnitArea.offsetWidth;
    const height = this.divUnitArea.offsetHeight;

    for (let i = 0; i < Game.CARROTS; i++) {
      const randomX = Math.random() * (width - 80);
      const randomY = Math.random() * (height - 80);
      const style = `left:${randomX}px;top:${randomY}px;`;

      const carrot = document.createElement('img');
      carrot.className = 'carrot';
      carrot.setAttribute('src', 'img/carrot.png');
      carrot.setAttribute('style', style);
      this.divUnitArea.appendChild(carrot);
    }
  }

  setBugs() {
    const width = this.divUnitArea.offsetWidth;
    const height = this.divUnitArea.offsetHeight;

    for (let i = 0; i < Game.BUGS; i++) {
      const randomX = Math.random() * (width - 50);
      const randomY = Math.random() * (height - 50);
      const style = `left:${randomX}px;top:${randomY}px;`;

      const bug = document.createElement('img');
      bug.className = 'bug';
      bug.setAttribute('src', 'img/bug.png');
      bug.setAttribute('style', style);
      this.divUnitArea.appendChild(bug);
    }
  }

  clickCarrot(carrot) {
    carrot.remove();

    this.carrots--;
    this.invalidate();

    if (this.carrots === 0) this.win();
  }
}

window.addEventListener('load', () => {
  const game = new Game();
  game.start();
});