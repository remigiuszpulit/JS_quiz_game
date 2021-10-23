import { createTag } from "./generateHTML.js";
import { questionSource } from "./questions.js";

const ansCount = [];
let temp = "";
const nums = new Set();
let qSet = [];

const start = createTag({
  tagName: "h1",
  // className
  idName: "welcome",
  text: "Welcome to the Friends Quiz!",
});

const startBtn = createTag({
  tagName: "button",
  className: ["btn", "btn-primary"],
  text: "Launch",
});

start.appendChild(startBtn);

const questionHTML = (questions, number) => {
  const id = questions[number];
  const { title, answers } = id;

  const questionTitleTag = createTag({
    tagName: "h2",
    // className: ["dupa"],
    idName: "qst",
    text: title,
  });

  const ansArr = [];

  answers.forEach((answer) => {
    const { ansTitle, value } = answer;

    const ansBtn = createTag({
      tagName: "button",
      className: ["btn", "btn-secondary"],
      text: ansTitle,
    });

    ansBtn.addEventListener("click", () => {
      let ansVal = value;
      temp = `${ansVal}`;
      //   console.log(temp);
    });

    ansArr.push(ansBtn);
  });
  //remember to randomize ansArr here
  ansArr.forEach((element) => {
    questionTitleTag.appendChild(element);
  });

  return questionTitleTag;
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
    .querySelector("body")
    .appendChild(questionHTML(questionSource, qSet[1]));
  qSet.shift();
  console.log(ansCount);
  temp = "";
  if (ansCount.length === 4) {
    document.querySelector("body").appendChild(finishBtn);
    let b = document.getElementById("nextBtn");
    b.remove();
  } else {
    document.querySelector("body").appendChild(nextBtn);
  }
});

startBtn.addEventListener("click", () => {
  let s = document.getElementById("welcome");
  s.remove();
  while (nums.size !== 6) {
    nums.add(Math.floor(Math.random() * 6));
  }
  qSet = [...nums];
  console.log(qSet);

  document
    .querySelector("body")
    .appendChild(questionHTML(questionSource, qSet[1]));
  qSet.shift();
  document.querySelector("body").appendChild(nextBtn);
});

const f = (arr, val) => {
  let count = 0;
  arr.forEach((v) => v === val && count++);
  return count;
};

const scoreboardTag = (no) => {
  const tag = createTag({
    tagName: "h2",
    // className
    text: `You have answered ${no} questions correctly`,
  });
  return tag;
};

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

  document.querySelector("body").appendChild(scoreboardTag(score));
  let fin = document.getElementById("finishBtn");
  fin.remove();
});

document.querySelector("body").appendChild(start);
