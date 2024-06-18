const os = require("os");

const currentOS = {
    name: os.type(),
    release: os.release(),
    totalMem: os.totalmem(),
    freeMem: os.freemem(),
};

console.log(`Current OS uptime is ${(os.uptime() / 60).toFixed(2)} minutes.`);

console.log(currentOS);

const userInfo = os.userInfo();

console.log(userInfo);
