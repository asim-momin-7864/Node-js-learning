//* Server Sent Events (SSE)
// continous data streamining, connection wont close
// e.g. realtime data

import { createServer } from "node:http";
import * as fs from "fs";

let count = 0;

//server object
const server = createServer(async (req, res) => {
  //* Core Version
  // we just have to access / server out html page 
  // no need to access stream url
  // our dom code will handle that part

  if (req.url === "/") {
    const htmlPage = fs.createReadStream("./counter.html");
    htmlPage.pipe(res);
  }
  if (req.url === "/stream/counter") {
    // Special header
    res.writeHead(200, {
      "content-type": "text/event-stream", // this tell browser it SSE
      "cache-control": "no-cache",
      connection: "keep-alive",
    });

    // dummy simulation: our data is coming
    setInterval(() => {
      res.write(`data: The count is - ${count++} \n\n`); // special format/protocol
    }, 1000);
  }
});

// console.log("server object: ", server);

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
