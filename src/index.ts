import { Command } from "commander";
import inquirer from "inquirer";
import { copySync } from "fs-extra";
import { execSync } from "child_process";

import { existsSync, readFileSync, writeFileSync } from "fs";
import path from "path";

const program = new Command();

function copyTemplate(templatePath: string, destinationPath: string) {
  if (existsSync(destinationPath)) {
    console.error(`Folder ${destinationPath} already exists!`);
    process.exit(1);
  }

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
        name: "tailwind",
        message: "Do you want to include Tailwind CSS?",
      },
    ]);

    console.log("Copying template files...");
    copyTemplate("src/templates", name);

    console.log("Updating app.json...");
    updateExpoConfig(name, name);

    console.log("Installing dependencies...");
    execSync(`cd ${name} && npm install`, { stdio: "inherit" });

    if (answers.tailwind) {
      console.log("Installing Tailwind CSS...");
      //   execSync(`cd ${name} && npm install redux react-redux`, {
      //     stdio: "inherit",
      //   });
    } else {
      console.log("Skipping Tailwind CSS installation");
    }

    console.log("Project created successfully!");

    console.log("To start the project, run:");
    console.log(`cd ${name}`);
    console.log("npx expo start");
  });

program.parse();
