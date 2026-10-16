const headsButton = document.querySelector("#callHeads");
const tailsButton = document.querySelector("#callTails");
const flipButton = document.querySelector("#flip");
const coin = document.querySelector("#coin");

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

  flipButton.disabled = true;

  messageElement.textContent = "Flipping...";
  coinResultElement.textContent = "*";
  coin.classList.remove("flip-heads", "flip-tails");

  void coin.offsetWidth;

  fetch(`/api?choice=${playerChoice}`)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      if (data.coinResult === "heads") {
        coin.classList.add("flip-heads");
      } else {
        coin.classList.add("flip-tails");
      }

      setTimeout(function () {
        coinResultElement.textContent = data.coinResult;

        messageElement.textContent = data.message;

        flipButton.disabled = false;
      }, 1800);
    })
    .catch(function (error) {
      console.log(error);

      messageElement.textContent = "Something went wrong.";

      flipButton.disabled = false;
    });
});
