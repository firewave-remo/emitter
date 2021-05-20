import { createEmitter, createSingleEventEmitter } from '../src/emitter.js';

const emitter = createEmitter();

const dataHandler = data => console.log('Got some data', data);

emitter.on('test', dataHandler);

console.log(emitter.eventTypes());

emitter.emit('test', { hello: 'world' });

console.log(emitter.listeners('test'));

emitter.off('test', () => {});

console.log(emitter.eventTypes());
console.log(emitter.listeners('test'));

const event =
  /** @type {createSingleEventEmitter<{hello: string}>} */ createSingleEventEmitter();

const test = {};

const unsub = event.sub(data =>
  console.log('Got some data from single Event', data),
);

event.emit({ hello: '' });

unsub();

event.emit({ hello: 'world' });
