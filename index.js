const { Shape, Triangle, Circle, Square } = require("./lib/shape");
const inquirer = require("inquirer");
const fs = require("fs");

const questions = [
  {
    type: "input",
    name: "text",
    message: "Enter up to three characters for logo:",
    validate: (input) => input.length <= 3,
  },
  {
    type: "list",
    name: "textColor",
    message: "Enter text color:",
    choices: ["white", "black", "gray"],
  },
  {
    type: "list",
    name: "shape",
    message: "Choose a shape:",
    choices: ["Triangle", "Circle", "Square"],
  },
  {
    type: "input",
    name: "shapeColor",
    message: "Enter shape color (keyword or hex):",
  },
];

inquirer.prompt(questions).then((answers) => {
  const { text, textColor, shape, shapeColor } = answers;
  const shapeObj = new Shape();
  let svgEl = "";

  shapeObj.setColor(shapeColor);

  switch (shape) {
    case "Triangle":
      const triangle = new Triangle();
      triangle.setColor(shapeColor);
      svgEl = triangle.render();
      break;
    case "Circle":
      const circle = new Circle();
      circle.setColor(shapeColor);
      svgEl = circle.render();
      break;
    case "Square":
      const square = new Square();
      square.setColor(shapeColor);
      svgEl = square.render();
      break;
  }

  let x = 150,
    y = 120;
  if (shape === "Triangle") {
    y = 135;
  } else if (shape === "Square") {
    y = 145;
  }

  const finalSvg = `<svg xmlns="https://www.w3.org/2000/svg" width="300" height="200">
  ${svgEl}
  <text x="${x}" y="${y}" fill="${textColor}" font-size="50" text-anchor="middle">${text}</text>
  </svg>`;

  fs.writeFileSync("logo.svg", finalSvg);

  console.log("Generated logo.svg");
});