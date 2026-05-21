//* Transform stream for one specific task
// to replace bad word
import { Transform } from "node:stream";

export const badWordReplaceTrandsformStream = new Transform({
  transform(chunk, encoding, callback) {
    // basic
    // console.log("chunk", chunk.toString());

    // processing we do here
    let processedChunk = chunk.toString().replaceAll(/ipsum/gi, "cool");

    // pass process data to next stream
    callback(null, processedChunk);
  },
});
