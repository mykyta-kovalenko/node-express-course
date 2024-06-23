import { EventEmitter } from 'events';

const emitter = new EventEmitter();

emitter.on('zero', (message) => {
  console.log(`Listener Zero: ${message}`);
  emitter.emit('one', 'Hello from Listener Zero.');
});

emitter.on('one', (message) => {
  console.log(`Listener One: ${message}`);
});

emitter.emit('zero', 'Hello from the Emitter. First Time.');

setInterval(() => {
  emitter.emit('zero', 'Hello from the Emitter. Again. And Again. And Again.');
}, 4000);

const waitForSomething = () => {
  console.log('Waiting for an async event.');
  return new Promise((resolve) => {
    emitter.once('async', resolve);
  }).then((message) => {
    console.log(`We got the message from the future: ${message}`);
  });
};

waitForSomething();

setTimeout(() => {
  emitter.emit(
    'async',
    'Hello from the Emitter, Async. **Async Triggered!!!**.'
  );
}, 10000);
