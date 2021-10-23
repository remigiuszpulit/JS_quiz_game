import { createTag } from "./generateHTML.js";
import { questionSource } from "./questions.js";

const ansCount = [];
let temp = "";

const questionHTML = (questions, number) => {
  const id = questions[number];
  const { title, answers } = id;

  const questionTitleTag = createTag({
    tagName: "h2",
    // className: ["dupa"],
    text: title,
  });

  const ansArr = [];

  answers.forEach((answer) => {
    const { ansTitle, value } = answer;
    const ansTag = createTag({
      tagName: "h3",
      //   className
      text: ansTitle,
    });

    const ansBtn = createTag({
      tagName: "button",
      // className
      text: "Select",
    });

    ansBtn.addEventListener("click", () => {
      let ansVal = value;
      temp = `${ansVal}`;
      console.log(temp);
    });
    ansTag.appendChild(ansBtn);

    ansArr.push(ansTag);
  });
  //remember to randomize ansArr here
  ansArr.forEach((element) => {
    questionTitleTag.appendChild(element);
  });

  return questionTitleTag;
};

// questionHTML(questionSource, 2);

document.querySelector("body").appendChild(questionHTML(questionSource, 3));
