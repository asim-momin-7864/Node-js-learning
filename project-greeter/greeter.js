//* Node.js Mini Project Greeter

//* Some IMP fundamentals

//* node process object
// console.log(process); // huge indetailed powerfull information we get

// process arguments
console.log(process.argv);
/*
[
  '/home/red-dragon/.nvm/versions/node/v24.15.0/bin/node',
  '/mnt/e/Node-js-learning/project-greeter/greeter.js'
]
*/

// passing additional arguments

// command to run node with arguments
//* -> node greeter.js Asim Developer Windows

// OUTPUT =>
/*
[
  '/home/red-dragon/.nvm/versions/node/v24.15.0/bin/node',
  '/mnt/e/Node-js-learning/project-greeter/greeter.js',
  'Asim',
  'Developer',
  'Windows'
]
 */

// accessing that arguments
// same command
console.log(process.argv[2]); // => Asim
console.log(process.argv[3]); // => Developer
console.log(process.argv[4]); // => windows

//--------------------------------------------

//* Mini Activity: Greeter

const name = process.argv[2];

const hours = new Date().getHours(); // 24 hours
console.log("Current Time =>",hours);

function greeting(hours) {
  if (hours >= 4 && hours < 12) {
    return `Good Morning!`;
  } else if (hours >= 12 && hours < 17) {
    return `Good Afternoon`;
  } else if (hours >= 17 && hours < 20) {
    return `Good Evening`;
  } else {
    return `Good Night`;
  }
}

const wish = greeting(hours);

console.log(`${wish}! ${name}`);
