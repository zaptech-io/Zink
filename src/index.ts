import { Command } from "commander";
import inquirer from "inquirer";
import { copySync } from "fs-extra";
import { execSync } from "child_process";

import { readFileSync, writeFileSync } from "fs";
import path from "path";

const program = new Command();

function copyTemplate(templatePath: string, destinationPath: string) {
  copySync(templatePath, destinationPath);
  console.log("Zink template files copied successfully!");
}

function updateExpoConfig(destinationPath: string, projectName: string) {
  const appJsonPath = path.join(destinationPath, "app.json");
  const appJson = JSON.parse(readFileSync(appJsonPath, "utf8"));

  appJson.expo.name = projectName;
  appJson.expo.slug = projectName.toLowerCase().replace(/\s+/g, "-");
  appJson.expo.scheme = projectName.toLowerCase().replace(/\s+/g, "-");

  writeFileSync(appJsonPath, JSON.stringify(appJson, null, 2));
  console.log(`Updated app.json with project name: ${projectName}`);
}

program
  .version("1.0.0")
  .description("Generate a React Native project with Zap Tech standards")
  .argument("<name>", "Project name")
  .action(async (name) => {
    console.log(`Creating project: ${name}`);

    const answers = await inquirer.prompt([
      {
        type: "confirm",
        name: "useRedux",
        message: "Do you want to include Redux?",
      },
    ]);

    console.log("Copying template files...");
    copyTemplate("src/templates", name);

    console.log("Updating app.json...");
    updateExpoConfig(name, name);

    console.log("Installing dependencies...");
    execSync(`cd ${name} && npm install`, { stdio: "inherit" });

    if (answers.useRedux) {
      console.log("Adding Redux...");
      execSync(`cd ${name} && npm install redux react-redux`, {
        stdio: "inherit",
      });
    }

    console.log("Project created successfully!");
  });

program.parse();