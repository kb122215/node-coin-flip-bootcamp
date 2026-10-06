const headsButton = document.querySelector("#callHeads");
const tailsButton = document.querySelector("#callTails");
const flipButton = document.querySelector("#flip");

const playerChoiceElement = document.querySelector("#player-choice");

const coinResultElement = document.querySelector("#coin-result");

const messageElement = document.querySelector("#message");

let playerChoice = "";

headsButton.addEventListener("click", function () {
  playerChoice = "heads";

  playerChoiceElement.textContent = "Heads";

  headsButton.classList.add("selected");
  tailsButton.classList.remove("selected");
});

tailsButton.addEventListener("click", function () {
  playerChoice = "tails";

  playerChoiceElement.textContent = "Tails";

  tailsButton.classList.add("selected");
  headsButton.classList.remove("selected");
});

flipButton.addEventListener("click", function () {
  if (playerChoice === "") {
    messageElement.textContent = "Please choose heads or tails first.";

    return;
  }

  fetch(`/api?choice=${playerChoice}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      coinResultElement.textContent = data.coinResult;

      messageElement.textContent = data.message;
    })
    .catch(function (error) {
      console.log(error);

      messageElement.textContent = "Something went wrong.";
    });
});
