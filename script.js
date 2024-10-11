console.log("Waheguru JI");
let boxes = document.querySelectorAll(".box");
let resetBtn = document.getElementById("btn-reset");

// Winner popup
let winnerPopup = document.getElementById("overlay");
let winnerText = document.getElementById("winner-text");
let startNewGameBtn = document.getElementById("new-game-btn");

// Turn X by default
let turnX = true;

resetBtn.addEventListener("click", () => resetGame());

const winningPatterns = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

boxes.forEach((box) => {
  box.addEventListener("click", function () {
    // change the value based on turn and whether the box is already disabled or not
    box.innerText = turnX && !box.disabled ? "O" : "X";
    turnX = !turnX;

    // disable box
    box.disabled = true;

    checkWinCondition();
  });
});

function checkWinCondition() {
  for (const pattern of winningPatterns) {
    pos1Val = boxes[pattern[0]].innerText;
    pos2Val = boxes[pattern[1]].innerText;
    pos3Val = boxes[pattern[2]].innerText;
    if (pos1Val != "" && pos2Val != "" && pos3Val != "") {
      // check if someone won
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        displayPopup("Winner is " + pos1Val);
      }
    }
  }

  // If no winner - check for draw
  checkDrawCondition();
}

function checkDrawCondition() {
  isDraw = true; // assume it is a draw

  boxes.forEach((box) => {
    if (box.innerText === "") {
      // if there is any empty box - it's not a draw
      isDraw = false;
    }
  });

  if (isDraw) {
    displayPopup("It's a tie!");
  }
}

function displayPopup(statusText) {
  winnerPopup.style.display = "flex";
  winnerText.innerText = statusText;
  startNewGameBtn.addEventListener("click", () => {
    resetGame();
    winnerPopup.style.display = "none";
  });
}

function resetGame() {
  boxes.forEach((box) => {
    // Enable all boxes
    box.disabled = false;
    // Update text in each box
    box.innerText = "";
  });
}
