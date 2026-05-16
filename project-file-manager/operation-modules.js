//* File Manipulation Operations Modules

// import * as fs from "node:fs";
import * as fs from "node:fs/promises";

import chalk from "chalk";
import { it } from "node:test";
import path from "node:path";

//* Type 1: Synchronous API

// Write & Create
// fs.writeFileSync('./test/hello1.txt', "Hello World This is first line");

// Read
// const content = fs.readFileSync("./test/hello1.txt");
// console.log(content.toLocaleString());

// Append Content
// fs.appendFileSync("./test/hello1.txt", "\nThis is second line we write into txt file");

//Create Folder
// fs.mkdirSync("./test/animals/cats", {recursive: true});

//* Type 2: Asynchronous APIs

//* Callback Function Based
//! Using it creats "Callback Hell" problem
// beacuse we have to provide next operation into callback

// Write & Create
// fs.writeFile(
//     "./test/hello2.txt",
//     "First line we write is: Hii ! how are you ? ",
//     // another callback
//     //* these we called "Error First Callbacks" , we try to catch error and pass it as argument
//     (err) => {
//         if (err) {
//             console.log(`Something went wrong`);
//         }

//         // after creating file lets write second line
//         fs.appendFile(
//             "./test/hello2.txt",
//             "\nThis is second line wr are writting asyncroniously with append operation.",
//             // another callback
//             (err) => { if (err) console.log(err); console.log("Content is applied"); }
//         );
//         console.log("File is created and 2nd line is append");
//     },
// );

// other file manipulation operations we can do

//* Promise Based (Prefered)
// lets wrap opeartions into functions

// Write
export async function writeToFile(path, initialContent) {
  try {
    await fs.writeFile(path, initialContent);
    console.log(chalk.bgGreen("Content is written in file!"));
    //* keep functions pure operations base and return output, later where you use style and sturture output data
    //* it increases fucntions modularity
  } catch (error) {
    console.error(error);
  }
}

// Read
export async function readFile(path) {
  try {
    const content = await fs.readFile(path);
    console.log(`Content in File: \n${content}`);
    return content;
  } catch (error) {
    console.error(error);
  }
}

// Append
export async function appendToFile(path, newContent) {
  try {
    await fs.appendFile(path, newContent);
    console.log(chalk.bgYellow("New content is written in file!"));
  } catch (error) {
    console.error(error);
  }
}

// Create Folder
export async function createFolder(path) {
  try {
    await fs.mkdir(path, { recursive: true });
    console.log(chalk.bgGreen("Your New Folder is Created!"));
  } catch (error) {
    console.error(error);
  }
}

// Empty File
export async function emptyFile(path) {
  try {
    await fs.truncate(path);
    console.log(chalk.bgYellow("Your File is Empty"));
  } catch (error) {
    console.error(error);
  }
}

// Delete File
export async function deleteFileFolder(path) {
  try {
    await fs.rm(path, { recursive: true, force: true });
    console.log(chalk.bgRed("File or Folder is deleted!"));
  } catch (error) {
    console.error(error);
  }
}

// // Delete Folder
// export async function deleteFolder(path) {
//! Depricatted
//     await fs.rmdir(path, { recursive: true });
//     console.log(chalk.bgRed("Your Folder is Deleted"));
// };

// File Properties
export async function fileProperties(path) {
  const stats = await fs.stat(path);
  console.log(`File Properties: \n${stats}`);
  // console.log(
  //   "Stats: ",
  //   (stats.size / 1024).toFixed(2),
  //   stats.ctime.toLocaleString(),
  //   stats.mtime.toLocaleString(),
  // );

  return {
    size: (stats.size / 1024).toFixed(2),
    createTime: stats.ctime.toLocaleString(),
    modifyTime: stats.mtime.toLocaleString(),
  };
}

export async function listItems(listPath = "./") {
  const items = await fs.readdir(listPath, { withFileTypes: true });
  // console.log(items);

  return items.map((item) => {
    // console.log(item);
    return {
      name: item.name,
      /*
         !Bug
         Symbol(type): 1   (what we get in items)
         type: item.type === 1 ? "file" : "folder",   -- not works
         */
      type: item.isDirectory() ? "folder" : "file",
      path: path.join(import.meta.dirname, item.name), // morden way to get full path
    };
  });
}

//TEST
async function test() {
  await writeToFile("./test/hello3.txt", "Hii new file we created");
  await readFile("./test/hello1.txt");
  await appendToFile(
    "./test/hello3.txt",
    "/nSecond years university project Vigilant-X",
  );
  await createFolder("./test/dog/plants");
  await emptyFile("./test/hello2.txt");
  await deleteFileFolder("./test/hello1.txt");
  await deleteFileFolder("./test/animals/cats");
  await fileProperties("./test/hello3.txt");
  await listItems("./test");
}
// test();
