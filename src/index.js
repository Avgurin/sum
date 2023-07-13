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

const logContent = document.getElementById("log");
const correctAudio = document.getElementById("correctAudioId");
const wrongAudio = document.getElementById("wrongAudioId");

const buttonsDiv = document.getElementById("buttons");
const digitsDiv = document.getElementById("digits");
const sumText = document.getElementById("sum");
const part1Text = document.getElementById("part1");
const part2Text = document.getElementById("part2");
const startBtn = document.getElementById("startBtn");
const overlayBlack = document.getElementById("overlayBlack");
const startScreen = document.getElementById("startScreen");
const statScreen = document.getElementById("statScreen");
const continueBtn = document.getElementById("continueBtn");
const statText = document.getElementById("statText");

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
startBtn.addEventListener("click", startBtnHandleClick);
continueBtn.addEventListener("click", continueGame);

correctAudio.volume = 0.2;
wrongAudio.volume = 0.2;
let digit1;
let digit2;
let digitSum;
let answer;
let option;
let startTime, endTime, answerTime;
let problems = [];
let problemCount;
const maxProblemCount = 12;
let wrongAnswerCount = 0;

function startBtnHandleClick() {
  startBtn.classList.add("activeInfoBtn");
  setTimeout(() => {
    overlayBlack.className = "display-none";
    startScreen.className = "display-none";
    getNewDigits();
  }, 400);
  problemCount = 0;
}

function handleClick(event) {
  endTime = performance.now();
  answerTime = Math.floor(endTime - startTime);
  problems[problemCount] = endTime - startTime;
  problemCount++;
  //console.log("startTime = ", startTime);
  //console.log("endTime = ", endTime);
  //console.log("answerTime = ", answerTime);
  event.target.className = "activeBtn";
  const enteredDigit = parseInt(event.target.id.substring(4), 10);
  const enteredFullDigit = getEnteredFullDigit(enteredDigit);
  let wrongColor; //class for red or DEFAULT color
  if (enteredDigit === answer) {
    answerIsCorrect(event.target);
    wrongColor = "";
  } else {
    answerIsWrong(event.target);
    wrongColor = "redDigit";
  }
  showPressedDigit(enteredFullDigit, wrongColor);
  addLogItem(enteredFullDigit, wrongColor);
}

function continueGame() {
  continueBtn.classList.add("activeInfoBtn");
  setTimeout(() => {
    continueBtn.className = "infoBtn";
  }, 300);
  setTimeout(() => {
    statScreen.className = "display-none";
  }, 400);
  problemCount = 0;
  wrongAnswerCount = 0;
  logContent.innerHTML = "";
  clearStyles(btn1);
}

function showStat() {
  //  console.log(" ---- getAverageAnswerTime= ", getAverageAnswerTime());
  statText.innerHTML = `Среднее время обдумывания ${
    getAverageAnswerTime() / 1000
  } сек. <p>Количество ошибок ${wrongAnswerCount}`;
  statScreen.className = "statSize visible";
  buttonsDiv.className = "disabledButtons";
}

function getAverageAnswerTime() {
  let problemSum = 0;
  let averageAnswerTime;
  for (let problemItem of problems) {
    problemSum = problemSum + problemItem;
    console.log("problemItem = ", problemItem);
  }
  console.log("problemSum = ", problemSum);
  averageAnswerTime = Math.floor(problemSum / 12);
  console.log("averageAnswerTime = ", averageAnswerTime);
  return averageAnswerTime;
}

function getEnteredFullDigit(enteredDigit) {
  switch (option) {
    case 0:
      return digitSum > 9 ? enteredDigit + 10 : enteredDigit;
    case 1:
      return digit1 > 9 ? enteredDigit + 10 : enteredDigit;
    default:
      return digit2 > 9 ? enteredDigit + 10 : enteredDigit;
  }
}

function addLogItem(enteredFullDigit, wrongColor) {
  const logItem = document.createElement("div");
  logItem.className = "logRecord";
  logItem.innerHTML = composeItem(enteredFullDigit, wrongColor);
  logContent.append(logItem);
}

function composeItem(enteredFullDigit, wrongColor) {
  const miliSecRecord = `<br><span class="miliSec">(${
    answerTime / 1000
  } сек)</span>`;
  switch (option) {
    case 0:
      return (
        `${digit1} + ${digit2} = <span class="${wrongColor}">${enteredFullDigit}</span>` +
        miliSecRecord
      );
    case 1:
      return (
        `<span class="${wrongColor}">${enteredFullDigit}</span> + ${digit2} = ${digitSum}` +
        miliSecRecord
      );
    default:
      return (
        `${digit1} + <span class="${wrongColor}">${enteredFullDigit}</span> = ${digitSum}` +
        miliSecRecord
      );
  }
}

function showPressedDigit(enteredFullDigit, wrongColor) {
  switch (option) {
    case 0:
      sumText.textContent = enteredFullDigit;
      sumText.className = wrongColor;
      break;
    case 1:
      part1Text.textContent = enteredFullDigit;
      part1Text.className = wrongColor;
      break;
    default:
      part2Text.textContent = enteredFullDigit;
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
  wrongAnswerCount++;
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
  if (problemCount === maxProblemCount) {
    showStat();
  } else {
    getNewDigits();
  }
}

function getNewDigits() {
  digitSum = Math.floor(Math.random() * 14 + 6); //sum
  digit1 = Math.floor(Math.random() * (digitSum - 2) + 2);
  digit2 = digitSum - digit1;
  option = Math.floor(Math.random() * 3); //0, 1 or 2
  randomizePosition(digitSum, digit1, digit2, option);
  startTime = performance.now();
}

function randomizePosition() {
  switch (
    option //randomize ? position
  ) {
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

//old start
getNewDigits();
digitsDiv.style.visibility = "visible";
