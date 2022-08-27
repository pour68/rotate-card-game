const container = document.getElementById("container");
let resultsArray = [];
let counter = 0;
const text = document.getElementById("text");
let seconds = 00;
let tens = 00;
const appendTens = document.getElementById("tens");
const appendSeconds = document.getElementById("seconds");
let Interval;
const images = ["sass", "git", "gulp", "css", "grunt"];
let clone = images.slice(0);
let cards = images.concat(clone);
const resetBtn = document.getElementById("reset-btn");

const shuffle = (collection) => {
  for (
    let j, x, i = collection.length;
    i;
    j = Math.floor(Math.random() * i),
      x = collection[--i],
      collection[i] = collection[j],
      collection[j] = x
  );
  return collection;
};

const check = (className) => {
  const x = document.getElementsByClassName("flipped");
  setTimeout(function () {
    for (let i = x.length - 1; i >= 0; i--) {
      x[i].className = className;
    }
  }, 500);
};

const win = () => {
  if (counter === 5) {
    clearInterval(Interval);
    text.innerHTML = "رکورد شما " + seconds + ":" + tens;
    resetBtn.removeAttribute("disabled");
  }
};

const startTimer = () => {
  tens++;
  if (tens < 9) {
    appendTens.innerHTML = "0" + tens;
  }
  if (tens > 9) {
    appendTens.innerHTML = tens;
  }
  if (tens > 99) {
    seconds++;
    appendSeconds.innerHTML = "0" + seconds;
    tens = 0;
    appendTens.innerHTML = "0" + 0;
  }
  if (seconds > 9) {
    appendSeconds.innerHTML = seconds;
  }
};

const resetGame = () => {
  if (counter % 5 === 0) {
    window.location.reload();
  }
};

shuffle(cards);

for (let i = 0; i < cards.length; i++) {
  card = document.createElement("div");
  card.dataset.item = cards[i];
  card.dataset.view = "card";
  container.appendChild(card);
  card.addEventListener("click", function () {
    if (this.className != "flipped" && this.className != "correct") {
      this.className = "flipped";
      let result = this.dataset.item;
      resultsArray.push(result);
      clearInterval(Interval);
      Interval = setInterval(startTimer, 10);
    }
    if (resultsArray.length > 1) {
      if (resultsArray[0] === resultsArray[1]) {
        check("correct");
        counter++;
        win();
        resultsArray = [];
      } else {
        check("reverse");
        resultsArray = [];
      }
    }
  });
}

resetBtn.addEventListener("click", resetGame);
