const p1 = {
  score: 0,
  button: document.querySelector('#p1Button'),
  display: document.querySelector('#p1Display'),
};
const p2 = {
  score: 0,
  button: document.querySelector('#p2Button'),
  display: document.querySelector('#p2Display'),
};

const resetButton = document.querySelector('#reset');
const winningScoreSelect = document.querySelector('#playto');
let winningScore = parseInt(winningScoreSelect.value);
let isGameOver = false;

function updateScores(player, opponent) {
  if (!isGameOver) {
    player.score += 1;
    if (player.score === winningScore) {
      isGameOver = true;
      player.display.classList.add('has-text-success');
      opponent.display.classList.add('has-text-danger');
      player.button.disabled = true;
      opponent.button.disabled = true;
    }
    player.display.textContent = player.score;
  }
}

p1.button.addEventListener('click', function () {
  updateScores(p1, p2);
  winBy2(p1, p2);
});
p2.button.addEventListener('click', function () {
  updateScores(p2, p1);
  winBy2(p1, p2);
});

winningScoreSelect.addEventListener('change', function (e) {
  winningScore = parseInt(this.value);
  reset();
});

resetButton.addEventListener('click', reset);

function winBy2(player, opponent) {
  if (player.score === opponent.score && player.score === winningScore - 1) {
    winningScore++;
    winningScoreSelect.selectedOptions[0].value = winningScore;
    winningScoreSelect.classList.add('overtime');
    winningScoreSelect.selectedOptions[0].innerText = `Tie BREAK to ${winningScore}`;
  }
}

function reset() {
  isGameOver = false;
  for (let p of [p1, p2]) {
    p.score = 0;
    p.display.textContent = 0;
    p.display.classList.remove('has-text-success', 'has-text-danger');
    p.button.disabled = false;
  }
  for (let i = 0; i <= 8; i++) {
    winningScoreSelect[i].value = 3 + i;
    winningScoreSelect[i].innerText = 3 + i;
  }
  winningScoreSelect.classList.remove('overtime');
  winningScore = parseInt(winningScoreSelect.value);
}
