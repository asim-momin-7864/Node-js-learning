//* Expense Tracker using RESTapis

import { createServer } from "node:http";
import * as fs from "node:fs/promises";

// server object
const server = createServer(async (req, res) => {
  // home
  if (req.url === "/") {
    res.writeHead(200, { "content-type": "text/html" });
    res.end(`<h1> This is home page. </h1>`);
  }

  //expense
  if (req.url === "/expense") {
    //POST
    if (req.method === "POST") {
      // read data from req stream

      // buffer to collect data in chunks
      let buff = "";
      req.on("data", (chunk) => {
        buff = buff + chunk.toString();
      });

      // when all data get
      req.on("end", async () => {
        // access db json file
        const data = await fs.readFile("./database.json");
        // console.log(jsonData.toString());

        // JSON parsing
        const dbData = JSON.parse(data);

        // add new data
        // parse buffer
        dbData.push(JSON.parse(buff));

        // return store data into db json file
        await fs.writeFile("./database.json", JSON.stringify(dbData, null, 2)); // extra parameters for good formatting

        res.end("New Expenses Added");
      });
    } else if (req.method === "GET") {
      // read file
      const data = await fs.readFile("./database.json");

      res.end(data);
    }
  }
});

server.listen(3000, () => {
  console.log("server is listening on port 3000");
});
