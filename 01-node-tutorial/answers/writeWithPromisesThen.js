import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const filePath = path.join('./temporary', 'temp.txt');
const data = 'This is the line #';

writeFile(filePath, `${data}0\n`, { flag: 'a' }).then(() => {
  console.log(`line #0 appended to the file "${path.basename(filePath)}"`);

  return writeFile(filePath, `${data}1\n`, { flag: 'a' })
    .then(() => {
      console.log(`line #1 appended to the file "${path.basename(filePath)}"`);

      return writeFile(filePath, `${data}2\n`, { flag: 'a' })
        .then(() => {
          console.log(
            `line #2 appended to the file "${path.basename(filePath)}"`
          );
        })
        .then(() => {
          return readFile(filePath, 'utf8').then((result) => {
            console.log(result);
          });
        });
    })
    .catch((err) => {
      console.error(err);
    });
});
