//* Creating server using Node.js without nay framework

import { createServer } from "node:http";
// import * as fs from "node:fs/promises";

//for streamining
import * as fs from "node:fs";

//* Basic core version of server object
//* #1 Directly sending html code res (*Not recommended)

// creating server object
const server1 = createServer((req, res) => {
  // Each time when server starts
  console.log("Request received...");
  console.log("req object: ", req);

  // here we are sending string res directly
  //   res.end("Hello from NodeJS server!");

  //header
  res.writeHead(200, { "content-type": "text/html" });

  res.end(
    `<h1> The ocean &#127757; is the body of salt water that covers approximately 70.8% of Earth. 
    &#128031; &#128031; The ocean is conventionally divided into large bodies of water, 
    which are also referred to as oceans </h1>`,
  );
});

//-----------------------------------------

//* #2 Sending html files directly in res
//! (first take file in memory way) (*Not efficient, and recommended)
// it increases RAM usage

const server2 = createServer(async (req, res) => {
  // Routing
  if (req.url === "/flowers") {
    // header
    res.writeHead(200, { "content-type": "text/html" });
    // read file
    const content = await fs.readFile("./flowers.html");
    // console.log(content.toString());

    res.end(content.toString());
  }
});

//---------------------------------------------------------

//* #3 Streaming (Recommended, and efficent way)
// it read and write data in small chunks
// this is not live continous streamining (below wr cover that also)
// here we serving big files through streammming

const server3 = createServer(async (req, res) => {
  if (req.url === "/ocean") {
    // head
    res.writeHead(200, { "content-type": "text/html" });

    // Create read stream
    const dataStream = fs.createReadStream("./ocean.html");

    //*Event Emittors

    //data events - when data comes
    dataStream.on("data", (chunk) => {
      res.write(chunk);
      // res (response) - this is also actully writtable streams
      // req (request) - this is also readable streams
    });

    // end event - when data ends
    dataStream.on("end", () => {
      // end res
      res.end();
    });
  }

  //* shortcut using pip method

  if (req.url === "/flowers") {
    res.writeHead(200, { "content-type": "text/html" });

    const dataStream = fs.createReadStream("./flowers.html");

    dataStream.pipe(res); // connecting read-stream to directly write-stream
    // as we getting chunk through read-stream we directly sending into write-stream
  }
});

//---------------------------------------------------

// listining server
server3.listen(3000, () => {
  console.log("Server is listing on port 3000");
});
