
//* Mini Project Which Monitor Hardware Resource Usage Using NodeJS

import os, { loadavg } from "node:os";

//* Basics

// // CPUS
// console.log("CPUS", os.cpus());
// console.log("CPUS Core:", os.cpus().length);

// // Memory
// console.log("Total Memory:", (os.totalmem() / (1024 * 1024 * 1024)).toFixed(2)); // GB
// console.log("Free Memory:", (os.freemem() / (1024 * 1024 * 1024)).toFixed(2)); // GB

// // Uptime
// console.log("Uptime:", (os.uptime() / (60 * 60))); // hours

// // Host
// console.log("Host:", os.hostname());

// // User
// console.log("User:", os.userInfo());

// // Machine
// console.log("Machine:", os.machine());

//------------------------------------------------------------

//* Mini Hardware Stats Monitor

// node js cpus method not gives current stats
// it gives stats from computer start to still moment
// so lets take 1 sec interval and calculate stats between that 1 sec and shows

function calculateCPUEachCore(oldCPUCore, newCPUCore) {

    // find Ideal time between this 1 sec
    const totalIdealTime = newCPUCore.times.idle - oldCPUCore.times.idle;

    // total usage
    const oldTotal = Object.values(oldCPUCore.times).reduce((a, b) => a + b); // more short code 
    const newTotal = Object.values(newCPUCore.times).reduce((a, b) => a + b);
    const total = newTotal - oldTotal;

    const coreUage = total - totalIdealTime;

    return ((coreUage / total) * 100).toFixed(2); // %
}

function monitor() {

    //* CPU
    // stats from start to still second
    // at start
    const oldCUPS = os.cpus();
    // console.log(oldCUPS);

    // check stats after 1 seconds
    setTimeout(() => {
        // after 1 sec
        const newCPUS = os.cpus();

        // loop each core
        const allCPUCorsUsage = newCPUS.map((newCPUCore, idx) => {
            // calculate stats
            return {
                core: idx,
                usage: calculateCPUEachCore(oldCUPS[idx], newCPUS[idx]) + "%",
            }
        });

        //* Memory 
        const memoryUsage = ((os.totalmem() - os.freemem()) / (1024 * 1024 * 1024)).toFixed(1);
        const totalMemory = (os.totalmem() / (1024 * 1024 * 1024)).toFixed(1);
        // Monitoring
        console.clear();
        console.table(allCPUCorsUsage);
        console.log(`Memory Usage: ${memoryUsage}/${totalMemory} GB`);
        console.log(`Uptime:${(os.uptime() / (60 * 60)).toFixed(2)} Hr`); // hours
        console.log(`Host:${os.hostname()}`);
        console.log("User:", os.userInfo());
        console.log(`Machine:${os.machine()}`);

    }, 1000);
}

// check stats every sec
setInterval(monitor, 1000);

// [
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 27530, nice: 150, sys: 63880, idle: 4871780, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 40760, nice: 560, sys: 49870, idle: 4881780, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 37750, nice: 10, sys: 52120, idle: 4887620, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 38500, nice: 0, sys: 45940, idle: 4895180, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 38120, nice: 20, sys: 49990, idle: 4889140, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 36020, nice: 0, sys: 45780, idle: 4898550, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 36420, nice: 0, sys: 50610, idle: 4888550, irq: 0 }
//   },
//   {
//     model: '11th Gen Intel(R) Core(TM) i5-1155G7 @ 2.50GHz',
//     speed: 0,
//     times: { user: 35250, nice: 0, sys: 50130, idle: 4891160, irq: 0 }
//   }
// ]
