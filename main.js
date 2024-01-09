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
    if (player === 'one') {
      playerOneScore = Math.max(playerOneScore + difference, 0);
    } else {
      playerTwoScore = Math.max(playerTwoScore + difference, 0);
    }
    if (playerOneScore >= 21 || playerTwoScore >= 21) {
      if (view.checkIfWinnerStillBoasting() === true) {
        view.resetWinner();
        playerOneScore = 0;
        playerTwoScore = 0;
      } else {
        const winningPlayer = playerOneScore === 21 ? 1 : 2;
        view.showWinner();
        view.wordflick(winningPlayer);
        view.disableCounters();
      }
      servingPlayer = 0;
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

  }
);
