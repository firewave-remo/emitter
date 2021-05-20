import { createEmitter } from '../src/emitter.js';

const emitter = createEmitter();

const dataHandler = data => console.log('Got some data', data);

emitter.on('test', dataHandler);

console.log(emitter.eventTypes());

emitter.emit('test', { hello: 'world' });

console.log(emitter.listeners('test'));

emitter.off('test', () => {});

console.log(emitter.eventTypes());
console.log(emitter.listeners('test'));
