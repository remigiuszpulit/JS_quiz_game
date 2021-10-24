import { createTag } from "./generateHTML.js";
import { questionSource } from "./questions.js";

const box = createTag({
  tagName: "div",
  className: ["box"],
});

document.querySelector("body").appendChild(box);

const ansCount = [];
let temp = "";
const nums = new Set();
let qSet = [];
const qCount = 7;
//there will be qCount+1 questions

const start = createTag({
  tagName: "h1",

  idName: "welcome",
  text: "Welcome to the Friends Quiz!",
});

const startBtn = createTag({
  tagName: "button",
  className: ["btn", "btn-primary"],
  text: "Launch",
  idName: "startBtn",
});

const questionHTML = (questions, number) => {
  const id = questions[number];
  const { title, answers } = id;

  const questionTitleWrapper = createTag({
    tagName: "div",
    className: ["d-flex", "flex-column", "justify-content-center"],
    idName: "qst",
  });

  const questionTitleTag = createTag({
    tagName: "h2",

    idName: "qstTag",
    text: title,
  });

  questionTitleWrapper.appendChild(questionTitleTag);

  const ansArr = [];

  answers.forEach((answer) => {
    const { ansTitle, value } = answer;

    const ansBtn = createTag({
      tagName: "button",
      className: ["btn", "btn-warning", "ansBtn"],

      text: ansTitle,
    });

    ansBtn.addEventListener("click", () => {
      let ansVal = value;
      temp = `${ansVal}`;
    });

    ansArr.push(ansBtn);
  });

  const ansWrapper = createTag({
    tagName: "div",
    className: ["d-grid", "gap-2"],
  });

  questionTitleWrapper.appendChild(ansWrapper);

  const ansSet = new Set();
  while (ansSet.size !== ansArr.length) {
    ansSet.add(Math.floor(Math.random() * ansArr.length));
  }
  const ansInd = [...ansSet];
  ansInd.forEach((index) => {
    ansWrapper.appendChild(ansArr[index]);
  });

  return questionTitleWrapper;
};

const nextBtn = createTag({
  tagName: "button",
  className: ["btn", "btn-primary"],
  idName: "nextBtn",
  text: "Next",
});

nextBtn.addEventListener("click", () => {
  ansCount.push(temp);
  let q = document.getElementById("qst");
  if (q !== null) {
    q.remove();
  }

  document
    .querySelector(".box")
    .appendChild(questionHTML(questionSource, qSet[1]));
  qSet.shift();
  console.log(ansCount);
  temp = "";
  if (ansCount.length === qCount) {
    document.querySelector(".box").appendChild(finishBtn);
    let b = document.getElementById("nextBtn");
    b.remove();
  } else {
    document.querySelector(".box").appendChild(nextBtn);
  }
  console.log(qSet);
});

startBtn.addEventListener("click", () => {
  let s = document.getElementById("welcome");
  s.remove();
  let sB = document.getElementById("startBtn");
  sB.remove();
  while (nums.size !== questionSource.length) {
    nums.add(Math.floor(Math.random() * questionSource.length));
  }
  qSet = [...nums];
  console.log(qSet);

  document
    .querySelector(".box")
    .appendChild(questionHTML(questionSource, qSet[0]));
  //   qSet.shift();
  document.querySelector(".box").appendChild(nextBtn);
});

const f = (arr, val) => {
  let count = 0;
  arr.forEach((v) => v === val && count++);
  return count;
};

const scoreboardTag = (no, count) => {
  const tag = createTag({
    tagName: "h3",
    // className
    text: `You have answered ${no} of ${count} questions correctly`,
  });
  return tag;
};

const replayBtn = createTag({
  tagName: "button",
  className: ["btn", "btn-primary"],
  text: "Play again",
  idName: "replayBtn",
});

replayBtn.addEventListener("click", () => {
  window.location.reload();
});

const finishBtn = createTag({
  tagName: "button",
  className: ["btn", "btn-primary"],
  text: "Finish",
  idName: "finishBtn",
});

finishBtn.addEventListener("click", () => {
  ansCount.push(temp);
  let q = document.getElementById("qst");
  if (q !== null) {
    q.remove();
  }

  const score = f(ansCount, "true");

  document.querySelector(".box").appendChild(scoreboardTag(score, qCount + 1));
  document.querySelector(".box").appendChild(replayBtn);
  let fin = document.getElementById("finishBtn");
  fin.remove();
});

document.querySelector(".box").appendChild(start);
box.appendChild(startBtn);
