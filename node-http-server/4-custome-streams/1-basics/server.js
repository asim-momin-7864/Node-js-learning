//* Custome Streams from scratch

import { write } from "node:fs";
import { Readable, Writable } from "node:stream";

//* Readable stream
// this creats empty stream, not connected
const readableStream1 = new Readable({
  highWaterMark: 2, // bytes
  // in bytes for normal mode
  // in object mode it refers to: number of object pass at a time in buffer
  /*
    * This parameter is not Buffer size limit
    it is just threshold, indication of how many Bytes of data is pass through buffer at a time
    It return true or false, true: data is under threshold  
     */
  read() {}, // mendatory to pass this method
});

/*

const readableStream = new Readable();

!ERROR
node:events:487
      throw er; // Unhandled 'error' event
      ^

Error [ERR_METHOD_NOT_IMPLEMENTED]: The _read() method is not implemented
    at Readable._read (node:internal/streams/readable:908:9)
    at Readable.read (node:internal/streams/readable:741:12)
    at resume_ (node:internal/streams/readable:1264:12)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21)
Emitted 'error' event on Readable instance at:
    at emitErrorNT (node:internal/streams/destroy:170:8)
    at emitErrorCloseNT (node:internal/streams/destroy:129:3)
    at process.processTicksAndRejections (node:internal/process/task_queues:90:21) {
  code: 'ERR_METHOD_NOT_IMPLEMENTED'
}

*/

// event listener - to be set/ready for ,when data comes into stream to listen
readableStream1.on("data", (chunk) => {
  console.log("chunk: ", chunk.toString());
  /*
  <Buffer 48 65 6c 6c 6f 20 57 6f 72 6c 64 21 20 4e 65 77 20 4a 6f 75 72 6e 65 79 20 53 74 61 72 74 65 64>
  */
});

//* manually pushing data into readable stream to read
// readableStream.push("Hello World! New Journey Started");

//To see highwatermark return output
// console.log(readableStream1.push("Hello World! New Journey Started"));
/*
false
chunk:  Hello World! New Journey Started
*/



//* Writable Stream
const writableStream1 = new Writable({
    write: function(data) {
        console.log("writting: ",data.toString());
        
    } // another way to write same method
});

// pass data to writable stream to write it
// writableStream1.write("hello world");


//---------------------------------------------------------------

//* Connection: connecting readable stream to writable stream

// readable stream
const readableStream2 = new Readable({
    read() { },
});

// writable stream
const writableStream2 = new Writable({
    write(chunk) {
        // here comes your logic to where write and how write
        console.log("writting: ", chunk);
        
    },
});

//* connection
// when data comes into read stream pass it to write stream

readableStream2.on("data", (chunk) => {
    // console.log("chunk: ", chunk);
    
    // connect / pass chunk read by readable stream to writable stream
    writableStream2.write(chunk);
});


// pass data in to readable stream for reading
readableStream2.push("Parrots, along with corvids (ravens, crows, jays, and magpies), are among the most intelligent birds, and the ability of some species to imitate human speech enhances their popularity as pets.")

/*
OUTPUT => 

writting:  <Buffer 50 61 72 72 6f 74 73 2c 20 61 6c 6f 6e 67 20 77 69 
           74 68 20 63 6f 72 76 69 64 73 20 28 72 61 76 65 6e 73 2c 20
           63 72 6f 77 73 2c 20 6a 61 79 73 2c 20 ... 142 more bytes>    

*/


//----------------------------------------------------------------------------------------



