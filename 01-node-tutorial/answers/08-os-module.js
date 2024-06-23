import { release as _release, userInfo as _userInfo, freemem, totalmem, type, uptime } from "os";

const currentOS = {
    name: type(),
    release: _release(),
    totalMem: totalmem(),
    freeMem: freemem(),
};

console.log(`Current OS uptime is ${(uptime() / 60).toFixed(2)} minutes.`);

console.log(currentOS);

const userInfo = _userInfo();

console.log(userInfo);
