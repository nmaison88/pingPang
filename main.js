import ScoreboardView from './scoreboard/ScoreboardView.js';

let playerOneScore = 0;
let playerTwoScore = 0;
const root = document.querySelector('#app');
let servingPlayer = 0;
document.onkeypress = function (e) {
  e = e || window.event;
  if (playerOneScore >= 21 || playerTwoScore >= 21) {
    if (view.checkIfWinnerStillBoasting() === true) {
      view.resetWinner();
      view.updateServer(1);
      servingPlayer = 0;
      playerOneScore = 0;
      playerTwoScore = 0;
      new Audio('player1.wav').play();
      setTimeout(() => {
        new Audio('player2.wav').play();
        setTimeout(() => {
          new Audio('321.wav').play();
        }, 1500);
      }, 1000);
    }
    view.update(playerOneScore, playerTwoScore);
  }
};
const view = new ScoreboardView(
  root,
  'Player One',
  'Player Two',
  (player, direction) => {
    const difference = direction === 'minus' ? -1 : 1;
    view.updateServer(servingPlayer);
    servingPlayer++;
    let audio;

    if (player === 'one') {
      playerOneScore = Math.max(playerOneScore + difference, 0);
      audio = new Audio('player1.wav');
    } else {
      playerTwoScore = Math.max(playerTwoScore + difference, 0);
      audio = new Audio('player2.wav');
    }
    audio.play();

    // winning point reached
    if (playerOneScore >= 21 || playerTwoScore >= 21) {
      // winner already announced
      if (view.checkIfWinnerStillBoasting() === true) {
        view.resetWinner();
        playerOneScore = 0;
        playerTwoScore = 0;
      }
      // winning point reached
      else {
        const winningPlayer = playerOneScore === 21 ? 1 : 2;
        // wait for player x sound to finish
        setTimeout(() => {
          audio = new Audio('game over.wav');
          audio.play();
        }, 2000);

        view.showWinner();
        view.wordflick(winningPlayer);
        view.disableCounters();
      }
      servingPlayer = 0;
    }
    // sudden death!
    if (playerOneScore === 20 && playerTwoScore === 20) {
      // wait for player x sound to finish
      setTimeout(() => {
        audio = new Audio('sudden death.wav');
        audio.play();
      }, 2000);
    }
    view.update(playerOneScore, playerTwoScore);
  },
  () => {
    view.resetWinner();
    view.updateServer(1);
    servingPlayer = 0;
    playerOneScore = 0;
    playerTwoScore = 0;
    view.update(playerOneScore, playerTwoScore);
    new Audio('player1.wav').play();
    setTimeout(() => {
      new Audio('player2.wav').play();
      setTimeout(() => {
        new Audio('321.wav').play();
      }, 1500);
    }, 1000);
  }
);
