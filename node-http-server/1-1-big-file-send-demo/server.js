//* Big file sharing Demo project
// This project is showing the RAM usage of handling heavy file with Streams and without stream.

import { createServer } from "node:http";
import * as fs from "node:fs";
import * as fsPromise from "node:fs/promises";

// server object
const server = createServer(async (req, res) => {
  // Without Stream
  if (req.url === "/withoutstream") {
    const file = await fsPromise.readFile("./sample.txt");
    res.end(file);
  }

  // With Stream
  if (req.url === "/withstream") {
    const readStream = fs.createReadStream("./sample.txt");

    readStream.on("data", (chunk) => {
      res.write(chunk);
    });

    readStream.on("end", () => {
      res.end("Done Reading File");
    });
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
