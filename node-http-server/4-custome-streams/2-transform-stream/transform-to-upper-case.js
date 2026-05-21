//* Transform stream for one specific task
// to upper case data

import { Transform } from "node:stream";

export const toUpperCaseTrandsformStream = new Transform({
  transform(chunk, encoding, callback) {
    //--------------------------------------------------
    //! Simulating streams emited error

    // toUpperCaseTrandsformStream.emit(
    //   "error",
    //   new Error("This is custome error we created for testing"),
    // );
    //--------------------------------------------------
    // basic
    // console.log("chunk", chunk.toString());

    // processing we do here
    let processedChunk = chunk.toString().toUpperCase();

    // pass process data to next stream
    callback(null, processedChunk);
  },
});
