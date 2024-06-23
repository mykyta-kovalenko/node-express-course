import { readFile, writeFile } from 'fs';
import path from 'path';

const filePath = path.join('./temporary', 'fileB.txt');
const data = 'This is the line #';

console.log('Objective: Write 3 lines to a file, async version.\n');

try {
    writeFile(filePath, `${data}1\n`, (err) => {
        if (err) {
            console.error(err);
            return;
        }
        console.log(`line #1 appended to the file "${path.basename(filePath)}"`);

        writeFile(filePath, `${data}2\n`, { flag: 'a' }, (err) => {
            if (err) {
                console.error(err);
                return;
            }
            console.log(`line #2 appended to the file "${path.basename(filePath)}"`);

            writeFile(filePath, `${data}3\n`, { flag: 'a' }, (err) => {
                if (err) {
                    console.error(err);
                    return;
                }
                console.log(`line #3 appended to the file "${path.basename(filePath)}"`);

                console.log('\nWrite operation completed. Reading the file...\n');

                readFile(filePath, 'utf8', (err, result) => {
                    if (err) {
                        console.error(err);
                        return;
                    }
                    console.log(result);
                });

            });
        });
    });
} catch (error) {
    console.error(error);
}







