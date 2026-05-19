//* SSE mini project

import { createServer } from "node:http";
import * as fs from "node:fs/promises";

//server object
const server = createServer(async (req, res) => {
  //* html home page
  if (req.url === "/") {
    // head
    res.writeHead(200, { "content-type": "text/html" });

    // const htmlPage = fs.createReadStream("./parrots.html");

    // // data event
    // htmlPage.on("data", (chunk) => {
    //   res.write(chunk);
    // });

    // // data end event
    // htmlPage.on("end", () => {
    //   res.end();
    // });

    const htmlPage = await fs.readFile("./parrots.html");
    res.end(htmlPage.toString());
  }

  //* data streamining url
  if (req.url === "/stream/data") {
    // header
    res.writeHead(200, {
      "content-type": "text/event-stream",
      "cache-control": "no-cache",
      connection: "keep-alive",
    });

    /* 

  readfile - read stream 

    ! No need to use Read Stream for small files 

     const dataFileStream = fs.createReadStream("./parrotInfo.txt", {
       highWaterMark: 64, // Small buffers force the text to arrive chunk-by-chunk
     })
     dataFileStream.on("data", (chunk) => 
       const rawText = chunk.toString();
       res.write(`data: ${rawText} \n\n`)
     })
     dataFileStream.on("end", () => {
       res.end();
     });

*/

    const dataFile = await fs.readFile("./parrotInfo.txt", "utf-8");

    const wordsArray = dataFile.split(" ");
    let wordIdx = 0;

    // typing effect pause
    const streamTimer = setInterval(() => {
      if (wordIdx < wordsArray.length) {
        const wordToSend = wordsArray[wordIdx] + " ";
        res.write(`data: ${wordToSend} \n\n`);
        wordIdx++;
      } else {
        // when content ends
        clearInterval(streamTimer);
        res.end();
      }
    }, 150);

    // when stream is ended in between
    //* CRITICAL PRODUCTION HABIT: Clean up if the user closes the browser window mid-stream

    req.on("close", () => {
      clearInterval(streamTimer);
      res.end();
    });
  }
});

server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
