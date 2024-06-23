import { readFileSync, writeFileSync } from 'fs';
import path from 'path';

const filePath = path.join('./temporary', 'fileA.txt');
const data = 'This is the line #';

console.log('Objective: Write 3 lines to a file, sync version.\n');

try {
    for (let i = 1; i <= 3; i++) {
        writeFileSync(filePath, `${data}${i}\n`, { flag: 'a' });
        console.log(`line #${i} appended to the file "${path.basename(filePath)}"`);
    }
} catch (error) {
    console.error(error);
}

console.log('\nWrite operation completed. Reading the file...\n');


try {
    console.log(readFileSync(filePath, 'utf8'));
} catch (error) {
    console.error(error);
}

console.log('Read operation completed.');
