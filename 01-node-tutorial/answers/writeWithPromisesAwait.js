import { readFile, writeFile } from 'fs/promises';
import path from 'path';

const filePath = path.join('./temporary', 'temp.txt');
const data = 'This is the line #';

const writer = async () => {
  try {
    for (let i = 0; i < 3; i++) {
      await writeFile(filePath, `${data}${i}\n`, { flag: 'a' });
      console.log(
        `line #${i} appended to the file "${path.basename(filePath)}"`
      );
    }
  } catch (err) {
    console.error(err);
  }
};

const reader = async () => {
  try {
    const result = await readFile(filePath, 'utf8');
    console.log(result);
  } catch (err) {
    console.error(err);
  }
};

const readWrite = async () => {
  try {
    await writer();
    await reader();
  } catch (err) {
    console.error(err);
  }
};

readWrite();
