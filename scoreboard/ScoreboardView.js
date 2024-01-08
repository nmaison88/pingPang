export default class ScoreboardView {
  constructor(root, playerOneName, playerTwoName, onControlButtonClick) {
    this.root = root;
    this.root.innerHTML = `
	<div >
  <section class="wrapper">
  <div class="top">Ping Pang</div>
  <div class="bottom" aria-hidden="true">Ping Pang</div>
</section>
	<div class="scoreboard">

				<div class="scoreboard__name scoreboard__name--one">${playerOneName}</div>
				<div class="scoreboard__name scoreboard__name--two">${playerTwoName}</div>
				<div class="scoreboard__score" data-for-player="one">0</div>
				<div class="scoreboard__score" data-for-player="two">0</div>
				<div class="scoreboard__controls" data-for-player="one">
					<button class="scoreboard__control-button">-</button>
					<button class="scoreboard__control-button">+</button>
				</div>
				<div class="scoreboard__controls" data-for-player="two">
					<button class="scoreboard__control-button">-</button>
					<button class="scoreboard__control-button">+</button>
				</div>
        <p class="serve"> first serve</p>
				</div>
				<div class="word" hidden></div>

			</div>
		`;

    this.root
      .querySelectorAll('.scoreboard__control-button')
      .forEach((controlButton) => {
        controlButton.addEventListener('click', () => {
          const direction =
            controlButton.textContent === '-' ? 'minus' : 'plus';
          const player = controlButton.closest('.scoreboard__controls').dataset
            .forPlayer;

          onControlButtonClick(player, direction);
        });
      });
  }

  update(playerOneScore, playerTwoScore) {
    this.root.querySelector(
      ".scoreboard__score[data-for-player='one']"
    ).textContent = playerOneScore;
    this.root.querySelector(
      ".scoreboard__score[data-for-player='two']"
    ).textContent = playerTwoScore;
  }

  wordflick(player) {

    let winningPlayer = player == 1 ? 'Player One' : 'Player Two';
    let LosingPlayer = player == 2 ? 'Player One' : 'Player Two';
    let words = [
        `${winningPlayer} Wins`,
        `${LosingPlayer} Loses`,
        'Press any button to restart',
      ],
      part,
      i = 0,
      offset = 0,
      len = words.length,
      forwards = true,
      skip_count = 0,
      skip_delay = 15,
      speed = 70;
    const wordInterval = setInterval(() => {
      if (forwards) {
        if (offset >= words[i].length) {
          ++skip_count;
          if (skip_count == skip_delay) {
            forwards = false;
            skip_count = 0;
          }
        }
      } else {
        if (offset == 0) {
          forwards = true;
          i++;
          offset = 0;
          if (i >= len) {
            i = 0;
          }
        }
      }
      part = words[i].substr(0, offset);
      if (skip_count == 0) {
        if (forwards) {
          offset++;
        } else {
          offset--;
        }
      }
      this.updateWord(part);
	  if(!this.checkIfWinnerStillBoasting()){
		clearInterval(wordInterval);
	  }
    }, speed);
  }
  updateWord(part) {
    this.root.querySelector('.word').textContent = part;
  }
  showWinner() {
    this.root.querySelector('.word').hidden = false;
  }
  resetWinner() {
    this.root.querySelector('.word').hidden = true;
  }
  updateServer(position) {
    let serve;
  
    if(Math.abs(position % 2) == 1){
      serve = 'first'
    }else{
      serve = 'second'
    }
    this.root.querySelector('.serve').textContent = `${serve} serve`;
  }
  checkIfWinnerStillBoasting() {
    const visible = this.root.querySelector('.word').hidden === false;
    return visible;
  }
}
