const btn1 = document.getElementById("btn-1");
const btn2 = document.getElementById("btn-2");
const btn3 = document.getElementById("btn-3");
const btn4 = document.getElementById("btn-4");
const btn5 = document.getElementById("btn-5");
const btn6 = document.getElementById("btn-6");
const btn7 = document.getElementById("btn-7");
const btn8 = document.getElementById("btn-8");
const btn9 = document.getElementById("btn-9");
const btn0 = document.getElementById("btn-0");
const correctAudio = document.getElementById("correctAudioId");
const wrongAudio = document.getElementById("wrongAudioId");
const buttonsDiv = document.getElementById("buttons");
const digitsDiv = document.getElementById("digits");
const sumText = document.getElementById("sum");
const part1Text = document.getElementById("part1");
const part2Text = document.getElementById("part2");

btn1.addEventListener("click", handleClick);
btn2.addEventListener("click", handleClick);
btn3.addEventListener("click", handleClick);
btn4.addEventListener("click", handleClick);
btn5.addEventListener("click", handleClick);
btn6.addEventListener("click", handleClick);
btn7.addEventListener("click", handleClick);
btn8.addEventListener("click", handleClick);
btn9.addEventListener("click", handleClick);
btn0.addEventListener("click", handleClick);

let digit1;
let digit2;
let digitSum;
let answer;
let option;
let wrongColor;

function handleClick(event) {
  event.target.className = "activeBtn";
  const enteredDigit = parseInt(event.target.id.substring(4), 10);
  if (enteredDigit === answer) {
    answerIsCorrect(event.target);
    wrongColor = "";
  } else {
    answerIsWrong(event.target);
    wrongColor = "redDigit";
  }
  switch (option) {
    case 0:
      sumText.textContent = enteredDigit;
      sumText.className = wrongColor;
      break;
    case 1:
      part1Text.textContent = enteredDigit;
      part1Text.className = wrongColor;
      break;
    default:
      part2Text.textContent = enteredDigit;
      part2Text.className = wrongColor;
      break;
  }
}

function answerIsCorrect(btnClicked) {
  correctAudio.play();
  buttonsDiv.className = "disabledButtons";
  digitsDiv.className = "correctAnswer";
  setTimeout(() => {
    clearStyles(btnClicked);
  }, 1000); //remove style
}

function answerIsWrong(btnClicked) {
  wrongAudio.play();
  buttonsDiv.className = "disabledButtons";
  digitsDiv.className = "wrongAnswer";
  setTimeout(() => {
    clearStyles(btnClicked);
  }, 4000); //remove style
}

function clearStyles(btnClicked) {
  digitsDiv.className = "";
  buttonsDiv.className = "";
  btnClicked.className = "";
  sumText.className = "";
  part1Text.className = "";
  part2Text.className = "";
  btn1.className = "";
  btn2.className = "";
  btn3.className = "";
  btn4.className = "";
  btn5.className = "";
  btn6.className = "";
  btn7.className = "";
  btn8.className = "";
  btn9.className = "";
  btn0.className = "";
  getNewDigits();
}

/*function highlightButton(btnClicked) {
  btnClicked.className = "activeBtn"; //set active style
}*/

function getNewDigits() {
  digitSum = Math.floor(Math.random() * 14 + 6);
  digit1 = Math.floor(Math.random() * (digitSum - 2));
  digit2 = digitSum - digit1;

  option = Math.floor(Math.random() * 3); //0, 1 or 2
  console.log("option = ", option);
  console.log("digitSum = ", digitSum);
  console.log("digit1 = ", digit1);
  console.log("digit2 = ", digit2);
  switch (option) {
    case 0:
      sumText.textContent =
        digitSum > 9
          ? (sumText.textContent = "1?")
          : (sumText.textContent = "?");
      part1Text.textContent = digit1;
      part2Text.textContent = digit2;
      answer = digitSum > 9 ? digitSum - 10 : digitSum;
      break;
    case 1:
      sumText.textContent = digitSum;
      part1Text.textContent =
        digit1 > 9
          ? (part1Text.textContent = "1?")
          : (part1Text.textContent = "?");
      part2Text.textContent = digit2;
      answer = digit1 > 9 ? digit1 - 10 : digit1;
      break;
    default:
      sumText.textContent = digitSum;
      part1Text.textContent = digit1;
      part2Text.textContent =
        digit2 > 9
          ? (part2Text.textContent = "1?")
          : (part2Text.textContent = "?");
      answer = digit2 > 9 ? digit2 - 10 : digit2;
      break;
  }
}

getNewDigits();
digitsDiv.style.visibility = "visible";
