import { createTag } from "./generateHTML.js";
import { questionSource } from "./questions.js";

const questionHTML = (questions, number) => {
  const id = questions[number];
  const { title, answers } = id;

  const questionTitleTag = createTag({
    tagName: "h2",
    // className: ["dupa"],
    text: title,
  });

  console.log(questionTitleTag);
  console.log(answers);
};

questionHTML(questionSource, 5);
