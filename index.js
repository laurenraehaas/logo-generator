const fs = require("fs");
const { create } = require("svg.js");
const inquirer = require("inquirer");

const generateLogo = async (logoName) => {
  const canvas = create().size(400, 200);

  canvas.rect(400, 200).fill("#4CAF50");

  canvas
    .text(200, 100, logoName)
    .font({
      family: "Arial",
      size: 48,
      anchor: "middle",
      leading: 1,
    })
    .fill("#ffffff");

  const svgContent = canvas.svg();

  fs.writeFile(`${logoName}.svg`, svgContent, (err) => {
    if (err) {
      console.error("Error while saving SVG:", err);
    } else {
      console.log(`Logo "${logoName}" has been saved as ${logoName}.svg`);
    }
  });
};

inquirer
  .prompt([
    {
      type: "input",
      name: "logoName",
      message: "Enter the logo name:",
    },
  ])
  .then((answers) => {
    const logoName = answers.logoName.trim();
    if (logoName === "") {
      console.error("Logo name cannot be empty.");
      process.exit(1);
    }
    generateLogo(logoName);
  })
  .catch((error) => {
    console.error("Error occurred:", error);
  });