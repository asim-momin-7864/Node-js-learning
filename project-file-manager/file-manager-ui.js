//* Terminal UI for File Manager

import * as readline from "node:readline/promises";
import { read } from "node:fs";
import { stdin, stdout } from "node:process";

import chalk, { Chalk } from "chalk";

import {
  writeToFile,
  readFile,
  appendToFile,
  createFolder,
  emptyFile,
  deleteFileFolder,
  fileProperties,
  listItems,
} from "./operation-modules.js";

const rl = readline.createInterface({
  input: stdin,
  output: stdout,
});

async function menu() {
  console.clear();
  console.log(chalk.bgMagenta.bold("\n====== 📂 FILE MANAGER========\n"));

  // display menu
  const options = [
    "List Items",
    "Create File",
    "Read File",
    "Append New Content",
    "Create Folder",
    "Delete File or Folder",
    "Empty File",
    "See File Properties",
    "Exit",
  ];

  options.forEach((opt, i) => {
    console.log(chalk.yellow(`${i + 1}`) + chalk.white(` ${opt}`));
  });

  //Input
  const operationIdx = await rl.question(chalk.cyan(`\nSelect Option: `));
  // console.log(operationIdx);

  //TEST
  // console.log("operationIdx", operationIdx);
  // console.log("operationIdx type", typeof operationIdx);

  let path;
  let initialContent;
  let newContent;
  let result;

  // operation switch
  switch (operationIdx) {
    case "1":
      path = await rl.question(`Enter List Path: `);

      // console.log("path:", path);
      // console.log("path type", typeof path);

      //! bug in syncronous behaviour
      // await listItems(path).forEach((item) => {
      //   console.log(`\n${item.type === "file" ? "📄" : "📁"} ${item.name}`);
      // });

      result = await listItems(path);
      console.log(chalk.bgBlue("Contents:"));
      
      result.forEach((item) => {
        console.log(`${item.type === "file" ? "📄" : "📁"} ${item.name}`);
      });

      break;

    case "2":
      path = await rl.question(`Enter File Path to Create: `);
      initialContent = await rl.question(`Initial Content: `);
      await writeToFile(path, initialContent);
      break;

    case "3":
      path = await rl.question("Enter File Path: ");
      await readFile(path);
      // console.log("Content: ", content);

      break;

    case "4":
      path = await rl.question("Enter File Path: ");
      newContent = await rl.question("New Content: ");
      await appendToFile(path, newContent);
      break;

    case "5":
      path = await rl.question("Enter Folder Path: ");
      await createFolder(path);
      break;

    case "6":
      path = await rl.question("Enter File Path to Delete: ");
      await deleteFileFolder(path);
      break;

    case "7":
      path = await rl.question("Enter File Path to Empty: ");
      await emptyFile(path);
      break;

    case "8":
      path = await rl.question("Enter File Path: ");
      result = await fileProperties(path);
      console.log(result);
      break;

    case "9":
      rl.close();
      return;

    default:
      console.log(chalk.red("\nInvalid Option!"));
      break;
  }

  // continue menu again after one operation ends... Loop Effect
  await rl.question(chalk.bgGray("\nEnter any key to continue...  "));
  await menu();
}

menu();
