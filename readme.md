# Firewave Emitter

Simple Event Emitter

## Usage

```js
const emitter = createEmitter();

const dataHandler = data => console.log('Got some data', data);

const off = emitter.on('myEvent', dataHandler);

emitter.emit('myEvent', { foo: 'bar' });

// To remove the listener
off();

// or

emitter.off('myEvent', dataHandler);
```
