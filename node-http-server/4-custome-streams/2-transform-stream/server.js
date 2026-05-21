//* Transform stream
// understand with one example

import { createServer } from "node:http";
import * as fs from "node:fs";
import { Transform, pipeline } from "node:stream";

// user modules
import { toUpperCaseTrandsformStream } from "./transform-to-upper-case.js";
import { badWordReplaceTrandsformStream } from "./transform-replace-bad-word.js";
import { error } from "node:console";

// server object
const server = createServer((req, res) => {
  if (req.url === "/") {
    // streams
    const sampleFileStream = fs.createReadStream("./sample.txt");
    const outputWriteStream = fs.createWriteStream("./output.txt");

    //-----------------------------------------------------------------------

    // when data comes in read stream
    // sampleFileStream.on("data", (chunk) => {

    //   // some processing
    //   let processedChunk = chunk.toString().toUpperCase();
    //   processedChunk = processedChunk.replaceAll(/ipsum/gi, "cool"); // consider feature like bad word filtering
    //   // e.g. suppose ipsum is bad word to filter

    //   // pass to write stream
    //   outputWriteStream.write(processedChunk);
    // });

    //-------------------------------------------------------------------------------

    //* The above is dummy small operation, so we did here.
    //* but bigger complex operations done into seperate modules (organized)

    const TrandsformStream = new Transform({
      transform(chunk, encoding, callback) {
        // basic
        // console.log("chunk", chunk.toString());

        // processing we do here
        let processedChunk = chunk.toString().toUpperCase();
        processedChunk = processedChunk.replaceAll(/ipsum/gi, "cool");

        // pass process data to next stream
        callback(null, processedChunk);
      },
    });

    //-------------------------------------------------------------------

    //* Pipes (not recommended use pipeline )
    // above we do connections manually
    // but streams module provide automatic features  (pipes and pipeline)

    // read stream ---> pipe ---> write stream
    // sampleFileStream
    // .pipe(TrandsformStream)
    // .pipe(outputWriteStream); // we crated pipes

    //* for error handling when stream breaks
    // sampleFileStream
    //   .pipe(TrandsformStream)
    //   .on("error", (err) => {
    //     console.error(err);
    //   })
    //   .pipe(outputWriteStream)
    //   .on("error", (err) => {
    //     console.error(err);
    //   });

    //----------------------------------------------------------------------------

    //* We can make more moduler by writting transformers into different modules and then import here

    //* Pipeline: better version of pipe method

    pipeline(
      sampleFileStream,
      badWordReplaceTrandsformStream,
      toUpperCaseTrandsformStream,
      outputWriteStream,
      // last option/paramater in pipeline is a callback which executes at end flow
      // that callpacks first parameter is err
      (err) => {
        if (err) {
          console.error(" error handling here...", err);
        }
      },
    );

    res.end("Operation Done");
  }
});

// listening
server.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
